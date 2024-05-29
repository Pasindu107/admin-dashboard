"use client";

import TablePopup from "@/components/TablePopup";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import FTP from 'ftp';
import fs from 'fs';

// Function to download images from FTP server
const downloadImageFromFTP = (imageName) => {
  const ftp = new FTP();
  const ftpOptions = {
      host: 'ftp.heptagonss.com',
      user: 'uploadheptagon',
      password: 'o5c219Px#'
  };

  ftp.connect(ftpOptions);

  ftp.on('ready', () => {
      ftp.get(`/images/${imageName}`, (err, stream) => {
          if (err) {
              console.error('Error downloading image:', err);
              return;
          }

          stream.once('close', () => ftp.end());
          stream.pipe(fs.createWriteStream(`downloaded_images/${imageName}`)); // Change the path where you want to save the downloaded image
      });
  });
};

// Function to fetch data from the API
const fetchData = async () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBhc2luZHUiLCJpYXQiOjE3MTYwMTMyOTQsImV4cCI6MzE3MjYwNDU1Njk0fQ.oqjRfBHwna323gz1bh00niCpcA0efJMNe-NMQ50m0CQ";
  try {
    const fieldData = {
      method: "GET",
      headers: { "Content-Type": "application/json", "access-token": token },
      body: JSON.stringify(),
    };
    const response = await fetch(
      "http://localhost:8000/supplier/getsupreg",
      fieldData
    );
    const data = await response.json();
    // console.log(data.Data);
    return data.Data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Component
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

  // Click handler function
  const handleCellClick = (item, fieldName) => {
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
        responseMessage = `Primary Email Address is: ${item.PrimaryEmailAddress}`;
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
        responseMessage = `Bank Info is: ${item.BankInfor}`;
        downloadImageFromFTP(imageName);

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
    <div className="   overflow-scroll rounded-lg md:w-[675px]  lg:w-[668px] xl:w-[1550px]">
      <table className="">
        <thead className=" bg-blue-950 text-white ">
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key, index) => (
                <th key={index} className="p-3">
                  {key}
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-100">
              {Object.keys(item).map((fieldName, cellIndex) => (
                <td
                  key={cellIndex}
                  className="text-sm p-3 cursor-pointer"
                  onClick={() => handleCellClick(item, fieldName)}
                >
                  {item[fieldName]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        
      </table>

      
        <div>
            <TablePopup openPopup={addPopup} closePopup={setAddPopup} data={popupData} />
          
            {/* </TablePopup> */}
        
        </div>
    </div>
    
  );
}