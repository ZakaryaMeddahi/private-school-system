import { Button } from '@/components/ui/button';

const FormSwitch = ({ text, linkText, link }) => {
    return (
        <div className="flex flex-row gap-4">
            <span className="text-sm">{text}</span>
            <Button className="text-sm">{linkText}</Button>
        </div>
    );
}

export default FormSwitch;