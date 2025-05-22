import React from "react";

/**
 * GlobalFilter
 * Controlled input for filtering invoices by customer name or invoice ID.
 */
function GlobalFilter({ value, onChange }) {
  return (
    <input
      style={{
        width: '20%',
        padding: '16px',
        border: '1px solid #d1d5db'
      }}
      placeholder="Filter by customer or invoice ID"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}

export default GlobalFilter;