import React, { useState } from 'react';

function LikeButton() {
    const [showEmojiPopup, setShowEmojiPopup] = useState(false);

    const handleHover = () => {
        setShowEmojiPopup(true);
    };

    const handleLeave = () => {
        setShowEmojiPopup(false);
    };

    const handleEmojiSelection = (selectedEmoji) => {
        // Perform desired action, such as updating the like count and displaying the selected emoji
    };

    return (
        <div
            className="like-button"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
        >
            <span className="like-count">0</span>
            <span className="like-icon"></span>
            {showEmojiPopup && (
                <div className="emoji-popup">
                    <span
                        className="emoji-option"
                        onClick={() => handleEmojiSelection("😍")}
                    ></span>
                    <span
                        className="emoji-option"
                        onClick={() => handleEmojiSelection("👍")}
                    ></span>
                    <span
                        className="emoji-option"
                        onClick={() => handleEmojiSelection("😆")}
                    ></span>
                    {/* Add more emoji options as needed */}
                </div>
            )}
        </div>
    );
}

export default LikeButton;
