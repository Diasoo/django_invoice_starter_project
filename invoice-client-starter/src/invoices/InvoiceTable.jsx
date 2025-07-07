import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const InvoiceTable = ({ items, deleteInvoice }) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle shadow-sm">
                <thead className="table-light">
                <tr>
                    <th style={{ width: "5%" }}>#</th>
                    <th style={{ width: "35%" }}>Číslo faktury</th>
                    <th style={{ width: "60%" }}>Akce</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{item.invoiceNumber}</td>
                        <td>
                            <div className="d-flex gap-2 flex-wrap">
                                <Link
                                    to={`/invoices/show/${item._id}`}
                                    className="btn btn-sm btn-info"
                                >
                                    Zobrazit
                                </Link>
                                <Link
                                    to={`/invoices/edit/${item._id}`}
                                    className="btn btn-sm btn-warning"
                                >
                                    Upravit
                                </Link>
                                <button
                                    onClick={() => deleteInvoice(item._id)}
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
                <Link to="/invoices/create" className="btn btn-success">
                    Nová faktura
                </Link>
            </div>
        </div>
    );
};

InvoiceTable.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    deleteInvoice: PropTypes.func.isRequired,
};

export default InvoiceTable;