import './InputForm.css';

function InputForm({type, name, label, disabled, children, register, required, validationSchema, errors}) {

    return (
        <label htmlFor={name} className={disabled ? "form-control-input-disabled" : "form-control-input"}>
            {label}
            {required && "*"}
            {type === 'select' ?
                <select
                    type={type}
                    id={name}
                    name={name}
                    disabled={disabled}
                    {...register(name, validationSchema)}
                >
                    {children}
                </select>
                : type === 'select' ?
                    <textarea
                        id={name}
                        {...register(name)}
                    >
                    </textarea>
                    :
                    <input
                        type={type}
                        id={name}
                        name={name}
                        disabled={disabled}
                        {...register(name, validationSchema)}
                    />
            }
            {errors && errors[name]?.type === "required" &&
                <p className="error">{errors[name]?.message}</p>}
            {errors && errors[name]?.type === "minLength" &&
                <p className="error">{errors[name]?.message}</p>}
        </label>
    );
}

export default InputForm;
