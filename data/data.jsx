// export const data = [
//     {
//       id: 1,
//       name: {
//         first: 'Pasidu',
//         last: 'Bhanuka',
//       },
//       total: 2795.95,
//       status: 'On Hold',
//       method: 'PayPal',
//       date: '15 Minutes ago',
//     },
//     {
//       id: 2,
//       name: {
//         first: 'Chris',
//         last: 'Adams',
//       },
//       total: 1195.95,
//       status: 'Processing',
//       method: 'PayPal',
//       date: '23 Minutes ago',
//     },
//     {
//       id: 3,
//       name: {
//         first: 'Sarah',
//         last: 'Smith',
//       },
//       total: 495.85,
//       status: 'Completed',
//       method: 'Visa',
//       date: '1 Hour ago',
//     },
//     {
//       id: 4,
//       name: {
//         first: 'Joseph',
//         last: 'Choo',
//       },
//       total: 150.45,
//       status: 'Processing',
//       method: 'MasterCard',
//       date: '1 Hour ago',
//     },
    
//   ];

// import { useEffect, useState } from 'react';

// function DataList() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch('http://localhost:8000/item/outofstock?supCode=023');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const jsonData = await response.json();
//         setData(jsonData);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     }


//     fetchData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       <h1>Data List</h1>
//       <ul>
//         {data.map(item => (
//           <li key={item.id}>{item.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }



// export default DataList;

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBhc2luZHUiLCJpYXQiOjE3MTQxOTY5MDMsImV4cCI6MzE3MjU4NjM5MzAzfQ.y02Y0qtvBQL1AzBTO1KdDIV0PiC-qk4k0-RQW_fz_hA';

// fetch('http://localhost:8000/item/outofstock?supCode=023', {
//   method: 'GET',
//   headers: {
//     'Authorization': `Bearer ${token}`, // Include the token in the 'Authorization' header
//     'Content-Type': 'application/json', // Optionally, specify the content type
//   },
// })
// .then(response => {
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// })
// .then(data => {
//   console.log(data); // Handle response data
// })
// .catch(error => {
//   console.error('Error:', error); // Handle  
// });

import React, { useState } from 'react';

export default function Data() {
    const [userData, setUserData] = useState(null);


    const fetchData = async () => {
        try {
            // const token = localStorage.getItem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBhc2luZHUiLCJpYXQiOjE3MTQxOTY5MDMsImV4cCI6MzE3MjU4NjM5MzAzfQ.y02Y0qtvBQL1AzBTO1KdDIV0PiC-qk4k0-RQW_fz_hA');
            // const response = await axios.get('http://localhost:8000/item/outofstock', {
            //     params: {
            //       supCode: '023' // Add your query parameters here
            //     },  
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            
            // });

            const response = await fetch(
              "http://localhost:8000/item/outofstock?supCode=023"
            );
            const userData = await response.json();
            // return userData;

        } catch (error) {
            console.error(error);
        }
    };

    return (
          <div>
            <button onClick={fetchData}>Fetch Protected Data</button>
            {userData && (
                <div>
                    {/* Render your fetched data here */}
                    {userData.map((item, index) => (
                        <div key={index}>
                            <h3>{item.ItemName}</h3>
                            <p>{item.Item_Code}</p>
                            <p>{item.SoldDate}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}