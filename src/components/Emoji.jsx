import React, { useState } from 'react';

const Button = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(!isHovered);
    };

    return (
        <button
            className="emoji-button bg-transparent border-none outline-none cursor-pointer"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
        >
            <span
                className={`emoji text-xl transition-transform duration-300 ease-in-out transform hover:scale-125 ${isHovered ? 'hovered' : ''
                    }`}
            >
                {isHovered ? '😄' : '😊'}
            </span>
        </button>
    );
};

export default Button;

