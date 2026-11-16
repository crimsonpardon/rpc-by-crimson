export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { token, status } = req.body;
  
  if (!token || !status) return res.status(400).json({ error: 'token and status required' });
  
  const validStatuses = ['online', 'idle', 'dnd', 'invisible'];
  if (!validStatuses.includes(status)) return res.status(400).json({ error: 'Invalid status' });
  
  try {
    const response = await fetch('https://discord.com/api/v9/users/@me/settings', {
      method: 'PATCH',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Discord API error', code: data.code });
    }
    
    return res.status(200).json({ success: true, status: data.status });
  } catch (err) {
    return res.status(500).json({ error: 'Internal error', details: err.message });
  }
}
