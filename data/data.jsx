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

import { useEffect, useState } from 'react';

function DataList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8000/item/outofstock?supCode=023');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }


    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Data List</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DataList;

