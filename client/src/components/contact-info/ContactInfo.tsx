const ContactInfo = ({ icon, info }) => {
    return (
        <div className="flex flex-row items-center gap-4">
            {icon}
            <p className="text-lg">{info}</p>
        </div>
    );
}

export default ContactInfo;