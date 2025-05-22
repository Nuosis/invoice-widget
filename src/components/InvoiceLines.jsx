import React from "react";

/**
 * InvoiceLines
 * Displays the line details for a given invoice.
 * Expects an array of line objects (filtered to only those with SalesItemLineDetail).
 */
function InvoiceLines({ lines }) {
  if (!lines || lines.length === 0) {
    return <div className="text-gray-500 italic px-4 py-2">No line details available.</div>;
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-gray-50 border-b border-gray-200">
          <th className="px-3 py-2 text-left font-medium text-gray-600">Description</th>
          <th className="px-3 py-2 text-left font-medium text-gray-600">Service Date</th>
          <th className="px-3 py-2 text-right font-medium text-gray-600">Qty</th>
          <th className="px-3 py-2 text-right font-medium text-gray-600">Unit Price</th>
          <th className="px-3 py-2 text-right font-medium text-gray-600">Amount</th>
        </tr>
      </thead>
      <tbody>
        {lines.map((line, idx) => (
          <tr key={idx} className="border-b border-gray-100">
            <td className="px-3 py-2">{line.Description}</td>
            <td className="px-3 py-2">{line.SalesItemLineDetail.ServiceDate}</td>
            <td className="px-3 py-2 text-right">{line.SalesItemLineDetail.Qty}</td>
            <td className="px-3 py-2 text-right">
              ${line.SalesItemLineDetail.UnitPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
            <td className="px-3 py-2 text-right">
              ${line.Amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InvoiceLines;