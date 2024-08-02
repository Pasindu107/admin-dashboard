"use client";

import DashAuthPopup from "@/components/DashAuthPopup";
import ProtectedRoute from "@/components/ProtectRoute";
import SupTableEdit from "@/components/SupTableEdit";
import TablePopup from "@/components/TablePopup";
import React, { useEffect, useState } from "react";
import { fetchAuth } from "@/src/app/api/dashAuthApi";
import PayReceivedPopup from "@/components/SupPayReceivedPopup";



// Function to fetch data from the API
const fetchData = async () => {
  //const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBhc2luZHUiLCJpYXQiOjE3MTYwMTMyOTQsImV4cCI6MzE3MjYwNDU1Njk0fQ.oqjRfBHwna323gz1bh00niCpcA0efJMNe-NMQ50m0CQ";
  const token = localStorage.getItem('token');
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
  //const [isLoading, setIsLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [payReceivedPopup, setPayReceivedPopup] = useState(false)

  //Acton auth
  const [authData, setAuthData] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    const checkAuthorization = async () => {
        try {
            const roleId = localStorage.getItem('UserRole');
            const profId = 6;
            const data = await fetchAuth(roleId, profId);
            setAuthData(data);
            const isActive = data.some(item => item.Is_Active);
            setIsAuthorized(isActive);
        } catch (error) {
            console.error("Error fetching authorization data:", error);
        }
    };
    checkAuthorization();
}, []);


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

        if (!isAuthorized) {
          setPopupMessage('You are not authorized to perform this action!');
          setOpenPopup(true);
          setTimeout(() => {
              setPopupMessage('');
              setOpenPopup(false);
            }, 2000); // Adjust timeout
          return;
      }

        setIsLoading(true); //download image loading

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
          alert("File not found");
        } else {
          alert(`An error occurred: ${error.message}`);
        }
        setDownloadError(error.message);
      }  finally {
        setIsLoading(false);
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
      case "PaymentReceived":
        setPopupData(item[fieldName]);
        setPayReceivedPopup(true);
        break;
      default:
        responseMessage = `Clicked on: ${fieldName}`;
        setPopupData(null); // Clear the data if popup is closed
        setAddPopup(false);
        setPayReceivedPopup(false); 
        
    }

    
  };

  // Render fetched data in a table
  return (
    <ProtectedRoute>
    <div className="overflow-auto rounded-[10px] bg-white">
    <div className="w-[100px]">
      <table className="">
        <thead className=" bg-indigo-500 text-white text-sm">
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key, index) => (

                key !== "ResetRequest" && (   //remove ResetRequest coloumn

                <th key={index} className="p-4 ">
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
                  className= {`text-sm p-4 text-center
                  ${fieldName ==="CompanyType" || fieldName ==="SupplierName" ? "hover:bg-gray-100 cursor-pointer" : ""} 
                  ${fieldName === "BankInfor" ? `hover:text-blue-500 hover:underline cursor-pointer` : ""}`}
                  onClick={() => handleCellClick(item, fieldName)}
                >
                  {fieldName === "PaymentReceived" 
                  ? <PayReceivedPopup PayRe={item.PaymentReceived} email={item.PrimaryEmailAddress} /> 
                   : item[fieldName]}
                  
                </td>)
              ))}
              <td className="pr-3 sticky right-0 " >
                <SupTableEdit email={item.PrimaryEmailAddress} SupCode={item.SupplierCode} ResetRequest={item.ResetRequest}
                 />
              </td>
            </tr>
          ))}
        </tbody>        
      </table>      
        {/* <div>
            <PayReceivedPopup openPopup={payReceivedPopup} closePopup={setPayReceivedPopup} data={popupData} />        
        </div> */}


        <div>
            <TablePopup openPopup={addPopup} closePopup={setAddPopup} data={popupData} />        
        </div>

        </div>
        {openPopup && (
                    <DashAuthPopup openPopup={openPopup} closePopup={setOpenPopup} data={popupMessage} />
                )}
          {isLoading && (
                <DashAuthPopup openPopup={isLoading} closePopup={() => setIsLoading(false)} data={"Downloading...."} />
            )}
    </div>
    </ProtectedRoute>
    
  );
}
