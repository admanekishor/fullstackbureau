// components/CustomTable.js
import React from "react";
import { Table } from "react-bootstrap";

const CustomTable = ({ data, columns, title, actions, renderers }) => {
    if (!data || data.length === 0) return null;

    return (
        <div style={{ marginBottom: "30px" }}>
            <h5>{title}</h5>
            <Table striped bordered hover size="sm">
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
                                    {renderers && renderers[col]
                                        ? renderers[col](row)
                                        : col.toLowerCase().includes("date")
                                            ? new Date(row[col]).toLocaleDateString("en-GB")
                                            : row[col]
                                    }
                                </td>
                            ))}
                            {actions && actions.length > 0 && (
                                <td colSpan={actions.length}>
                                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                        {actions.map((action, i) => (
                                            <button
                                                key={i}
                                                onClick={() => action.onClick(row)}
                                                className={typeof action.className === 'function' ? action.className(row) : (action.className || "btn btn-sm btn-primary")}
                                                style={{ marginRight: "5px" }}
                                            >
                                                {action.label}
                                            </button>
                                        ))}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default CustomTable;
