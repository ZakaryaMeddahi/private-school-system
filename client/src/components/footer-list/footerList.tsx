const FooterList = ({ children, title }) => {
    return (
        <>
            <h3 className="mb-3.75 text-2xl">{title}</h3>
            <ul className="m-0 list-none leading-[1.7]">
                {children}
            </ul>
        </>
    );
}

export default FooterList;