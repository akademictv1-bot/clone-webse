const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { DatabaseSync } = require('node:sqlite');

const PASTA = __dirname;
const DB_PATH = path.join(PASTA, 'prospector.db');
const CONFIG_PATH = path.join(PASTA, 'prospector-config.json');
const PORTA = 8765;

const CAMPOS = [
  'slug', 'nome', 'nicho', 'cidade', 'nota', 'avaliacoes', 'email', 'telefone', 'whatsapp',
  'siteAntigo', 'motivo', 'status', 'urlNova', 'dataProposta', 'valor', 'obs',
  'contratoStatus', 'contratoEm', 'manutencao', 'pago', 'docCliente', 'endCliente'
];

function lerConfig() {
  try {
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  } catch {
    return {};
  }
}

function salvarConfig(cfg) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2), 'utf8');
}

function getDb() {
  const db = new DatabaseSync(DB_PATH);
  db.exec(`CREATE TABLE IF NOT EXISTS leads(
    slug TEXT PRIMARY KEY, nome TEXT, nicho TEXT, cidade TEXT, nota REAL, avaliacoes INTEGER,
    email TEXT, telefone TEXT, whatsapp TEXT, siteAntigo TEXT, motivo TEXT,
    status TEXT DEFAULT 'novo', urlNova TEXT, dataProposta TEXT, valor REAL, obs TEXT,
    contratoStatus TEXT DEFAULT 'pendente', contratoEm TEXT, manutencao REAL, pago INTEGER DEFAULT 0,
    docCliente TEXT, endCliente TEXT,
    atualizado TEXT DEFAULT (datetime('now','localtime'))
  )`);
  return db;
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
};

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
  });
}

function sendJson(res, statusCode, data) {
  const payload = Buffer.from(JSON.stringify(data), 'utf8');
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Content-Length': payload.length
  });
  res.end(payload);
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORTA}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  if (req.method === 'GET' && pathname === '/api/config') {
    const cfg = lerConfig();
    const hg = Object.assign({}, cfg.hostgator || {});
    hg.senhaDefinida = Boolean(hg.senha);
    delete hg.senha;
    return sendJson(res, 200, {
      contratante: cfg.contratante || {},
      hostgator: hg,
      prospeccao: cfg.prospeccao || { nichos: [], cidade: '', leadsPorBusca: 10 }
    });
  }

  if (req.method === 'GET' && pathname === '/api/leads') {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM leads');
    const rows = stmt.all();
    db.close();
    return sendJson(res, 200, rows);
  }

  if (req.method === 'POST' && pathname === '/api/leads') {
    const body = await readBody(req);
    const db = getDb();
    const placeholders = CAMPOS.map(() => '?').join(',');
    const stmt = db.prepare(`INSERT OR REPLACE INTO leads (${CAMPOS.join(',')}) VALUES (${placeholders})`);
    const values = CAMPOS.map(k => body[k] !== undefined ? body[k] : null);
    stmt.run(...values);
    db.close();
    return sendJson(res, 200, { ok: true });
  }

  if (req.method === 'PUT' && pathname === '/api/config') {
    const cfg = lerConfig();
    const corpo = await readBody(req);
    if (corpo.contratante || corpo.hostgator || corpo.prospeccao) {
      if (corpo.contratante) {
        cfg.contratante = cfg.contratante || {};
        for (const [k, v] of Object.entries(corpo.contratante)) {
          if (typeof v === 'string') cfg.contratante[k] = v;
        }
      }
      if (corpo.hostgator) {
        cfg.hostgator = cfg.hostgator || {};
        for (const [k, v] of Object.entries(corpo.hostgator)) {
          if (typeof v !== 'string') continue;
          if (k === 'senha' && v === '') continue;
          cfg.hostgator[k] = v;
        }
      }
      if (corpo.prospeccao) {
        cfg.prospeccao = cfg.prospeccao || {};
        if (Array.isArray(corpo.prospeccao.nichos)) {
          cfg.prospeccao.nichos = corpo.prospeccao.nichos.map(s => String(s).trim()).filter(Boolean);
        }
        if (typeof corpo.prospeccao.cidade === 'string') {
          cfg.prospeccao.cidade = corpo.prospeccao.cidade.trim();
        }
        if (corpo.prospeccao.leadsPorBusca) {
          cfg.prospeccao.leadsPorBusca = parseInt(corpo.prospeccao.leadsPorBusca) || 10;
        }
      }
    } else {
      cfg.contratante = cfg.contratante || {};
      for (const [k, v] of Object.entries(corpo)) {
        if (typeof v === 'string') cfg.contratante[k] = v;
      }
    }
    salvarConfig(cfg);
    return sendJson(res, 200, { ok: true });
  }

  const parts = pathname.split('/').filter(Boolean);
  if (req.method === 'PUT' && parts.length === 3 && parts[0] === 'api' && parts[1] === 'leads') {
    const slug = parts[2];
    const body = await readBody(req);
    const keys = Object.keys(body).filter(k => CAMPOS.includes(k) && k !== 'slug');
    if (keys.length > 0) {
      const db = getDb();
      const setClause = keys.map(k => `${k}=?`).join(',');
      const stmt = db.prepare(`UPDATE leads SET ${setClause}, atualizado=datetime('now','localtime') WHERE slug=?`);
      const values = keys.map(k => body[k]);
      values.push(slug);
      stmt.run(...values);
      db.close();
    }
    return sendJson(res, 200, { ok: true });
  }

  if (req.method === 'DELETE' && parts.length === 3 && parts[0] === 'api' && parts[1] === 'leads') {
    const slug = parts[2];
    const db = getDb();
    const stmt = db.prepare('DELETE FROM leads WHERE slug=?');
    stmt.run(slug);
    db.close();
    return sendJson(res, 200, { ok: true });
  }

  // Arquivos estáticos
  let relativePath = pathname === '/' || pathname === '' ? 'dashboard.html' : pathname.replace(/^\/+/, '');
  const filePath = path.normalize(path.join(PASTA, relativePath));

  if (!filePath.startsWith(PASTA)) {
    res.writeHead(403);
    return res.end('Acesso negado');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Não encontrado');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });
});

server.listen(PORTA, '127.0.0.1', () => {
  console.log(`Prospector rodando em http://localhost:${PORTA}  (Ctrl+C para parar)`);
  try {
    const cmd = process.platform === 'win32' ? `start http://localhost:${PORTA}` :
                process.platform === 'darwin' ? `open http://localhost:${PORTA}` :
                `xdg-open http://localhost:${PORTA}`;
    exec(cmd);
  } catch {}
});
