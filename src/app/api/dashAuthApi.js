// src/app/api/supdata.js
 const fetchAuth = async (roleId, profId) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBhc2luZHUiLCJpYXQiOjE3MTYwMTMyOTQsImV4cCI6MzE3MjYwNDU1Njk0fQ.oqjRfBHwna323gz1bh00niCpcA0efJMNe-NMQ50m0CQ"; 
    // const RoleId = 1
    // const ProfId = 1
    
    try {
      const queryParams = `?RoleId=${encodeURIComponent(roleId)}&ProfId=${encodeURIComponent(profId)}`;
      const response = await fetch(`http://localhost:8000/dashauth${queryParams}`, {
        method: "GET",
        headers: {"Content-Type": "application/json", "access-token": token},
      });

    //   console.log(response)

      if (!response.ok) {
        throw new Error("Failed to fetch Auth");
      }
      const data = await response.json();
    //   console.log("Fetched data:", data);
      return data.Data;

    } catch (error) {
      console.error("Error fetching dashAuth:", error);
      return []; // Return empty array in case of error
    }
  };

  export {fetchAuth}         