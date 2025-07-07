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

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Country from "./Country";
import { apiGet } from "../utils/api.js";
import Loader from "../components/Loader.jsx";

import BuyerSellerInvoice from "../invoices/BuyerSellerInvoice.jsx";

const PersonDetail = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const [person, setPerson] = useState({});
    const [showSellerInvoices, setShowSellerInvoices] = useState(false);
    const [showBuyerInvoices, setShowBuyerInvoices] = useState(false);

    useEffect(() => {
        apiGet("/api/persons/" + id)
            .then((data) => setPerson(data))
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));;
    }, [id]);
    const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

    if (isLoading) return <Loader />;

    return (
        <div className="container py-4">
            <h1 className="mb-4">Detail osoby</h1>
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h3 className="card-title">
                        {person.name} <small className="text-muted">({person.identificationNumber})</small>
                    </h3>
                    <hr />
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <strong>DIČ:</strong><br />
                            {person.taxNumber || <span className="text-muted">—</span>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>Bankovní účet:</strong><br />
                            {person.accountNumber}/{person.bankCode} <br />
                            <small className="text-muted">{person.iban}</small>
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>Tel.:</strong><br />
                            {person.telephone || <span className="text-muted">—</span>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>Mail:</strong><br />
                            {person.mail || <span className="text-muted">—</span>}
                        </div>
                        <div className="col-md-12 mb-3">
                            <strong>Sídlo:</strong><br />
                            {person.street}, {person.city}, {person.zip}, {country}
                        </div>
                        <div className="col-md-12">
                            <strong>Poznámka:</strong><br />
                            {person.note || <span className="text-muted">—</span>}
                        </div>
                    </div>
                </div>
            </div>

            {person.identificationNumber && (
                <div className="d-grid gap-3">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setShowSellerInvoices(!showSellerInvoices)}
                    >
                        {showSellerInvoices ? "Skrýt" : "Zobrazit"} faktury prodejů
                    </button>
                    {showSellerInvoices && (
                        <BuyerSellerInvoice
                            identificationNumber={person.identificationNumber}
                            type="sales"
                        />
                    )}

                    <button
                        className="btn btn-outline-success"
                        onClick={() => setShowBuyerInvoices(!showBuyerInvoices)}
                    >
                        {showBuyerInvoices ? "Skrýt" : "Zobrazit"} faktury nákupů
                    </button>
                    {showBuyerInvoices && (
                        <BuyerSellerInvoice
                            identificationNumber={person.identificationNumber}
                            type="purchases"
                        />
                    )}
                </div>
            )}
        </div>
    );
};


export default PersonDetail;