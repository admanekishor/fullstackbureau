import React from "react";
import { Table } from "react-bootstrap";

const ComponentToPrint = React.forwardRef(({printClient, setprintClient}, ref) => {

    console.log("printClient", printClient);
    const value = {
        basicDetails: {
            CompanyName: "Muktai Nurses Bureau ",
            email: "muktaibureau@gmail.com",
            phoneNumber: "+91 9834301398 / 8208960038",
            website: "http://www.muktainursesbureau.in/",
            location: "Dattawadi 999, Pune"
        },


        clientDetails: [
            {
                clientName: printClient.client_name,
                // clientName: "Lata Purandarey",
                location: printClient.client_address,
                // location: "F. No 401 Nandanwan apt Near pratidnya hall Opp orchid Nursary Karvenagar",
                contact: printClient.client_contact,
                // contact: "9860572488",
                email: "-",
                workingDays: "30",
                amount: printClient.client_amount
                // amount: "7,800"
            }
        ],
        signatureTxt: {
            message:
                "Sheetal Vishnu Admane",
            subtxt: "(CEO)"
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
                                    <div className="w-full object-cover object-center p-5 bg-gray-100 text-center">
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
                                    <div className="flex flex-wrap w-full p-1">
                                        <h2 className="text-md bold title-font text-gray-500 tracking-widest text-center">
                                            Bill Invoice
                                        </h2>
                                    </div>
                                    <div className="flex flex-wrap w-full p-5">
                                        <div className="w-2/3">
                                            <h5 className="text-md bold title-font text-gray-500 tracking-widest text-right">
                                                Date: 30/04/2022
                                            </h5>
                                            <div className="flex flex-wrap">
                                                <div className="w-1/2">
                                                    <Table className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th colSpan="3">
                                                                    {" "}
                                                                    <h5>Client Details</h5>
                                                                </th>

                                                            </tr>
                                                        </thead>

                                                        {value.clientDetails.map((workItem, i) => (
                                                            <tbody key={i}>

                                                                <tr>
                                                                    <td rowSpan="3">
                                                                        {" "}
                                                                        <h5>{workItem.clientName}</h5>
                                                                        {" "}
                                                                        <h5>{workItem.location}</h5>
                                                                    </td>
                                                                    <td>
                                                                        {" "}
                                                                        <h5>Invoice Month</h5>
                                                                    </td>
                                                                    <td>
                                                                        {" "}
                                                                       <h5>April</h5>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        {" "}
                                                                        <h5>Phone</h5>
                                                                    </td>
                                                                    <td>
                                                                        {" "}
                                                                        <h5>{workItem.contact}</h5>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        {" "}
                                                                      <h5>Email</h5>
                                                                    </td>
                                                                    <td>
                                                                        {" "}
                                                                        <h5>{workItem.email}</h5>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        {" "}
                                                                        <h5>Description</h5>
                                                                    </th>
                                                                    <th>
                                                                        {" "}
                                                                        <h5>Service By Hours</h5>
                                                                    </th>
                                                                    <th>
                                                                        {" "}
                                                                        <h5>Amount</h5>
                                                                    </th>

                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        {" "}
                                                                       <h5> {workItem.workingDays} working Days</h5>
                                                                    </td>
                                                                    <td>
                                                                        {" "}
                                                                        <h5>24 hrs.</h5>
                                                                    </td>
                                                                    <td>
                                                                        {" "}
                                                                       <h5> {workItem.amount}</h5>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>

                                                                    </td>
                                                                    <td></td>
                                                                    <td>&nbsp;</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>

                                                                    </td>
                                                                    <td></td>
                                                                    <td>&nbsp;</td>
                                                                </tr>
                                                                <tr>
                                                                    <td rowSpan="3">
                                                                        <h5>Comments or Special Instructions:</h5>

                                                                    </td>
                                                                    <td rowSpan="3">
                                                                        {" "}
                                                                        <h5>Subtotal</h5>
                                                                        <h5>Tax</h5>
                                                                        <h5>Total</h5>
                                                                    </td>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <td></td>
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
                                                className="leading-relaxed mt-5 text-sm font-weight-bold pt-5 col-3"

                                            >
                                                <p className="text-center">{value.signatureTxt.message}<br />
                                                    {value.signatureTxt.subtxt}</p>
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
