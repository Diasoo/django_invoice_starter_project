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

import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Link, Navigate, NavLink, Route, Routes,} from "react-router-dom";

import PersonIndex from "./persons/PersonIndex";
import PersonDetail from "./persons/PersonDetail";
import PersonForm from "./persons/PersonForm";
import InvoiceForm from "./invoices/InvoiceForm.jsx";
import InvoiceIndex from "./invoices/InvoiceIndex.jsx";
import InvoiceDetail from "./invoices/InvoiceDetail.jsx";
import PersonStatistics from "./persons/PersonStatistics.jsx";

export function App() {
    return (
        <Router>
            <div className="container py-3">
                <nav className="navbar bg-light rounded shadow-sm px-3 mb-4">
                    <div className="d-flex align-items-center gap-4">
                        <Link to="/" className="navbar-brand fw-bold mb-0 h1">
                            Fakturace
                        </Link>
                        <ul className="nav nav-pills">
                            <li className="nav-item">
                                <NavLink
                                    to="/persons"
                                    end
                                    className={({isActive}) =>
                                        "nav-link" + (isActive ? " active" : "")
                                    }
                                >
                                    Osoby
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/invoices"
                                    className={({isActive}) =>
                                        "nav-link" + (isActive ? " active" : "")
                                    }
                                >
                                    Faktury
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/persons/statistics"
                                    className={({isActive}) =>
                                        "nav-link" + (isActive ? " active" : "")
                                    }
                                >
                                    Statistiky osob
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>


                <Routes>
                    <Route index element={<Navigate to={"/persons"}/>}/>
                    <Route path="/persons">
                        <Route index element={<PersonIndex/>}/>
                        <Route path="show/:id" element={<PersonDetail/>}/>
                        <Route path="create" element={<PersonForm/>}/>
                        <Route path="edit/:id" element={<PersonForm/>}/>
                        <Route path="statistics" element={<PersonStatistics/>}/>
                    </Route>
                    <Route path="/invoices">
                        <Route index element={<InvoiceIndex/>}/>
                        <Route path="show/:id" element={<InvoiceDetail/>}/>
                        <Route path="create" element={<InvoiceForm/>}/>
                        <Route path="edit/:id" element={<InvoiceForm/>}/>
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
