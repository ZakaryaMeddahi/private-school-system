const ContactHeader = ({ title, Txt, textAlign, HColor, HFontSize, TColor, hfW, tfW}) => {
    return (
        <div className="w-full" style={{ textAlign: textAlign || undefined }}>
            <h2 style={{ color: HColor, fontSize: HFontSize, fontWeight: hfW || '700' }}>{title}</h2>
            <p className="mt-3 text-lg" style={{ color: TColor, fontWeight: tfW || '400' }}>{Txt}</p>
        </div>
    );
}

export default ContactHeader;