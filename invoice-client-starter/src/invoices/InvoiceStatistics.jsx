import React, { useEffect, useState } from 'react';

import {apiGet} from "../utils/api.js";

const InvoiceStatistics = () => {
    const [statistics, setStatistics] = useState({
        currentYearSum: 0,
        allTimeSum: 0,
        invoicesCount: 0,
    });

    useEffect(() => {
        apiGet("/api/invoices/statistics")
            .then((data) => setStatistics(data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="card shadow-sm p-4 bg-light">
            <div className="card-body">
                <h1 className="card-title mb-4">📊 Statistiky faktur</h1>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-light">
                        <strong>Celkový součet faktur za tento rok:</strong><br />
                        {statistics.currentYearSum} Kč
                    </li>
                    <li className="list-group-item bg-light">
                        <strong>Celkový součet faktur za celou dobu:</strong><br />
                        {statistics.allTimeSum} Kč
                    </li>
                    <li className="list-group-item bg-light">
                        <strong>Počet vystavených faktur:</strong><br />
                        {statistics.invoicesCount}
                    </li>
                </ul>
            </div>
        </div>
    );

}
export default InvoiceStatistics;