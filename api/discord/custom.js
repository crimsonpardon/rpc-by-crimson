export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { token, text, emoji, status } = req.body;
  if (!token) return res.status(400).json({ error: 'token is required' });

  try {
    const body = {};
    if (status) body.status = status;

    // custom_status: text and/or emoji
    body.custom_status = {
      text: text || '',
      emoji_name: emoji || null,
      expires_at: null
    };

    const r = await fetch('https://discord.com/api/v9/users/@me/settings', {
      method: 'PATCH',
      headers: { 'Authorization': token, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data.message || 'Discord API error', code: data.code });
    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: 'Internal error', details: e.message });
  }
}
