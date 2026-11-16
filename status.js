export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { token, status } = req.body;
  if (!token) return res.status(400).json({ error: 'token is required' });

  const valid = ['online', 'idle', 'dnd', 'invisible'];
  if (!valid.includes(status)) return res.status(400).json({ error: 'Invalid status. Use: online, idle, dnd, invisible' });

  try {
    const r = await fetch('https://discord.com/api/v9/users/@me/settings', {
      method: 'PATCH',
      headers: { 'Authorization': token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data.message || 'Discord API error', code: data.code });
    return res.status(200).json({ success: true, status: data.status });
  } catch (e) {
    return res.status(500).json({ error: 'Internal error', details: e.message });
  }
}
