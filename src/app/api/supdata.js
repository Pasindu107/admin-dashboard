// src/app/api/supdata.js

export const fetchSuppliers = async () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBhc2luZHUiLCJpYXQiOjE3MTYwMTMyOTQsImV4cCI6MzE3MjYwNDU1Njk0fQ.oqjRfBHwna323gz1bh00niCpcA0efJMNe-NMQ50m0CQ"; 
  const scode = 1
  
  try {
    const queryParams = `?scode=${encodeURIComponent(scode)}`;
    const response = await fetch(`http://localhost:8000/supplier/getsupreg${queryParams}`, {
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
    return data.Data.map((supplier) => ({
      value: supplier.SupplierCode,
      label: supplier.SupplierName,
      email: supplier.PrimaryEmailAddress
    }));
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return []; // Return empty array in case of error
  }
};
