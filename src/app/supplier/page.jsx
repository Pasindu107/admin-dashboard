"use client";

import SupTableEdit from "@/components/SupTableEdit";
import TablePopup from "@/components/TablePopup";
import React, { useEffect, useState } from "react";



// Function to fetch data from the API
const fetchData = async () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBhc2luZHUiLCJpYXQiOjE3MTYwMTMyOTQsImV4cCI6MzE3MjYwNDU1Njk0fQ.oqjRfBHwna323gz1bh00niCpcA0efJMNe-NMQ50m0CQ";
  const scode = 0
  
  try {
    const queryParams = `?scode=${encodeURIComponent(scode)}`;
    const response = await fetch(`http://localhost:8000/supplier/getsupreg${queryParams}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", "access-token": token },
    });
    const data = await response.json();
    return data.Data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default function Data() {
  const [data, setData] = useState([]);
  const [addPopup, setAddPopup] = useState(false);
  const [popupData, setPopupData] = useState(null);


  // Fetch data when the component mounts
  useEffect(() => {
    const fetchDataAndSetData = async () => {
      const newData = await fetchData();
      setData(newData);
    };
    fetchDataAndSetData();
  }, []);


    //file download api calling
    const [downloadError, setDownloadError] = useState(null);
  
    const downloadImage = async (imageName) => {
      try {
        const response = await fetch(`/api/supfiledown?imageName=${imageName}`);
        if (!response.ok) {
          throw new Error(`Error downloading image: ${response.statusText}`);
        }    
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = imageName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        if (error.message.includes("Error downloading image")) {
          alert("file not found");
        } else {
          alert(`An error occurred: ${error.message}`);
        }
        setDownloadError(error.message);
      }  
    }


  // Click handler function
  const handleCellClick = async (item, fieldName) => {
    let responseMessage;

    switch (fieldName) {
      case "IdNo":
        //responseMessage = `IdNo is: ${item.IdNo}`        
        break;
      case "CompanyType":
        //responseMessage = `Company Type is: ${item.CompanyType}`;
        setPopupData(item[fieldName]);
        setAddPopup(true);
        //setoffPopup(false);
        break;
      case "SupplierName":
        setPopupData(item[fieldName]);
        setAddPopup(true);
        break;
      case "AuthorizedPerson":
        responseMessage = `Authorized Person is: ${item.AuthorizedPerson}`;
        break;
      case "ContactPerson":
        responseMessage = `Contact Person is: ${item.ContactPerson}`;
        break;
      case "TaxID":
        responseMessage = `Tax ID is: ${item.TaxID}`;
        break;
      case "BankName":
        responseMessage = `Bank Name is: ${item.BankName}`;
        break;
      case "AccountNumber":
        responseMessage = `Account Number is: ${item.AccountNumber}`;
        break;
      case "Payee":
        responseMessage = `Payee is: ${item.Payee}`;
        break;
      case "CreditPeriod":
        responseMessage = `Credit Period is: ${item.CreditPeriod}`;
        break;
      case "PaymentMethod":
        responseMessage = `Payment Method is: ${item.PaymentMethod}`;
        break;
      case "RegisterAddress":
        responseMessage = `Register Address is: ${item.RegisterAddress}`;
        break;
      case "BillingAddress":
        responseMessage = `Billing Address is: ${item.BillingAddress}`;
        break;
      case "ContactPerson2":
        responseMessage = `Contact Person 2 is: ${item.ContactPerson2}`;
        break;
      case "PrimaryEmailAddress":
        // responseMessage = `Primary Email Address is: ${item.PrimaryEmailAddress}`;
        break;
      case "SecondaryEmailAddress":
        responseMessage = `Secondary Email Address is: ${item.SecondaryEmailAddress}`;
        break;
      case "CompanyRegNum":
        responseMessage = `Company Reg Number is: ${item.CompanyRegNum}`;
        break;
      case "TaxRegNumber":
        responseMessage = `Tax Reg Number is: ${item.TaxRegNumber}`;
        break;
      case "DeedofEstablishment":
        responseMessage = `Deed of Establishment is: ${item.DeedofEstablishment}`;
        break;
      case "BusinessLicense":
        responseMessage = `Business License is: ${item.BusinessLicense}`;
        break;
      case "PermisessLicense":
        responseMessage = `Permits License is: ${item.PermisessLicense}`;
        break;
      case "AuthPersonID":
        responseMessage = `Authorized Person ID is: ${item.AuthPersonID}`;
        break;
      case "BankInfor":
        downloadImage(item.BankInfor)
        break;
      case "InsertDate":
        responseMessage = `Insert Date is: ${item.InsertDate}`;
        break;
      default:
        responseMessage = `Clicked on: ${fieldName}`;
        setPopupData(null); // Clear the data if popup is closed
        setAddPopup(false); // Close the popup for all other cell clicks
        
    }
    
  };



  // Render fetched data in a table
  return (
    <div className="overflow-auto rounded-[10px] bg-white">
    <div className="w-[100px]">
      <table className="">
        <thead className=" bg-blue-950 text-white">
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key, index) => (

                key !== "ResetRequest" && (   //remove ResetRequest coloumn

                <th key={index} className="p-3 ">
                  {key}
                </th>)
                ))}
                <th className=""></th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="">
              {Object.keys(item).map((fieldName, cellIndex) => (
                fieldName !== "ResetRequest" && ( //remove ResetRequest coloumn
                <td
                  key={cellIndex}
                  className= {`text-sm p-3 text-center
                  ${fieldName ==="CompanyType" || fieldName ==="SupplierName" ? "hover:bg-gray-100 cursor-pointer" : ""} 
                  ${fieldName === "BankInfor" ? "hover:text-red-500 focus:text-red-500 cursor-pointer": ""}`}
                  onClick={() => handleCellClick(item, fieldName)}
                >
                  {item[fieldName]}
                </td>)
              ))}
              <td className="pr-1 sticky right-0 " >
                <SupTableEdit email={item.PrimaryEmailAddress} SupCode={item.SupplierCode} ResetRequest={item.ResetRequest}
                 />
              </td>
            </tr>
          ))}
        </tbody>        
      </table>      
        <div>
            <TablePopup openPopup={addPopup} closePopup={setAddPopup} data={popupData} />        
        </div>
    </div>
    </div>
    
  );
}
