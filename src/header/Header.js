import { CgProfile } from 'react-icons/cg';
import { BsTable } from 'react-icons/bs';
import { BiFileFind } from 'react-icons/bi';
import './Header.css';
import {Link} from 'react-router-dom';

function Header() {
    return(
        <div className="Head">
        <div className="Header">
          <div className="Header1">SNLIDB</div>
          <div className="Header2">(Sinhala Natural Language Interface for Databases)</div>
        </div>
        <div className="space"></div>
        
        
        <div className="nav"><Link to="/query"><BiFileFind size={70}/></Link></div>
        <div className="nav"><Link to="/tables"><BsTable size={60}/></Link></div>
        <div className="nav"><Link to="/profile"><CgProfile size={70}/></Link></div>
        
      </div>
    );
}

export default Header;