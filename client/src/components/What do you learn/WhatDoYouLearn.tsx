import { FaCheck } from "react-icons/fa";

const WhatDoYouLearn = ({ desc }) => {
    return (
        <div className="mt-0.5 flex flex-row items-center gap-3.75">
            <FaCheck />
            <span>{desc}</span>
        </div>
    );
}

export default WhatDoYouLearn;