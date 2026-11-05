// Procedural Tactile Sound Engine (Web Audio API)
// Synthesizes creamy mechanical keystrokes, backspace thuds, crisp mouse micro-switch clicks,
// magnetic layer snaps, and precision counter ticks with zero external audio latency.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private muted: boolean = false;
  private lastKeystrokeAt: number = 0;
  private lastTickAt: number = 0;
  private unlockListenersAttached: boolean = false;
  private stateListeners: Set<(running: boolean) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.attachAutoUnlockListeners();
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined' || this.muted) return null;

    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;

      try {
        this.ctx = new AudioCtx();
        this.ctx.onstatechange = () => {
          const isRunning = this.ctx?.state === 'running';
          this.stateListeners.forEach((cb) => cb(Boolean(isRunning)));
        };
      } catch {
        return null;
      }
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {
        // Browser still waiting for first gesture
      });
    }

    return this.ctx;
  }

  private getNoiseBuffer(ctx: AudioContext): AudioBuffer {
    if (this.noiseBuffer && this.noiseBuffer.sampleRate === ctx.sampleRate) {
      return this.noiseBuffer;
    }
    const bufferSize = Math.floor(ctx.sampleRate * 0.35);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    this.noiseBuffer = buffer;
    return buffer;
  }

  public attachAutoUnlockListeners(): void {
    if (this.unlockListenersAttached || typeof window === 'undefined') return;
    this.unlockListenersAttached = true;

    const tryUnlock = () => {
      const ctx = this.getContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
    };

    const events = [
      'pointerdown',
      'pointermove',
      'mousemove',
      'mousedown',
      'touchstart',
      'keydown',
      'wheel',
      'click'
    ];

    events.forEach((evt) => {
      window.addEventListener(evt, tryUnlock, { passive: true });
    });
  }

  public onAudioStateChange(cb: (running: boolean) => void): () => void {
    this.stateListeners.add(cb);
    if (this.ctx) {
      cb(this.ctx.state === 'running');
    }
    return () => {
      this.stateListeners.delete(cb);
    };
  }

  public unlockNow(): void {
    const ctx = this.getContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  }

  public setMuted(mute: boolean): void {
    this.muted = mute;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  /**
   * Creamy, "thocky" custom mechanical switch keystroke
   */
  public playKeystroke(isSpace: boolean = false, isFastStream: boolean = false): void {
    const nowMs = performance.now();
    const minGap = isFastStream ? 34 : 20;
    if (nowMs - this.lastKeystrokeAt < minGap) return;
    this.lastKeystrokeAt = nowMs;

    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running') return;

    const t = ctx.currentTime;
    const pitchJitter = 0.94 + Math.random() * 0.12;
    const gainScale = isFastStream ? 0.65 : 0.9 + Math.random() * 0.15;

    // 1. Switch bottom-out "thock" resonance (warm low-mid body)
    const osc = ctx.createOscillator();
    const bodyGain = ctx.createGain();
    osc.type = 'triangle';

    const startFreq = (isSpace ? 175 : 230) * pitchJitter;
    const endFreq = (isSpace ? 68 : 88) * pitchJitter;
    osc.frequency.setValueAtTime(startFreq, t);
    osc.frequency.exponentialRampToValueAtTime(endFreq, t + 0.042);

    bodyGain.gain.setValueAtTime(0.0001, t);
    bodyGain.gain.linearRampToValueAtTime(0.095 * gainScale, t + 0.003);
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);

    const bodyFilter = ctx.createBiquadFilter();
    bodyFilter.type = 'lowpass';
    bodyFilter.frequency.setValueAtTime(880, t);

    osc.connect(bodyFilter);
    bodyFilter.connect(bodyGain);
    bodyGain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.048);

    // 2. Tactile keycap transient (filtered short noise burst)
    const noise = ctx.createBufferSource();
    noise.buffer = this.getNoiseBuffer(ctx);

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime((isSpace ? 1650 : 2150) * pitchJitter, t);
    bandpass.Q.setValueAtTime(2.6, t);

    const clickGain = ctx.createGain();
    clickGain.gain.setValueAtTime(0.0001, t);
    clickGain.gain.linearRampToValueAtTime(0.065 * gainScale, t + 0.0015);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.015);

    noise.connect(bandpass);
    bandpass.connect(clickGain);
    clickGain.connect(ctx.destination);

    noise.start(t, Math.random() * 0.1, 0.02);
  }

  /**
   * Deeper stabilized Backspace key thud when fixing a typo
   */
  public playBackspace(): void {
    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running') return;

    const t = ctx.currentTime;
    const jitter = 0.96 + Math.random() * 0.08;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(155 * jitter, t);
    osc.frequency.exponentialRampToValueAtTime(58 * jitter, t + 0.052);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(0.11, t + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.056);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.06);

    // Muted stabilizer transient
    const noise = ctx.createBufferSource();
    noise.buffer = this.getNoiseBuffer(ctx);
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1150 * jitter, t);
    filter.Q.setValueAtTime(2.2, t);

    const nGain = ctx.createGain();
    nGain.gain.setValueAtTime(0.05, t);
    nGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.018);

    noise.connect(filter);
    filter.connect(nGain);
    nGain.connect(ctx.destination);
    noise.start(t, 0, 0.022);
  }

  /**
   * Subtle two-tone spellcheck cue when a typo is underlined in crimson
   */
  public playTypoAlert(): void {
    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running') return;

    const t = ctx.currentTime;
    const notes = [440, 350];

    notes.forEach((freq, idx) => {
      const start = t + idx * 0.055;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(0.045, start + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.055);
    });
  }

  /**
   * Crisp mouse micro-switch click (press transient + release bounce)
   */
  public playMouseClick(): void {
    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running') return;

    const triggerSwitch = (startTime: number, freq: number, amp: number) => {
      const noise = ctx.createBufferSource();
      noise.buffer = this.getNoiseBuffer(ctx);

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq, startTime);
      filter.Q.setValueAtTime(3.8, startTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(amp, startTime + 0.001);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.01);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(startTime, 0.02, 0.014);

      const osc = ctx.createOscillator();
      const oGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, startTime);
      osc.frequency.exponentialRampToValueAtTime(140, startTime + 0.012);

      oGain.gain.setValueAtTime(amp * 0.65, startTime);
      oGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.013);

      osc.connect(oGain);
      oGain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.015);
    };

    const t = ctx.currentTime;
    // Switch press down
    triggerSwitch(t, 2750, 0.09);
    // Switch release bounce 34ms later
    triggerSwitch(t + 0.034, 1850, 0.045);
  }

  /**
   * Magnetic clone burst when the Master Cursor splits into 5 AI Agent Cursors
   */
  public playCloneBurst(): void {
    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running') return;

    const t = ctx.currentTime;

    // Filtered upward air whoosh
    const noise = ctx.createBufferSource();
    noise.buffer = this.getNoiseBuffer(ctx);
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(2.0, t);
    filter.frequency.setValueAtTime(280, t);
    filter.frequency.exponentialRampToValueAtTime(2200, t + 0.22);

    const nGain = ctx.createGain();
    nGain.gain.setValueAtTime(0.0001, t);
    nGain.gain.linearRampToValueAtTime(0.055, t + 0.05);
    nGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);

    noise.connect(filter);
    filter.connect(nGain);
    nGain.connect(ctx.destination);
    noise.start(t, 0, 0.26);

    // Subtle harmonic chord shimmer
    const freqs = [220, 329.63, 440, 659.25];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t + i * 0.018);

      gain.gain.setValueAtTime(0.0001, t + i * 0.018);
      gain.gain.linearRampToValueAtTime(0.024, t + i * 0.018 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.34);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t + i * 0.018);
      osc.stop(t + 0.36);
    });
  }

  /**
   * Magnetic CAD / Layer Snap pop (e.g., [Bring to Front ↑] or locking a UI component)
   */
  public playLayerSnap(): void {
    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running') return;

    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(190, t);
    osc.frequency.exponentialRampToValueAtTime(560, t + 0.038);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(0.085, t + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.048);
  }

  /**
   * Delicate watchmaker / telemetry tick as KPI metrics count up
   */
  public playMetricTick(progressRatio: number = 0.5): void {
    const nowMs = performance.now();
    if (nowMs - this.lastTickAt < 46) return;
    this.lastTickAt = nowMs;

    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running') return;

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    const freq = 1250 + Math.min(1, Math.max(0, progressRatio)) * 650;
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(0.028, t + 0.001);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.011);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.013);
  }

  /**
   * Warm studio resolve when all 5 AI agents converge at 90% build completion
   */
  public playBuildComplete(): void {
    const ctx = this.getContext();
    if (!ctx || ctx.state !== 'running') return;

    const t = ctx.currentTime;
    const chord = [110, 220, 277.18, 329.63, 440];

    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, t);

      const peak = i === 0 ? 0.055 : 0.022;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(peak, t + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.65);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.68);
    });
  }
}

export const soundEngine = new SoundEngine();
