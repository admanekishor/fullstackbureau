import React, { useRef } from "react";
// import { Button } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "./ComponentToPrint";

export default function PrintBill({printClient, setprintClient}) {

    console.log("PrintBill", printClient);
    const [dimensions] = React.useState({ width: 500, height: 500 });

    const componentRef = useRef();
const handlePrint = useReactToPrint({
  pageStyle: `@media print {
      @page {
        size: ${dimensions.width}mm ${dimensions.height}mm;
        margin: 0;
      }
    }`,
  content: () => componentRef.current,
//   onAfterPrint: () => handleResetPrint()
});
  
    return (
        <>
            <div>
                <ComponentToPrint ref={componentRef} printClient={printClient} setprintClient={setprintClient} />
                <button
                    type="button"
                    className="btn btn-primary border border-gray-500 p-2 mb-4 float-end"
                    onClick={handlePrint}
                >
                    {" "}
                    Print Report{" "}
                </button>
            </div>
        </>
    );
}