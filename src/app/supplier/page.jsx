'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

// Function to fetch data from the API
const fetchData = async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBhc2luZHUiLCJpYXQiOjE3MTYwMTMyOTQsImV4cCI6MzE3MjYwNDU1Njk0fQ.oqjRfBHwna323gz1bh00niCpcA0efJMNe-NMQ50m0CQ";
    try {
        const fieldData = {
            method: "GET",
            headers: { "Content-Type": "application/json" , 'access-token': token},
            body: JSON.stringify()
          };
        const response = await fetch(
            "http://localhost:8000/supplier/getsupreg", fieldData
        );
        const data = await response.json();
        console.log(data.Data);
        return data.Data;
        
    } catch (error) {
        console.error(error);
        return [];
    } 
};

// Component
export default function Data() {
    const [data, setData] = useState([]);

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
            case 'IdNo':
                responseMessage = <Link href={"/"}></Link>;
                break;
            case 'CompanyType':
                responseMessage = `Company Type is: ${item.CompanyType}`;
                break;
            case 'SupplierName':
                responseMessage = `Supplier Name is: ${item.SupplierName}`;
                break;
            case 'AuthorizedPerson':
                responseMessage = `Authorized Person is: ${item.AuthorizedPerson}`;
                break;
            case 'ContactPerson':
                responseMessage = `Contact Person is: ${item.ContactPerson}`;
                break;
            case 'TaxID':
                responseMessage = `Tax ID is: ${item.TaxID}`;
                break;
            case 'BankName':
                responseMessage = `Bank Name is: ${item.BankName}`;
                break;
            case 'AccountNumber':
                responseMessage = `Account Number is: ${item.AccountNumber}`;
                break;
            case 'Payee':
                responseMessage = `Payee is: ${item.Payee}`;
                break;
            case 'CreditPeriod':
                responseMessage = `Credit Period is: ${item.CreditPeriod}`;
                break;
            case 'PaymentMethod':
                responseMessage = `Payment Method is: ${item.PaymentMethod}`;
                break;
            case 'RegisterAddress':
                responseMessage = `Register Address is: ${item.RegisterAddress}`;
                break;
            case 'BillingAddress':
                responseMessage = `Billing Address is: ${item.BillingAddress}`;
                break;
            case 'ContactPerson2':
                responseMessage = `Contact Person 2 is: ${item.ContactPerson2}`;
                break;
            case 'PrimaryEmailAddress':
                responseMessage = `Primary Email Address is: ${item.PrimaryEmailAddress}`;
                break;
            case 'SecondaryEmailAddress':
                responseMessage = `Secondary Email Address is: ${item.SecondaryEmailAddress}`;
                break;
            case 'CompanyRegNum':
                responseMessage = `Company Reg Number is: ${item.CompanyRegNum}`;
                break;
            case 'TaxRegNumber':
                responseMessage = `Tax Reg Number is: ${item.TaxRegNumber}`;
                break;
            case 'DeedofEstablishment':
                responseMessage = `Deed of Establishment is: ${item.DeedofEstablishment}`;
                break;
            case 'BusinessLicense':
                responseMessage = `Business License is: ${item.BusinessLicense}`;
                break;
            case 'PermisessLicense':
                responseMessage = `Permits License is: ${item.PermisessLicense}`;
                break;
            case 'AuthPersonID':
                responseMessage = `Authorized Person ID is: ${item.AuthPersonID}`;
                break;
            case 'BankInfor':
                responseMessage = `Bank Info is: ${item.BankInfor}`;
                break;
            case 'InsertDate':
                responseMessage = `Insert Date is: ${item.InsertDate}`;
                break;
            default:
                responseMessage = `Clicked on: ${fieldName}`;
        }
        //setMessage(responseMessage);
        // Display the message in a way you prefer, e.g., alert, modal, etc.
        alert(responseMessage);
        //history.push(routePath);
        responseMessage;
    };

    // Render fetched data in a table
    return (
        <div className=' overflow-scroll rounded-lg md:w-[675px]  lg:w-[668px] xl:w-[1550px]'>
            <table className=''>
            <thead className='bg-blue-950 text-white'>
                    <tr>
                        {data.length > 0 && Object.keys(data[0]).map((key, index) => (
                            <th key={index} className='p-3'>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className='divide-y'>
                    {data.map((item, rowIndex) => (
                        <tr key={rowIndex} className='hover:bg-gray-100'>
                            {Object.keys(item).map((fieldName, cellIndex) => (
                                <td key={cellIndex} className='text-sm p-3 cursor-pointer' onClick={() => handleCellClick(item, fieldName)}>
                                    {item[fieldName]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>




                {/* <thead className='bg-blue-950 text-white '>
                    <tr className=''>
                        <th className='p-3'>Id No</th>
                        <th className='p-3'>Company Type</th>
                        <th className='p-3'>Supplier Name</th>
                        <th className='p-3'>Authorized Person</th>
                        <th className='p-3'>Contact Person</th>
                        <th className='p-3'>Tax ID</th>
                        <th className='p-3'>Bank Name</th>
                        <th className='p-3'>Account Number</th>
                        <th className='p-3'>Payee</th>
                        <th className='p-3'>Credit Period</th>
                        <th className='p-3'>Payment Method</th>
                        <th className='p-3'>Register Address</th>
                        <th className='p-3'>Billing Address</th>
                        <th className='p-3'>Contact Person2</th>
                        <th className='p-3'>Primary Email Address</th>
                        <th className='p-3'>Secondary Email Address</th>
                        <th className='p-3'>Comapany Reg Num</th>
                        <th className='p-3'>Tax Reg Number</th>
                        <th className='p-3'>Deed of Establishment</th>
                        <th className='p-3'>Business License</th>
                        <th className='p-3'>Permisess License</th>
                        <th className='p-3'>Auth Person ID</th>
                        <th className='p-3'>Bank Infor</th>
                        <th className='p-3'>Insert Date</th>
                    </tr>
                </thead>
                <tbody className='divide-y '>
                    {data.map((item, index) => (
                        <tr key={index} className='hover:bg-gray-100' onClick={() => handleCellClick(item, index)}>
                            {Object.keys(item).map((fieldName, i) => (
                                <td key={i} className='text-sm p-3' onClick={() => handleCellClick(item, fieldName)}>
                                    {item[fieldName]}
                                </td>
                            ))}
                            <td className='text-sm p-3'>{item.IdNo}</td>
                            <td className='text-sm p-3'>{item.CompanyType}</td>
                            <td className='text-sm p-3'>{item.SupplierName}</td>
                            <td className='text-sm p-3'>{item.AuthorizedPerson}</td>
                            <td className='text-sm p-3'>{item.ContactPerson}</td>
                            <td className='text-sm p-3'>{item.TaxID}</td>
                            <td className='text-sm p-3'>{item.BankName}</td>
                            <td className='text-sm p-3'>{item.AccountNumber}</td>
                            <td className='text-sm p-3'>{item.Payee}</td>
                            <td className='text-sm p-3'>{item.CreditPeriod}</td>
                            <td className='text-sm p-3'>{item.PaymentMethod}</td>
                            <td className='text-sm p-3'>{item.RegisterAddress}</td>
                            <td className='text-sm p-3'>{item.BillingAddress}</td>
                            <td className='text-sm p-3'>{item.ContactPerson2}</td>
                            <td className='text-sm p-3'>{item.PrimaryEmailAddress}</td>
                            <td className='text-sm p-3'>{item.SecondaryEmailAddress}</td>
                            <td className='text-sm p-3'>{item.ComapanyRegNum}</td>
                            <td className='text-sm p-3'>{item.TaxRegNumber}</td>
                            <td className='text-sm p-3'>{item.DeedofEstablishment}</td>
                            <td className='text-sm p-3'>{item.BusinessLicense}</td>
                            <td className='text-sm p-3'>{item.PermisessLicense}</td>
                            <td className='text-sm p-3'>{item.AuthPersonID}</td>
                            <td className='text-sm p-3'>{item.BankInfor}</td>
                            <td className='text-sm p-3'>{item.InsertDate}</td>
                        </tr>
                    ))}
                </tbody> */}

            </table>
                
        
            {/* <Table>
                <TableHeader>
                <TableRow className="bg-green-200">
                    <TableHead>Id No</TableHead>
                    <TableHead>Company Type</TableHead>
                    <TableHead>Supplier Name</TableHead>
                    <TableHead>Authorized Person</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Tax ID</TableHead>
                    <TableHead>Bank Name</TableHead>
                    <TableHead>Account Number</TableHead>
                    <TableHead>Payee</TableHead>
                    <TableHead>Credit Period</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Register Address</TableHead>
                    <TableHead>Billing Address</TableHead>
                    <TableHead>Contact Person2</TableHead>
                    <TableHead>Primary Email Address</TableHead>
                    <TableHead>Secondary Email Address</TableHead>
                    <TableHead>Comapany Reg Num</TableHead>
                    <TableHead>Tax Reg Number</TableHead>
                    <TableHead>Deed of Establishment</TableHead>
                    <TableHead>Business License</TableHead>
                    <TableHead>Permisess License</TableHead>
                    <TableHead>Auth Person ID</TableHead>
                    <TableHead>Bank Infor</TableHead>
                    <TableHead>Insert Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
        

                {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.IdNo}</TableCell>
                            <TableCell>{item.CompanyType}</TableCell>
                            <TableCell>{item.SupplierName}</TableCell>
                            <TableCell>{item.AuthorizedPerson}</TableCell>
                            <TableCell>{item.ContactPerson}</TableCell>
                            <TableCell>{item.TaxID}</TableCell>
                            <TableCell>{item.BankName}</TableCell>
                            <TableCell>{item.AccountNumber}</TableCell>
                            <TableCell>{item.Payee}</TableCell>
                            <TableCell>{item.CreditPeriod}</TableCell>
                            <TableCell>{item.PaymentMethod}</TableCell>
                            <TableCell>{item.RegisterAddress}</TableCell>
                            <TableCell>{item.BillingAddress}</TableCell>
                            <TableCell>{item.ContactPerson2}</TableCell>
                            <TableCell>{item.PrimaryEmailAddress}</TableCell>
                            <TableCell>{item.SecondaryEmailAddress}</TableCell>
                            <TableCell>{item.ComapanyRegNum}</TableCell>
                            <TableCell>{item.TaxRegNumber}</TableCell>
                            <TableCell>{item.DeedofEstablishment}</TableCell>
                            <TableCell>{item.BusinessLicense}</TableCell>
                            <TableCell>{item.PermisessLicense}</TableCell>
                            <TableCell>{item.AuthPersonID}</TableCell>
                            <TableCell>{item.BankInfor}</TableCell>
                            <TableCell>{item.InsertDate}</TableCell>
                        </TableRow>
                        ))}
    
            </TableBody>
            </Table> */}






    




          {/* <div className='table w-full m-auto p-4 rounded-lg bg-white'>
            <div className='table-header-group bg-purple-200 my-3 pl-4  p-4  items-center border border-purple-200 rounded-lg '>
                    <div className='table-row  '>
                        <span className='table-cell p-4'>Id No</span>
                        <span className='table-cell p-4'>Company Type</span>
                        <span className='table-cell p-4'>Supplier Name</span>
                        <span className='table-cell p-4'>Authorized Person</span>
                        <span className='table-cell p-4'>Contact Person</span>
                        <span className='table-cell p-4'>Tax ID</span>
                        <span className='table-cell p-4'>Bank Name</span>
                        <span className='table-cell p-4'>Account Number</span>
                        <span className='table-cell p-4'>Payee</span>
                        <span className='table-cell p-4'>Credit Period</span>
                        <span className='table-cell p-4'>Payment Method</span>
                        <span className='table-cell p-4'>Register Address</span>
                        <span className='table-cell p-4'>Billing Address</span>
                        <span className='table-cell p-4'>Contact Person2</span>
                        <span className='table-cell p-4'>Primary Email Address</span>
                        <span className='table-cell p-4'>Secondary Email Address</span>
                        <span className='table-cell p-4'>Comapany Reg Num</span>
                        <span className='table-cell p-4'>Tax Reg Number</span>
                        <span className='table-cell p-4'>Deed of Establishment</span>
                        <span className='table-cell p-4'>Business License</span>
                        <span className='table-cell p-4'>Permisess License</span>
                        <span className='table-cell p-4'>Auth Person ID</span>
                        <span className='table-cell p-4'>Bank Infor</span>
                        <span className='table-cell p-4'>Insert Date</span>
                    </div>
            </div>
          <div class="table-row-group">
          {data.map((item, index) => (
                        <div  key={index} className='table-row bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 items-center justify-between cursor-pointer'>
                            <div className='table-cell p-4'>{item.IdNo}</div>
                            <div className='table-cell'>{item.CompanyType}</div>
                            <div className='table-cell'>{item.SupplierName}</div>
                            <div className='table-cell'>{item.AuthorizedPerson}</div>
                            <div className='table-cell'>{item.ContactPerson}</div>
                            <div className='table-cell'>{item.TaxID}</div>
                            <div className='table-cell'>{item.BankName}</div>
                            <div className='table-cell'>{item.AccountNumber}</div>
                            <div className='table-cell'>{item.Payee}</div>
                            <div className='table-cell'>{item.CreditPeriod}</div>
                            <div className='table-cell'>{item.PaymentMethod}</div>
                            <div className='table-cell'>{item.RegisterAddress}</div>
                            <div className='table-cell'>{item.BillingAddress}</div>
                            <div className='table-cell'>{item.ContactPerson2}</div>
                            <div className='table-cell'>{item.PrimaryEmailAddress}</div>
                            <div className='table-cell'>{item.SecondaryEmailAddress}</div>
                            <div className='table-cell'>{item.ComapanyRegNum}</div>
                            <div className='table-cell'>{item.TaxRegNumber}</div>
                            <div className='table-cell'>{item.DeedofEstablishment}</div>
                            <div className='table-cell'>{item.BusinessLicense}</div>
                            <div className='table-cell'>{item.PermisessLicense}</div>
                            <div className='table-cell'>{item.AuthPersonID}</div>
                            <div className='table-cell'>{item.BankInfor}</div>
                            <div className='table-cell'>{item.InsertDate}</div>
                        </div>
                    ))}
          </div>

          </div> */}
          </div>
    )};
