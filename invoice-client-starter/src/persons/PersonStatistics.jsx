import  { useEffect, useState } from 'react';

import {apiGet} from "../utils/api.js";
import Loader from "../components/Loader.jsx";

const PersonStatistics = () => {
    const [statistics, setStatistics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        apiGet("/api/persons/statistics")
            .then((data) => setStatistics(data))
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="card shadow-sm p-4 bg-light">
            <div className="card-body">
                <h1 className="card-title mb-4">📊 Statistiky osob</h1>
                <ul className="list-group list-group-flush">
                    {statistics.map((stat) => (
                        <li key={stat.PersonId} className="list-group-item bg-light">
                            <strong>{stat.personName}:</strong><br />
                            Příjmy: {stat.revenue}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default PersonStatistics;