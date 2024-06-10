// // pages/api/auth/[...nextauth].js
// import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';

// export default NextAuth({
//   providers: [
//     Providers.Credentials({
//       name: 'Credentials',
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         const res = await fetch("https://yourapi.com/auth/login", {
//           method: 'POST',
//           body: JSON.stringify(credentials),
//           headers: { "Content-Type": "application/json" }
//         });
//         const user = await res.json();

//         if (res.ok && user) {
//           return user;
//         }
//         return null;
//       }
//     })
//   ],
//   pages: {
//     signIn: '/auth/signin'
//   }
// });

import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers
