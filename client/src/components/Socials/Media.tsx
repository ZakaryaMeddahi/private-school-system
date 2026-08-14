const Media = ({ icon, w = '50px', h = '50px', bgcolor = '#F6AF03' }) => {
    return (
        <div
            className="group flex items-center justify-center rounded-[25px] border-2 border-transparent transition-colors hover:bg-transparent hover:border-[#F6AF03]"
            style={{ width: w, height: h, backgroundColor: bgcolor }}
        >
            {icon}
        </div>
    );
}

export default Media;