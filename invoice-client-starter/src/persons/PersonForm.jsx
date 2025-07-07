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
import {useNavigate, useParams} from "react-router-dom";

import {apiGet, apiPost, apiPut} from "../utils/api";
import Loader from "../components/Loader.jsx";

import InputField from "../components/InputField";
import InputCheck from "../components/InputCheck";
import FlashMessage from "../components/FlashMessage";

import Country from "./Country";

const PersonForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const {id} = useParams();
    const [person, setPerson] = useState({
        name: "",
        identificationNumber: "",
        taxNumber: "",
        accountNumber: "",
        bankCode: "",
        iban: "",
        telephone: "",
        mail: "",
        street: "",
        zip: "",
        city: "",
        country: Country.CZECHIA,
        note: ""
    });
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);

    useEffect(() => {
        if (id) {
            apiGet("/api/persons/" + id)
                .then((data) => setPerson(data))
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        (id ? apiPut("/api/persons/" + id, person) : apiPost("/api/persons", person))
            .then(() => {
                setSent(true);
                setSuccess(true);
                navigate("/persons");
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };

    const sent = sentState;
    const success = successState;

    if (isLoading) return <Loader/>;

    return (
        <div className="container py-4">
            <h1 className="mb-4">{id ? "Upravit" : "Vytvořit"} osobnost</h1>

            {errorState && (
                <div className="alert alert-danger">{errorState}</div>
            )}

            {sent && (
                <FlashMessage
                    theme={success ? "success" : ""}
                    text={success ? "Uložení osobnosti proběhlo úspěšně." : ""}
                />
            )}

            <form onSubmit={handleSubmit} className="bg-light rounded shadow-sm p-4">
                <div className="row mb-3">
                    <div className="col-md-6">
                        <InputField
                            required
                            type="text"
                            name="personName"
                            min="3"
                            label="Jméno"
                            prompt="Zadejte celé jméno"
                            value={person.name}
                            handleChange={(e) =>
                                setPerson({...person, name: e.target.value})
                            }
                        />
                    </div>
                    <div className="col-md-6">
                        <InputField
                            required
                            type="text"
                            name="identificationNumber"
                            min="3"
                            label="IČO"
                            prompt="Zadejte IČO"
                            value={person.identificationNumber}
                            handleChange={(e) =>
                                setPerson({...person, identificationNumber: e.target.value})
                            }
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <InputField
                            required
                            type="text"
                            name="taxNumber"
                            min="3"
                            label="DIČ"
                            prompt="Zadejte DIČ"
                            value={person.taxNumber}
                            handleChange={(e) =>
                                setPerson({...person, taxNumber: e.target.value})
                            }
                        />
                    </div>
                    <div className="col-md-6">
                        <InputField
                            required
                            type="text"
                            name="accountNumber"
                            min="3"
                            label="Číslo bankovního účtu"
                            prompt="Zadejte číslo bankovního účtu"
                            value={person.accountNumber}
                            handleChange={(e) =>
                                setPerson({...person, accountNumber: e.target.value})
                            }
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-4">
                        <InputField
                            required
                            type="text"
                            name="bankCode"
                            min="3"
                            label="Kód banky"
                            prompt="Zadejte kód banky"
                            value={person.bankCode}
                            handleChange={(e) =>
                                setPerson({...person, bankCode: e.target.value})
                            }
                        />
                    </div>
                    <div className="col-md-8">
                        <InputField
                            required
                            type="text"
                            name="IBAN"
                            min="3"
                            label="IBAN"
                            prompt="Zadejte IBAN"
                            value={person.iban}
                            handleChange={(e) =>
                                setPerson({...person, iban: e.target.value})
                            }
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <InputField
                            required
                            type="text"
                            name="telephone"
                            min="3"
                            label="Telefon"
                            prompt="Zadejte telefon"
                            value={person.telephone}
                            handleChange={(e) =>
                                setPerson({...person, telephone: e.target.value})
                            }
                        />
                    </div>
                    <div className="col-md-6">
                        <InputField
                            required
                            type="text"
                            name="mail"
                            min="3"
                            label="Mail"
                            prompt="Zadejte mail"
                            value={person.mail}
                            handleChange={(e) =>
                                setPerson({...person, mail: e.target.value})
                            }
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <InputField
                            required
                            type="text"
                            name="street"
                            min="3"
                            label="Ulice"
                            prompt="Zadejte ulici"
                            value={person.street}
                            handleChange={(e) =>
                                setPerson({...person, street: e.target.value})
                            }
                        />
                    </div>
                    <div className="col-md-3">
                        <InputField
                            required
                            type="text"
                            name="ZIP"
                            min="3"
                            label="PSČ"
                            prompt="Zadejte PSČ"
                            value={person.zip}
                            handleChange={(e) =>
                                setPerson({...person, zip: e.target.value})
                            }
                        />
                    </div>
                    <div className="col-md-3">
                        <InputField
                            required
                            type="text"
                            name="city"
                            min="3"
                            label="Město"
                            prompt="Zadejte město"
                            value={person.city}
                            handleChange={(e) =>
                                setPerson({...person, city: e.target.value})
                            }
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <InputField
                        required
                        type="text"
                        name="note"
                        label="Poznámka"
                        prompt="Zadejte poznámku"
                        value={person.note}
                        handleChange={(e) =>
                            setPerson({...person, note: e.target.value})
                        }
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label fw-semibold">Země:</label>
                    <div className="form-check">
                        <InputCheck
                            type="radio"
                            name="country"
                            label="Česká republika"
                            value={Country.CZECHIA}
                            handleChange={(e) =>
                                setPerson({...person, country: e.target.value})
                            }
                            checked={Country.CZECHIA === person.country}
                        />
                    </div>
                    <div className="form-check">
                        <InputCheck
                            type="radio"
                            name="country"
                            label="Slovensko"
                            value={Country.SLOVAKIA}
                            handleChange={(e) =>
                                setPerson({...person, country: e.target.value})
                            }
                            checked={Country.SLOVAKIA === person.country}
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

export default PersonForm;
