import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import "./Header.css";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    

    return (
        <header className="header">
            <h1>RentCar</h1>
            <nav>
                <ul className="display-ul">
                    <li className="display-li">
                        <span className="text-header"> Dashboard </span>
                    </li>
                    <li className="display-li">
                        <span className="text-header" > About Us </span>
                    </li>
                    <li className="display-li">
                    <Dropdown toggle={function noRefCheck(){}}>
                        <DropdownToggle caret> Account </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header> Join Partner </DropdownItem>
                            <DropdownItem> History </DropdownItem>
                            <DropdownItem> Logout </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;