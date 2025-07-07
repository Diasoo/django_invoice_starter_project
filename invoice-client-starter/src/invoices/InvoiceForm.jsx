import {useNavigate, useParams} from "react-router-dom";

import {apiGet, apiPost, apiPut} from "../utils/api";
import Loader from "../components/Loader.jsx";

import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";
import FlashMessage from "../components/FlashMessage";


const InvoiceForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const {id} = useParams();
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        dueDate: "",
        product: "",
        price: "",
        vat: "",
        note: "",
        buyer: "",
        seller: ""
    });
    const [persons, setPersons] = useState([]);
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);

    useEffect(() => {
        apiGet("/api/persons").then(setPersons);
        if (id) {
            apiGet("/api/invoices/" + id)
                .then((data) => {
                    setInvoice({
                        ...data,
                        buyer: data.buyer?._id || "",
                        seller: data.seller?._id || ""
                    });
                })
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false); // <-- Add this for the create form
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            ...invoice,
            buyer: { _id: Number(invoice.buyer) },
            seller: { _id: Number(invoice.seller) }
        };

        console.log("Odesílám data na server:", payload);

        (id ? apiPut("/api/invoices/" + id, payload) : apiPost("/api/invoices", payload))
            .then(() => {
                setSent(true);
                setSuccess(true);
                navigate("/invoices");
            })
            .catch((error) => {
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };

    const sent = sentState;
    const success = successState;

    if (isLoading) return <Loader />;

    return (
        <div className="container py-4">
            <h1 className="mb-4">{id ? "Upravit" : "Vytvořit"} fakturu</h1>

            {errorState && (
                <div className="alert alert-danger">{errorState}</div>
            )}

            {sent && (
                <FlashMessage
                    theme={success ? "success" : ""}
                    text={success ? "Uložení faktury proběhlo úspěšně." : ""}
                />
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-light rounded shadow-sm p-4"
            >
                <div className="row mb-3">
                    <div className="col-md-6">
                        <InputField
                            required
                            type="text"
                            name="invoiceNumber"
                            min="3"
                            label="Číslo faktury"
                            prompt="Zadejte číslo faktury"
                            value={invoice.invoiceNumber}
                            handleChange={(e) =>
                                setInvoice({
                                    ...invoice,
                                    invoiceNumber: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="col-md-6">
                        <InputField
                            required
                            type="date"
                            name="dueDate"
                            label="Datum splatnosti"
                            prompt="Zadejte datum splatnosti"
                            value={invoice.dueDate}
                            handleChange={(e) =>
                                setInvoice({
                                    ...invoice,
                                    dueDate: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <InputField
                            required
                            type="text"
                            name="product"
                            min="3"
                            label="Produkt"
                            prompt="Zadejte název produktu/služby"
                            value={invoice.product}
                            handleChange={(e) =>
                                setInvoice({
                                    ...invoice,
                                    product: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="col-md-3">
                        <InputField
                            required
                            type="number"
                            name="price"
                            min="0"
                            label="Cena (bez DPH)"
                            prompt="Zadejte cenu bez DPH"
                            value={invoice.price}
                            handleChange={(e) =>
                                setInvoice({
                                    ...invoice,
                                    price: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="col-md-3">
                        <InputField
                            required
                            type="number"
                            name="vat"
                            min="0"
                            label="DPH (%)"
                            prompt="Zadejte sazbu DPH"
                            value={invoice.vat}
                            handleChange={(e) =>
                                setInvoice({
                                    ...invoice,
                                    vat: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <InputField
                        type="text"
                        name="note"
                        label="Poznámka"
                        prompt="Zadejte poznámku"
                        value={invoice.note}
                        handleChange={(e) =>
                            setInvoice({ ...invoice, note: e.target.value })
                        }
                    />
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <InputSelect
                            required
                            label="Kupující"
                            name="buyer"
                            prompt="Vyberte kupujícího"
                            items={persons}
                            value={invoice.buyer}
                            handleChange={(e) =>
                                setInvoice({ ...invoice, buyer: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-md-6">
                        <InputSelect
                            required
                            label="Prodávající"
                            name="seller"
                            prompt="Vyberte prodávajícího"
                            items={persons}
                            value={invoice.seller}
                            handleChange={(e) =>
                                setInvoice({ ...invoice, seller: e.target.value })
                            }
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-end">
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="💾 Uložit"
                    />
                </div>
            </form>
        </div>
    );
};

export default InvoiceForm;