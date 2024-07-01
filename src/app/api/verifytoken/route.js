// pages/api/verifytoken.js
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { token } = req.headers;

    try {
      const response = await fetch('http://localhost:8000/verytoken/protected', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-token': token,
        },

      });

      const data = await response.json();

      if (response.ok) {
        res.status(200).json(data);
        return
      } else {
        res.status(401).json(data);
      }
    } catch (error) {
      console.error('Error fetching token:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
