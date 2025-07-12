export function InputSelect(props) {
    const multiple = props.multiple;
    const required = props.required || false;

    const emptySelected = multiple ? props.value?.length === 0 : !props.value;
    const objectItems = !props.enum;

    return (
        <div className="mb-3">
            <label htmlFor={props.name} className="form-label">
                {props.label}
            </label>
            <select
                required={required}
                className="form-select"
                multiple={multiple}
                name={props.name}
                id={props.name}
                onChange={props.handleChange}
                value={props.value}
            >
                {required ? (
                    <option disabled value={emptySelected} className="text-muted">
                        {props.prompt}
                    </option>
                ) : (
                    <option key={0} value={emptySelected}>
                        ({props.prompt})
                    </option>
                )}

                {objectItems
                    ? props.items.map((item, index) => (
                        <option key={required ? index : index + 1} value={item._id}>
                            {item.name}
                        </option>
                    ))
                    : props.items.map((item, index) => (
                        <option key={required ? index : index + 1} value={item}>
                            {props.enum[item]}
                        </option>
                    ))}
            </select>
        </div>
    );
}

export default InputSelect;
