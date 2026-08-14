const Logo = ({ boxSize = '60px', fontSize = '24px', color = '#213E69', fontWeight = '700' }) => {
    return (
        <div className="z-1 flex flex-wrap items-center gap-0">
            <div className="flex items-center">
                <img className="object-cover" style={{ width: boxSize, height: boxSize }} src='/1-removebg-preview.png' />
            </div>
            <div className="flex items-center">
                <h1 style={{ fontWeight, fontSize, color }}>
                    Education
                </h1>
            </div>
        </div>
    );
}

export default Logo;