import React from "react";
import InvoiceLines from "./InvoiceLines";

/**
 * InvoiceRow
 * Renders a single invoice row and its expandable line details.
 */
function InvoiceRow({ invoice, expanded, onToggle }) {
  // Calculate total sum of all line amounts
  const total = invoice.Line
    .filter(l => l.SalesItemLineDetail)
    .reduce((sum, line) => sum + line.Amount, 0);

  return (
    <>
      <tr
        className="border-b hover:bg-gray-50 cursor-pointer"
        onClick={() => onToggle(invoice.Id)}
      >
        <td className="px-4 py-2">{invoice.Id}</td>
        <td className="px-4 py-2">{invoice.CustomerRef?.name}</td>
        <td className="px-4 py-2 text-right">
          ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </td>
        <td className="px-4 py-2 text-right">
          <span className="text-blue-600 font-medium text-xl px-2">
            {expanded ? "▼" : "▶"}
          </span>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-gray-50">
          <td colSpan={4} className="px-4 py-2">
            <InvoiceLines lines={invoice.Line.filter(l => l.SalesItemLineDetail)} />
          </td>
        </tr>
      )}
    </>
  );
}

export default InvoiceRow;