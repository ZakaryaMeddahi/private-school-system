const FormInput = ({ type, placeholder, onchange}) => {
    return (
        <input
            required
            onChange={onchange}
            type={type}
            placeholder={placeholder}
            className="mb-3 w-full border-0 border-b border-gray-500 bg-transparent py-2.5 text-base text-white outline-none"
        />
    );
}

export default FormInput;