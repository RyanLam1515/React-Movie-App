import "./Header.css";
import TMDBLogo from '../images/tmdb_logo.svg';

const Header = () => {
    return (
        <div className="header">
            <span className='headerContent' onClick={() => window.scroll(0,0)} > 
                <h3 className='headerTitle'>Movie Hub 🎥</h3>
                <img className='logoImg'src={TMDBLogo} alt='tmdb-logo' />
            </span>
        </div>)
};

export default Header;