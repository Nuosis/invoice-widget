import React, { useEffect, useState } from "react";
import InvoiceTable from "./components/InvoiceTable";
import Spinner from "./components/Spinner.jsx";
import FileMakerService from "./services/fileMakerService";

/**
 * App
 * Root component for the invoice widget.
 * - Waits for FileMaker object, shows spinner while waiting
 * - Fetches QBO data via FileMakerService, shows spinner while loading
 * - Renders InvoiceTable with fetched data
 */
function App() {
  const [fileMakerReady, setFileMakerReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [qboData, setQboData] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const getMonthDates = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const lastDayOfMonth = new Date(year, date.getMonth() + 1, 0).getDate();
    return {
      startDate: `${year}-${month}-01`,
      endDate: `${year}-${month}-${lastDayOfMonth}`,
      monthName: date.toLocaleString('default', { month: 'long', year: 'numeric' })
    };
  };

  const navigateMonth = async (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    await fetchData(newDate);
  };

  // Wait for FileMaker object
  useEffect(() => {
    const checkFileMaker = () => {
      if (typeof window.FileMaker !== 'undefined' || typeof window.FMGofer !== 'undefined') {
        setFileMakerReady(true);
        return true;
      }
      return false;
    };

    // Check immediately
    if (checkFileMaker()) return;

    // If not found, set up interval
    const interval = setInterval(() => {
      if (checkFileMaker()) {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Fetch QBO data for a specific date
  const fetchData = async (date = currentDate) => {
    setLoading(true);
    try {
      if (fileMakerReady) {
        const { startDate, endDate } = getMonthDates(date);

        const result = await FileMakerService.executeScript({
          method: "async",
          script: "JS * Fetch QBO",
          params: {
            action: "fetchQBO",
            start: startDate,
            end: endDate
          }
        });

        let data;
        try {
          data = typeof result === "string" ? JSON.parse(result) : result;
        } catch {
          data = null;
        }

        // If no data found and not in current month, reset to current month
        if ((!data || !data.QueryResponse || !data.QueryResponse.Invoice) &&
            date.getMonth() !== new Date().getMonth()) {
          setCurrentDate(new Date());
          setQboData(null);
          return;
        }

        setQboData(data);
      } else {
        // In demo mode: use static data
        console.log("In demo mode: using static data");
        const response = await fetch("/custInv.json");
        const data = await response.json();
        setQboData(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setQboData(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts or month changes
  useEffect(() => {
    fetchData();
  }, [fileMakerReady, currentDate]);

  if (!fileMakerReady) {
    return (
      <div className="h-[400px] w-full bg-white flex items-center justify-center">
        <Spinner />
      </div>
    );
  }


  if (!qboData || !qboData.QueryResponse || !qboData.QueryResponse.Invoice) {
    return (
      <div className="h-[400px] w-full bg-white flex items-center justify-center">
        <div className="text-gray-500">No QBO data found.</div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        marginBottom: '16px',
        borderBottom: '1px solid #e5e7eb',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <button
          onClick={() => navigateMonth(-1)}
          style={{
            color: '#2563eb',
            fontWeight: 500,
            padding: '8px 16px',
            cursor: 'pointer',
            border: 'none',
            background: 'none'
          }}
        >
          ← Previous Month
        </button>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          margin: 0
        }}>
          {getMonthDates(currentDate).monthName}
        </h2>
        <button
          onClick={() => navigateMonth(1)}
          style={{
            color: '#2563eb',
            fontWeight: 500,
            padding: '8px 16px',
            cursor: 'pointer',
            border: 'none',
            background: 'none'
          }}
        >
          Next Month →
        </button>
      </div>
      <InvoiceTable
        invoices={qboData.QueryResponse.Invoice}
        loading={loading}
      />
    </div>
  );
}

export default App;