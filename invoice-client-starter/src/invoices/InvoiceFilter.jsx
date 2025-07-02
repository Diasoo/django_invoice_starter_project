import React from "react";
import InputSelect from "../components/InputSelect.jsx";
import InputField from "../components/InputField.jsx";
import PropTypes from "prop-types";

const InvoiceFilter = (props) => {

    const handleChange = (e) => {
        props.handleChange(e);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSubmit(e);
    };

    const filter = props.filter;

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm">
            <div className="row mb-3">
                <div className="col-md-4">
                    <InputSelect
                        name="buyer_id"
                        items={props.personList}
                        handleChange={handleChange}
                        label="Kupující"
                        prompt="Vyberte kupujícího"
                        value={filter.buyer}
                    />
                </div>
                <div className="col-md-4">
                    <InputSelect
                        name="seller_id"
                        items={props.personList}
                        handleChange={handleChange}
                        label="Prodávající"
                        prompt="Vyberte prodávajícího"
                        value={filter.seller}
                    />
                </div>
                <div className="col-md-4">
                    <InputField
                        name="product"
                        type="text"
                        handleChange={handleChange}
                        label="Produkt"
                        prompt="Zadejte název produktu"
                        value={filter.product}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-4">
                    <InputField
                        name="minPrice"
                        type="number"
                        min="0"
                        handleChange={handleChange}
                        label="Minimální cena"
                        prompt="Zadejte minimální cenu"
                        value={filter.minPrice}
                    />
                </div>
                <div className="col-md-4">
                    <InputField
                        name="maxPrice"
                        type="number"
                        min="0"
                        handleChange={handleChange}
                        label="Maximální cena"
                        prompt="Zadejte maximální cenu"
                        value={filter.maxPrice}
                    />
                </div>
                <div className="col-md-4">
                    <InputField
                        type="number"
                        min="1"
                        name="limit"
                        handleChange={handleChange}
                        label="Limit počtu záznamů"
                        prompt="Neuveden"
                        value={filter.limit || ''}
                    />
                </div>
            </div>

            <div className="d-flex justify-content-end">
                <input
                    type="submit"
                    className="btn btn-primary"
                    value={props.confirm}
                />
            </div>
        </form>
    );
}
    InvoiceFilter.propTypes = {
        personList: PropTypes.array.isRequired,
        filter: PropTypes.object.isRequired,
        handleChange: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        confirm: PropTypes.string
};

export default InvoiceFilter;