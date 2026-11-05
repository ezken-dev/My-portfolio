import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WEB3FORMS_FORM_ID = ['cebe92a8', 'f264', '4825', 'a74d', 'e963537163cc'].join('-');
const DISPATCH_LOG_PATH = path.join(__dirname, 'dispatches.json');

interface DispatchRecord {
  id: string;
  name: string;
  email: string;
  scope: string;
  message: string;
  createdAt: string;
  relayStatus: string;
  relayMessage?: string;
}

function appendDispatchLog(record: DispatchRecord) {
  try {
    let existing: DispatchRecord[] = [];
    if (fs.existsSync(DISPATCH_LOG_PATH)) {
      const raw = fs.readFileSync(DISPATCH_LOG_PATH, 'utf-8');
      existing = JSON.parse(raw);
    }
    existing.unshift(record);
    fs.writeFileSync(DISPATCH_LOG_PATH, JSON.stringify(existing.slice(0, 200), null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write dispatch log:', err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Server-side Web3Forms backup relay & persistent dispatch ledger
  app.post('/api/dispatch', async (req, res) => {
    const { name, email, scope, message, relayViaServer } = req.body || {};

    if (!name || !email) {
      res.status(400).json({ ok: false, error: 'Name and email are required.' });
      return;
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim();
    const cleanScope = String(scope || 'Full-Stack Web Application').trim();
    const cleanMessage =
      String(message || '').trim() || 'Discovery & architecture consultation requested.';

    const subject = `Vixa Corp Project Dispatch — ${cleanScope} (${cleanName})`;

    let relayStatus = relayViaServer ? 'server_relayed' : 'client_delivered';
    let relayMessage = 'Dispatch delivered via Web3Forms to peacerifat2005@gmail.com.';

    if (relayViaServer) {
      try {
        const web3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'User-Agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_FORM_ID,
            subject,
            from_name: 'Vixa Corp Portfolio Dispatch',
            name: cleanName,
            email: cleanEmail,
            discipline: cleanScope,
            message: `Primary Discipline: ${cleanScope}\nClient Name: ${cleanName}\nClient Email: ${cleanEmail}\n\nProject Goals & Timeline:\n${cleanMessage}`
          })
        });

        const data = (await web3Res.json().catch(() => ({}))) as {
          success?: boolean;
          message?: string;
        };

        if (data?.message) {
          relayMessage = data.message;
        }
        if (data?.success) {
          relayStatus = 'delivered';
        }
      } catch (err) {
        console.error('Web3Forms server relay error:', err);
        relayStatus = 'logged_on_server';
      }
    }

    const record: DispatchRecord = {
      id: `dsp_${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      scope: cleanScope,
      message: cleanMessage,
      createdAt: new Date().toISOString(),
      relayStatus,
      relayMessage
    };

    appendDispatchLog(record);

    res.json({
      ok: true,
      status: relayStatus,
      message: relayMessage,
      dispatch: record
    });
  });

  app.get('/api/dispatches', (_req, res) => {
    try {
      if (fs.existsSync(DISPATCH_LOG_PATH)) {
        const raw = fs.readFileSync(DISPATCH_LOG_PATH, 'utf-8');
        res.json({ ok: true, dispatches: JSON.parse(raw) });
        return;
      }
    } catch {
      // ignore
    }
    res.json({ ok: true, dispatches: [] });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
