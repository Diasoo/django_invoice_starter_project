import { useEffect, useState } from "react";
import {apiDelete, apiGet} from "../utils/api.js";
import InvoiceTable from "./InvoiceTable.jsx";
import PropTypes from "prop-types";

const PersonInvoices = ({ identificationNumber, type }) => {
    const [invoices, setInvoices] = useState([]);

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
        if (!identificationNumber) return;
        const endpoint =
            type === "sales"
                ? `/api/identification/${identificationNumber}/sales/`
                : `/api/identification/${identificationNumber}/purchases/`;
        apiGet(endpoint)
            .then((data) => setInvoices(data))
            .catch((error) => console.log(error));
    }, [identificationNumber, type]);

    const label =
        type === "sales"
            ? "Počet faktur prodejů:"
            : "Počet faktur nákupů:";
    const title =
        type === "sales"
            ? "Faktury prodejů"
            : "Faktury nákupů";

    return (
        <div>
            <h1>{title}</h1>
            <InvoiceTable
                items={invoices}
                label={label}
                deleteInvoice={deleteInvoice}
            />
        </div>
    );
};

PersonInvoices.propTypes = {
    identificationNumber: PropTypes.string,
    type: PropTypes.oneOf(["sales", "purchases"]).isRequired,
};

export default PersonInvoices;