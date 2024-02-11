import React, { useState } from "react";
import { Table } from "react-bootstrap";

const ComponentToPrint = React.forwardRef(({ printClient, setprintClient }, ref) => {
console.log("printClient", printClient);

    const daycalculate = (start_date, end_date) => {
        const start = new Date(start_date);
        const end = new Date(end_date);
        let dayCount = 0
        // let getmonth = 0
        while (end > start) {
            dayCount++
            start.setDate(start.getDate() + 1)
            //    getmonth = start.setDate(start.getMonth() + 1)
        }
        return dayCount;

    }
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yy = today.getFullYear();

    console.log("today", mm)
    const value = {
        basicDetails: {
            CompanyName: "Muktai Nurses Bureau ",
            email: "muktaibureau@gmail.com",
            phoneNumber: "+91 9834301398 / 8208960038",
            website: "http://www.muktainursesbureau.in/",
            location: "Dattawadi 999, Pune",
            date: dd + "/" + mm + "/" + yy
            // date: "31" + "/" + "08" + "/" + "2022"
        },


        clientDetails: [
            {

                clientName: printClient.client_name,
                // clientName: "Lata Purandare",
                location: printClient.client_address,
                // location: "F.No 401, Nandanwan Apt. Near Pratidnya Hall, Opp Orchid Nursary, Karve Nagar",
                contact: printClient.client_contact,
                // contact: "9860572488",
                email: "-",
                workingDays: daycalculate(printClient.start_date, printClient.end_date),
                // workingDays: "30 Days",
                // servicemonth: new Date().toUTCString().slice(7, 12),
                servicemonth: "DEC",
                workinghour: "5 hr",
                amount: printClient.client_amount * daycalculate(printClient.start_date, printClient.end_date),
                // amount: "21,300/-"
            }
        ],
        signatureTxt: {
            message:
                "",
            subtxt: "Sign"
        },
    };

    return (
        <div className="bg-gray-200 p-6" ref={ref}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="a4-screen-sized">
                            <div className="aspect-ratio-box rounded-lg overflow-hidden">
                                <div className="aspect-ratio-box-inside overflow-hidden">
                                    <div className="w-full object-cover object-center p-2 bg-gray-100 text-center">
                                        <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3 uppercase">
                                            {value.basicDetails.CompanyName} {value.basicDetails.lastName}
                                        </h1>
                                        <p
                                            className="leading-relaxed mb-1"
                                        // style={{ color: "rgb(255, 179, 62)" }}
                                        >
                                            {" "}
                                            {value.basicDetails.location}{" "}
                                        </p>
                                        <p className="mb-1">{value.basicDetails.email}{" "}</p>
                                        <p className="mb-1">Phone: {value.basicDetails.phoneNumber}{" "}</p>

                                    </div>
                                    <div className="flex flex-wrap w-full px-1">
                                        <h2 className="text-md bold title-font text-gray-500 tracking-widest text-center">
                                            Bill Invoice
                                        </h2>
                                    </div>
                                    <div className="flex flex-wrap w-full p-2">
                                        <div className="">
                                            <p className="float-end"><strong className="text-md bold title-font text-gray-500 tracking-widest text-end">
                                                Date: {value.basicDetails.date}
                                            </strong>
                                            </p>
                                            <div className="flex flex-wrap">
                                                <div className="w-1/2">
                                                    <Table className="table table-bordered" style={{ border: '1px solid' }}>
                                                        <thead>
                                                            <tr>
                                                                <th colSpan="3">
                                                                    {" "}
                                                                    <p className="p-0 m-0">Client Details</p>
                                                                </th>

                                                            </tr>
                                                        </thead>

                                                        {value.clientDetails.map((workItem, i) => (
                                                            <tbody key={i}>

                                                                <tr>
                                                                    <td rowSpan="3">
                                                                        {" "}
                                                                        <p className="m-0">
                                                                            <strong>
                                                                                {workItem.clientName}
                                                                            </strong>
                                                                        </p>
                                                                        {" "}
                                                                        <h5 className="m-0">{workItem.location}</h5>
                                                                    </td>
                                                                    <th style={{ width: "160px" }}>
                                                                        {" "}
                                                                        <p className="m-0">Invoice Month</p>
                                                                    </th>
                                                                    <td>
                                                                        {" "}
                                                                        <p className="m-0">{workItem.servicemonth}</p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        {" "}
                                                                        <p className="m-0">Phone</p>
                                                                    </th>
                                                                    <td>
                                                                        {" "}
                                                                        <p className="m-0">{workItem.contact}</p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        {" "}
                                                                        <p className="m-0">Email</p>
                                                                    </th>
                                                                    <td>
                                                                        {" "}
                                                                        <p className="m-0">{workItem.email}</p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        {" "}
                                                                        <p className="m-0">Description</p>
                                                                    </th>
                                                                    <th>
                                                                        {" "}
                                                                        <p className="m-0">Service By Hours</p>
                                                                    </th>
                                                                    <th>
                                                                        {" "}
                                                                        <p className="m-0">Amount</p>
                                                                    </th>

                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        {" "}
                                                                        <p className="m-0"> Working Days ({workItem.workingDays})</p>
                                                                    </th>
                                                                    <td>
                                                                        {" "}
                                                                        <p className="m-0">{workItem.workinghour}</p>
                                                                    </td>
                                                                    <td>
                                                                        {" "}
                                                                        <p className="m-0"> {workItem.amount}</p>
                                                                    </td>
                                                                </tr>
                                                                {/* <tr>
                                                                    <td>

                                                                    </td>
                                                                    <td></td>
                                                                    <td>&nbsp;</td>
                                                                </tr> */}
                                                                <tr>
                                                                    <td>

                                                                    </td>
                                                                    <td></td>
                                                                    <td>&nbsp;</td>
                                                                </tr>
                                                                <tr>
                                                                    <th rowSpan="3">
                                                                        <p className="m-0">Comments or Special Instructions:</p>

                                                                    </th>
                                                                    <th rowSpan="3">
                                                                        {" "}
                                                                        <p className="m-0">Subtotal</p>
                                                                        <p className="m-0">Tax</p>
                                                                        <p className="m-0">Total</p>
                                                                    </th>
                                                                    <td>
                                                                        <p></p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td><p></p></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><h5 className="mb-0">{workItem.amount} Rs.</h5></td>
                                                                </tr>
                                                            </tbody>
                                                        ))}
                                                    </Table>

                                                </div>
                                            </div>

                                            <div
                                                className="leading-relaxed mt-5 text-sm font-weight-bold pt-5 col-12"

                                            >
                                                {/* <p className="float-end"><strong>{value.signatureTxt.message}</strong><br />
                                                    <strong>{value.signatureTxt.subtxt}</strong></p> */}
                                            </div>
                                            {/* <div
                                                className="leading-relaxed text-sm"
                                                dangerouslySetInnerHTML={{
                                                    __html: value.signatureTxt.subtxt
                                                }}
                                            ></div> */}

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ComponentToPrint;
