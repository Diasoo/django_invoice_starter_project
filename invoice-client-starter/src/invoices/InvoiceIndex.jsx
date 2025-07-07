import {useEffect, useState} from "react";

import {apiDelete, apiGet} from "../utils/api";
import Loader from "../components/Loader.jsx";

import InvoiceTable from "./InvoiceTable";
import InvoiceFilter from "./InvoiceFilter.jsx";
import InvoiceStatistics from "./InvoiceStatistics.jsx";

const InvoiceIndex = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [invoices, setInvoices] = useState([]);
    const [personList, setPersonList] = useState([]);
    const [showStatistics, setShowStatistics] = useState(false);
    const [filterState, setFilter] = useState({
        buyer_id: undefined,
        seller_id: undefined,
        product: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        limit: undefined
    });

    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/invoices/" + id);
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        setInvoices(invoices.filter((item) => item._id !== id));
    };

    useEffect(() => {
        apiGet("/api/invoices").then((data) => setInvoices(data));
        apiGet("/api/persons")
            .then((data) => setPersonList(data))
            .finally(() => setIsLoading(false));
    }, []);

    const handleChange = (e) => {
        if (e.target.value === "false" || e.target.value === "true" || e.target.value === '') {
            setFilter(prevState => {
                return {...prevState, [e.target.name]: undefined}
            });
        } else {
            setFilter(prevState => {
                return { ...prevState, [e.target.name]: e.target.value}
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = filterState;
        const data = await apiGet("/api/invoices", params);
        setInvoices(data);
    };

    if (isLoading) return <Loader />;

    return (
        <div className="container py-4">
            <div className="bg-light rounded shadow-sm p-4 mb-4">
                <h1 className="mb-4">Seznam faktur</h1>

                <InvoiceFilter
                    personList={personList}
                    filter={filterState}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    confirm="Filtrovat faktury"
                />

                <InvoiceTable
                    deleteInvoice={deleteInvoice}
                    items={invoices}
                />

                <div className="d-flex justify-content-end mt-4">
                    <button
                        className="btn btn-outline-primary w-100"
                        onClick={() => setShowStatistics((prev) => !prev)}
                    >
                        {showStatistics ? "Skrýt statistiky" : "Zobrazit statistiky"}
                    </button>
                </div>

            </div>

            {showStatistics && (
                <div className="bg-white rounded shadow-sm p-4">
                    <InvoiceStatistics />
                </div>
            )}
        </div>
    );

}
export default InvoiceIndex;