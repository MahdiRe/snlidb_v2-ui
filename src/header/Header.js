import { CgProfile } from 'react-icons/cg';
import { BsTable } from 'react-icons/bs';
import { BiFileFind } from 'react-icons/bi';
import './Header.css';

function Header() {
    return(
        <div className="Head">
        <div className="Header">
          <div className="Header1">SNLIDB</div>
          <div className="Header2">(Sinhala Natural Language Interface for Databases)</div>
        </div>
        <div className="space"></div>
        <div className="nav"><BiFileFind size={50}/></div>
        <div className="nav"><BsTable size={45}/></div>
        <div className="nav"><CgProfile size={50}/></div>
      </div>
    );
}

export default Header;