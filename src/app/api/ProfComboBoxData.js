// src/app/api/supdata.js

export const fetchRole = async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBhc2luZHUiLCJpYXQiOjE3MTYwMTMyOTQsImV4cCI6MzE3MjYwNDU1Njk0fQ.oqjRfBHwna323gz1bh00niCpcA0efJMNe-NMQ50m0CQ"; 
    
    try {

      const response = await fetch(`http://localhost:8000/userprofile/getuserrole`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "access-token": token,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch suppliers");
      }
      const data = await response.json();
      console.log("data :", data)



      
      return data.data.map((role) => ({
        value: role.Role_Id,
        label: role.Role_Name,
      }));
      
    } catch (error) {
      console.error("Error fetching role data:", error);
      return []; // Return empty array in case of error
    }
  };
  