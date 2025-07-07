/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */

import {useEffect, useState} from "react";

import {apiDelete, apiGet} from "../utils/api";
import Loader from "../components/Loader.jsx";

import PersonTable from "./PersonTable";
import PersonStatistics from "./PersonStatistics.jsx";

const PersonIndex = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [persons, setPersons] = useState([]);

    const deletePerson = async (id) => {
        try {
            await apiDelete("/api/persons/" + id);
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        setPersons(persons.filter((item) => item._id !== id));
    };

    useEffect(() => {
        apiGet("/api/persons")
            .then((data) => setPersons(data))
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <Loader />;

    return (
        <div className="container py-4">
            <div className="bg-light p-4 rounded shadow-sm">
                <h1 className="mb-4">Seznam osob</h1>
                <PersonTable
                    deletePerson={deletePerson}
                    items={persons}
                    label="Počet osob:"
                />
            </div>
            <div className="mt-4">
                <PersonStatistics />
            </div>
        </div>
    );
};
export default PersonIndex;
