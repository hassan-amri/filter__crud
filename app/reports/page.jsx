"use client";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import "./page.css";

function page() {
  const [reports, setReports] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("/api/getReports"); // Replace with your actual API route
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        console.log(jsonData);

        setReports(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
      console.log("reports :", reports);
    };

    fetchReports();
  }, []);
  return (
    <div>
      <Header />
      <h2>reports</h2>
      <div class="table-container">
    <table class="reports-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
            </tr>
        </thead>
        <tbody>
            {reports.map((report, index) => (
                <tr key={index}>
                    <td>{report.name}</td>
                    <td>{report.mail}</td>
                    <td className="message-cell">{report.message}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
    </div>
  );
}

export default page;
