export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'token is required' });

  try {
    // Fetch basic user info
    const r = await fetch('https://discord.com/api/v9/users/@me', {
      headers: { 'Authorization': token }
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data.message || 'Invalid token or Discord API error', code: data.code });

    // Also fetch current settings (status)
    const sr = await fetch('https://discord.com/api/v9/users/@me/settings', {
      headers: { 'Authorization': token }
    });
    const settings = sr.ok ? await sr.json() : {};

    return res.status(200).json({
      id: data.id,
      username: data.username,
      discriminator: data.discriminator,
      global_name: data.global_name,
      avatar: data.avatar,
      avatar_url: data.avatar
        ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
        : `https://cdn.discordapp.com/embed/avatars/${parseInt(data.discriminator || 0) % 5}.png`,
      status: settings.status || 'online',
      custom_status: settings.custom_status || null
    });
  } catch (e) {
    return res.status(500).json({ error: 'Internal error', details: e.message });
  }
}
