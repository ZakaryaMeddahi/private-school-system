import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ContactInput = ({ label, type = 'text', placeholder = '', mT = '0', imT = '0' }) => {
    return (
        <div className="min-w-0 flex-1" style={{ marginTop: mT }}>
            <Label className="text-[#8D8D8D] text-xs font-normal">{label}</Label>
            <Input
                type={type}
                placeholder={placeholder}
                className="h-auto rounded-none border-0 border-b border-[#8D8D8D] p-0 text-sm shadow-none focus-visible:ring-0"
                style={{ marginTop: imT }}
            />
        </div>
    );
}

export default ContactInput;