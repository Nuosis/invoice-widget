import React, { useEffect, useState } from "react";
import InvoiceRow from "./InvoiceRow";
import GlobalFilter from "./GlobalFilter";
import Spinner from "./Spinner";

/**
 * InvoiceTable
 * Loads and displays invoices from custInv.json.
 * - Filters by ItemRef.value (2, 10, 38, 11)
 * - Shows CustomerRef.name and last line Amount
 * - Expands to show line details
 * - Includes a global filter
 * - Tailwind CSS for styling
 */
const allowedItemRefs = ["2", "10", "38", "11"];

function InvoiceTable({ invoices: initialInvoices = [], loading = false }) {
  const [filter, setFilter] = useState("");
  const [expanded, setExpanded] = useState({});
  
  // Filter invoices to only include those with allowed ItemRefs
  const invoices = initialInvoices.filter(inv =>
    inv.Line?.some(
      line =>
        line.SalesItemLineDetail &&
        allowedItemRefs.includes(line.SalesItemLineDetail.ItemRef?.value)
    )
  );

  const filtered = invoices.filter(inv =>
    filter
      ? inv.CustomerRef?.name?.toLowerCase().includes(filter.toLowerCase()) ||
        inv.Id.includes(filter)
      : true
  );

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculate total sum of all filtered invoices
  const totalSum = filtered.reduce((sum, inv) => {
    if (!inv?.Line) return sum;
    return sum + inv.Line
      .filter(l => l?.SalesItemLineDetail)
      .reduce((lineSum, line) => lineSum + (line?.Amount || 0), 0);
  }, 0);

  // Get current month name
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentMonth = monthNames[new Date().getMonth()];

  return (
    <div style={{ position: 'relative', minHeight: '400px' }}>
      {loading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.7)',
          zIndex: 10
        }}>
          <Spinner />
        </div>
      )}
      <div className="invoice-container">
        <h1 className="invoice-title">
          Total: ${totalSum.toFixed(2)}
        </h1>
        <div className="filter-container">
          <GlobalFilter value={filter} onChange={setFilter} />
        </div>
        <table className="invoice-table">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2 text-left font-semibold">Invoice ID</th>
              <th className="px-4 py-2 text-left font-semibold">Customer</th>
              <th className="px-4 py-2 text-right font-semibold">Amount</th>
              <th className="px-4 py-2 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(inv => (
              <InvoiceRow
                key={inv.Id}
                invoice={inv}
                expanded={!!expanded[inv.Id]}
                onToggle={toggleExpand}
              />
            ))}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 py-8">
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InvoiceTable;