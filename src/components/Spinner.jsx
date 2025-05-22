import React from "react";

function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: '3px solid rgba(8, 145, 178, 0.1)',
        borderTop: '3px solid #0891b2',
        animation: 'spin 0.8s linear infinite',
        boxShadow: '0 0 10px rgba(8, 145, 178, 0.2)'
      }} />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default Spinner;