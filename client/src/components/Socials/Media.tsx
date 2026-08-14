const Media = ({ icon, w, h, bgcolor }) => {
    return (
        <div
            className="group flex items-center justify-center rounded-[25px] border-2 border-transparent transition-colors hover:bg-transparent hover:border-[#F6AF03]"
            style={{ width: w || '50px', height: h || '50px', backgroundColor: bgcolor || '#F6AF03' }}
        >
            {icon}
        </div>
    );
}

export default Media;