import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "./ComponentToPrint";

export default function PrintBill({printClient, setprintClient}) {

    console.log("PrintBill", printClient);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current
    });
  
    return (
        <>
            <div>
                <button
                    type="button"
                    className="bg-gray-500 border border-gray-500 p-2 mb-4"
                    onClick={handlePrint}
                >
                    {" "}
                    Print Report{" "}
                </button>
                <ComponentToPrint ref={componentRef} printClient={printClient} setprintClient={setprintClient} />
            </div>
        </>
    );
}