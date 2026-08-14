import type { CSSProperties } from 'react';

const ContactHeader = ({ title, Txt, textAlign, HColor, HFontSize, TColor, hfW = '700', tfW = '400' }: { title: string; Txt: string; textAlign?: CSSProperties['textAlign']; HColor?: string; HFontSize?: string; TColor?: string; hfW?: string; tfW?: string }) => {
    return (
        <div className="w-full" style={{ textAlign }}>
            <h2 style={{ color: HColor, fontSize: HFontSize, fontWeight: hfW }}>{title}</h2>
            <p className="mt-3 text-lg" style={{ color: TColor, fontWeight: tfW }}>{Txt}</p>
        </div>
    );
}

export default ContactHeader;