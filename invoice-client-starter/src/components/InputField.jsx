import PropTypes from "prop-types";

export function InputField(props) {
  const INPUTS = ["text", "number", "date"];
  const type = props.type.toLowerCase();
  const isTextarea = type === "textarea";
  const required = props.required || false;

  if (!isTextarea && !INPUTS.includes(type)) {
    return null;
  }

  const minProp = props.min || null;
  const min = ["number", "date"].includes(type) ? minProp : null;
  const minlength = ["text", "textarea"].includes(type) ? minProp : null;

  return (
      <div className="mb-3">
        <label htmlFor={props.name} className="form-label">
          {props.label}
        </label>

        {isTextarea ? (
            <textarea
                required={required}
                className="form-control"
                placeholder={props.prompt}
                rows={props.rows}
                minLength={minlength}
                name={props.name}
                id={props.name}
                value={props.value}
                onChange={props.handleChange}
            />
        ) : (
            <input
                required={required}
                type={type}
                className="form-control"
                placeholder={props.prompt}
                minLength={minlength}
                min={min}
                name={props.name}
                id={props.name}
                value={props.value}
                onChange={props.handleChange}
            />
        )}
      </div>
  );
}

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  prompt: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rows: PropTypes.number,
};

export default InputField;
