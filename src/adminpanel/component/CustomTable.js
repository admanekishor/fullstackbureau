// components/CustomTable.js
import React from "react";

const CustomTable = ({ data, columns, title, actions }) => {
    if (!data || data.length === 0) return null;

    return (
        <div style={{ marginBottom: "30px" }}>
            <h5>{title}</h5>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th> {/* Index column */}
                        {columns.map((col) => (
                            <th key={col}>{col.toUpperCase()}</th>
                        ))}
                        {actions && actions.length > 0 && <th colSpan={actions.length}>ACTIONS</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            {columns.map((col) => (
                                <td key={col}>
                                    {col.toLowerCase().includes("date")
                                        ? new Date(row[col]).toLocaleDateString("en-GB") // dd/mm/yyyy format
                                        : row[col]
                                    }
                                </td>
                            ))}
                            {actions && actions.length > 0 && (

                                actions.map((action, i) => (
                                    <td key={i}>
                                        <button
                                            onClick={() => action.onClick(row)}
                                            className={typeof action.className === 'function' ? action.className(row) : (action.className || "btn btn-sm btn-primary")}
                                            style={{ marginRight: "5px" }}
                                        >
                                            {action.label}
                                        </button>
                                    </td>
                                ))

                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomTable;
