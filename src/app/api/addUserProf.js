export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Extract data from request body
        const { RoleId, ProfId, Descript, IsActive } = req.body;
  
        // Define the backend URL
        const backendUrl = 'http://localhost:8000/userprofile'; 

        
        const response = await fetch(backendUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ RoleId, ProfId, Descript, IsActive }),
        });
  
        // Parse the JSON response from the backend
        const data = await response.json();
  
        // Send the backend response to the client
        res.status(response.status).json(data);
  
      } catch (error) {
        // Handle any errors that occur during the fetch
        res.status(500).json({ Success: false, Message: 'An error occurred while creating profile.' });
      }
    } else {
      // Handle any method other than POST
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  