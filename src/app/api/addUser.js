export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Extract data from request body
        const { userName, userPassword, supCode, Email } = req.body;
  
        // Define the backend URL
        const backendUrl = 'http://localhost:8000/login/reguser'; 

        
        const response = await fetch(backendUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userName, userPassword, supCode, Email }),
        });
  
        // Parse the JSON response from the backend
        const data = await response.json();
  
        // Send the backend response to the client
        res.status(response.status).json(data);
  
      } catch (error) {
        // Handle any errors that occur during the fetch
        res.status(500).json({ Success: false, Message: 'An error occurred while registering the user.' });
      }
    } else {
      // Handle any method other than POST
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  