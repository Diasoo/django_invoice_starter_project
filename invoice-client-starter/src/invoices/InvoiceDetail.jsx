import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {apiGet} from "../utils/api.js";
import {dateStringFormatter} from "../utils/dateStringFormatter.js";
import Loader from "../components/Loader.jsx";

const InvoiceDetail = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {id} = useParams();
    const [invoice, setInvoice] = useState({});

    useEffect(() => {
        apiGet("/api/invoices/" + id)
            .then((data) => setInvoice(data))
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    }, [id]);

    if (isLoading) return <Loader/>;

    return (
        <div className="container py-4">
            <h1 className="mb-4">Detail faktury</h1>

            <div className="card shadow-sm">
                <div className="card-body">
                    <h3 className="card-title">
                        Faktura č. {invoice.invoiceNumber}
                    </h3>
                    <hr/>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <strong>Datum vystavení:</strong><br/>
                            {dateStringFormatter(invoice.issued)}
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>Datum splatnosti:</strong><br/>
                            {dateStringFormatter(invoice.dueDate)}
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>Produkt:</strong><br/>
                            {invoice.product || <span className="text-muted">—</span>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>Cena (bez DPH):</strong><br/>
                            {invoice.price} Kč
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>DPH:</strong><br/>
                            {invoice.vat}%
                        </div>
                        <div className="col-md-12 mb-3">
                            <strong>Poznámka:</strong><br/>
                            {invoice.note || <span className="text-muted">—</span>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>Kupující:</strong><br/>
                            {invoice.buyer?.name || <span className="text-muted">—</span>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>Prodávající:</strong><br/>
                            {invoice.seller?.name || <span className="text-muted">—</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default InvoiceDetail;