//get all items in item registration table

// Function to fetch data from the API
const appPackageData = async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBhc2luZHUiLCJpYXQiOjE3MTYwMTMyOTQsImV4cCI6MzE3MjYwNDU1Njk0fQ.oqjRfBHwna323gz1bh00niCpcA0efJMNe-NMQ50m0CQ";
    //const token = localStorage.getItem('token');
    try {
        const fieldData = {
            method: "GET",
            headers: { "Content-Type": "application/json" , 'access-token': token},
            body: JSON.stringify()
          };
        const response = await fetch(
            "http://localhost:8000/apppackage/getapppackage", fieldData
        );
        const data = await response.json();
        
        return data.data;
        
    } catch (error) {
        console.error(error);
        return [];
    } 
};

export {appPackageData}  