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

import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const PersonTable = ({label, items, deletePerson}) => {
    return (
        <div className="table-responsive">
            <p className="fw-semibold fs-5 mb-3">
                {label} <span className="badge bg-secondary">{items.length}</span>
            </p>

            <table className="table table-striped table-bordered align-middle shadow-sm">
                <thead className="table-light">
                <tr>
                    <th style={{width: "5%"}}>#</th>
                    <th style={{width: "45%"}}>Jméno</th>
                    <th style={{width: "50%"}}>Akce</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>
                            <div className="d-flex gap-2 flex-wrap">
                                <Link
                                    to={`/persons/show/${item._id}`}
                                    className="btn btn-sm btn-info"
                                >
                                    Zobrazit
                                </Link>
                                <Link
                                    to={`/persons/edit/${item._id}`}
                                    className="btn btn-sm btn-warning"
                                >
                                    Upravit
                                </Link>
                                <button
                                    onClick={() => deletePerson(item._id)}
                                    className="btn btn-sm btn-danger"
                                >
                                    Odstranit
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="d-flex justify-content-end">
                <Link to="/persons/create" className="btn btn-success">
                    Nová osoba
                </Link>
            </div>
        </div>
    );
};

PersonTable.propTypes = {
    label: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    deletePerson: PropTypes.func.isRequired,
}

export default PersonTable;
