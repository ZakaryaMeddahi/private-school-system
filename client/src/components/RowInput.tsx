import ContactInput from './contact-input/ContactInput';

const RowInput = ({ label_I1, type_I1 = 'text', placeholder_I1 = '', label_I2, type_I2 = 'text', placeholder_I2 = '' }) => {
    return (
        <div className="mt-10 flex w-full flex-row gap-2.5">
            <ContactInput label={label_I1} type={type_I1} placeholder={placeholder_I1} />
            <ContactInput label={label_I2} type={type_I2} placeholder={placeholder_I2} />
        </div>
    );
}

export default RowInput;