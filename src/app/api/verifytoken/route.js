// import jwt from 'jsonwebtoken';

// const secretKey = '@heptagon075!+'; // Ensure this matches your backend secret key


// export async function POST(req, res) {


//   try {
//     const body = await req.json();
//     token = body;

//     if (!token) {
//       return new Response(JSON.stringify({ message: 'Token is required' }), {
//         status: 400,
//       })
//     }

//     const decoded = jwt.verify(token, secretKey);
//     return Response(JSON.stringify({ success: true, decoded }), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",}
//     });
//   } catch (error) {
//     if (error.name === 'TokenExpiredError') {
//       return new Response(JSON.stringify({ message: 'Token expired' }), {
//         status: 401,
//       })
//     }
//     return new Response(JSON.stringify({ message: 'Invalid token' }), {
//       status: 401,
//     })
//   }
// }

// import jwt from 'jsonwebtoken';

// const secretKey = '@heptagon075!+'; // Ensure this matches your backend secret key

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   try {
//     const { token } = req.body;

//     if (!token) {
//       return res.status(400).json({ message: 'Token is required' });
//     }

//     const decoded = jwt.verify(token, secretKey);
//     return res.status(200).json({ success: true, decoded });
//   } catch (error) {
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ message: 'Token expired' });
//     }
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// }


