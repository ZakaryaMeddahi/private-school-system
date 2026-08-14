import { Button } from '@/components/ui/button';

const Header = ({ title }) => {
    return(
        <div className="mb-[3%] flex w-full flex-col items-start gap-3.75">
            <h1 className="text-[32px] font-semibold">{title}</h1>
            <p className="text-lg text-gray-500">Enter your account details</p>
            <Button className="h-auto w-full rounded-md bg-[#333437] py-2.5 text-[15px] text-white hover:bg-[#333437]/90">
                Login with Google
            </Button>
        </div>
    );
}

export default Header;