import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import "./Headers.css";

const Headers = ({ navbarLinks }) => {
    const [menuClicked, setMenuClicked] = useState(false);

    const toggleMenuClick = () => {
        setMenuClicked(!menuClicked);
    };

    return ( 
        <nav className = "navbar-landing">
            <span className = "navbar__logo" > Wheelosity </span> {
                menuClicked ? ( 
                <FiX size = { 25 }
                className = { "navbar__menu" }
                onClick = { toggleMenuClick }/> ) 
                : 
                ( <FiMenu size = { 25 }
                className = { "navbar__menu" }
                onClick = { toggleMenuClick } /> )
            } 
            <ul className = { menuClicked ? "navbar__list navbar__list--active" : "navbar__list" }> 
            { navbarLinks.map((item, index) => {
                    return ( 
                        <li className = "navbar__item" key = { index } >
                            <a className = "navbar__link" href = { item.navigate } > { item.title } </a> 
                        </li>
                    );
                })
            } 
            </ul> 
        </nav>
    );
};

export default Headers;