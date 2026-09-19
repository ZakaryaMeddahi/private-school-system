import { useId } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const FormInput = ({ label, type, placeholder, onchange, autoComplete }: {
    label: string;
    type: string;
    placeholder: string;
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    autoComplete?: string;
}) => {
    const id = useId();

    return (
        <div className="flex flex-col gap-1.5">
            <Label htmlFor={id} className="text-[#111827]">{label}</Label>
            <Input
                id={id}
                required
                onChange={onchange}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className="h-11 rounded-lg border-[#E2E8F0] bg-white text-sm text-[#111827] placeholder:text-[#64748B] focus-visible:border-[#4338CA] focus-visible:ring-[#4338CA]/15"
            />
        </div>
    );
}

export default FormInput;
