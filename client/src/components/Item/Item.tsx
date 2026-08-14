const Item = ({ item, color = 'inherit', transition = '', mrT = '0' }) => {
    return (
        <li className="transition-colors hover:text-[#213E69]" style={{ color, transition, marginTop: mrT }}>
            {item}
        </li>
    );
}

export default Item;