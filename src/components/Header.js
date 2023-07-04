import React from "react";

const Header = ({ darkMode, handleToggleDarkMode }) => {
    return(
        <div className="header">
            <h1>Notes</h1>
            <button 
            onClick={()=> handleToggleDarkMode(
                (previousDarkMode)=> !previousDarkMode
                )
            } 
            className="toggle">{!darkMode ? 'Dark mode' : 'Light Mode'}</button>
        </div>
    )
}


export default Header;