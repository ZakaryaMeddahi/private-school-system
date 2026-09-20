const Header = ({ title, subtitle }: { title: string; subtitle: string }) => {
    return (
        <div className="mb-6 flex w-full flex-col items-start gap-1.5">
            <h1 className="text-[28px] font-semibold tracking-tight text-[#111827] sm:text-[32px]">{title}</h1>
            <p className="text-sm text-[#64748B] sm:text-base">{subtitle}</p>
        </div>
    );
}

export default Header;
