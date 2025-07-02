import React from "react";
import PropTypes from "prop-types";

export function InputCheck(props) {
  // podporované typy pro element input
  const INPUTS = ["checkbox", "radio"];

  // validace typu
  const type = props.type.toLowerCase();
  const checked = props.checked || "";

  if (!INPUTS.includes(type)) {
    return null;
  }

  return (
      <div className="form-check mb-2">
        <input
            type={props.type}
            className="form-check-input"
            name={props.name}
            id={`${props.name}-${props.value}`}
            value={props.value}
            checked={checked}
            onChange={props.handleChange}
        />
        <label
            className="form-check-label"
            htmlFor={`${props.name}-${props.value}`}
        >
          {props.label}
        </label>
      </div>
  );

}

InputCheck.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
};

export default InputCheck;
