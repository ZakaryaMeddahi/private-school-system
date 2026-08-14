const OverviewCard = ({ title, value, icon, bgColor }) => {
    return(
        <div
            className="flex h-full flex-col rounded-[15px] p-3.75 shadow-[rgba(0,0,0,0.1)_0px_4px_12px] transition-transform duration-500 hover:scale-105"
            style={{ backgroundColor: bgColor }}
        >
            <h3 className="mb-1.25 font-medium text-white">{title}</h3>
            <hr className="border-t border-white opacity-[2]" />
            <div className="flex flex-1 flex-row items-center justify-center gap-3.75">
                <p className="text-center text-[32px] font-bold text-white">
                        {value}
                </p>
                <div className="flex flex-1 items-center justify-end">
                    {icon}
                </div>
            </div>
        </div>
    );
}

export default OverviewCard;