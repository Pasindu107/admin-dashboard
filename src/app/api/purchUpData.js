const purchUpData = async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBhc2luZHUiLCJpYXQiOjE3MTYwMTMyOTQsImV4cCI6MzE3MjYwNDU1Njk0fQ.oqjRfBHwna323gz1bh00niCpcA0efJMNe-NMQ50m0CQ";
    
    try {
        const fieldData = {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                'access-token': token
            }
        };


        const url = `http://localhost:8000/grn/getpurchupload`;
        //console.log("API URL:", url); // Debug: Log the API URL

        const response = await fetch(url, fieldData);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data); // Debug: Log the entire fetched data
        return data.Data || []; // Ensure 'data.Data' exists or return an empty array
        
    } catch (error) {
        console.error('Error fetching reimbursement summary:', error);
        return [];
    }
};

export { purchUpData };
