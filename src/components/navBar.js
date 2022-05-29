import {Link} from 'react-router-dom'


// imports from material ul
import MenuIcon from '@mui/icons-material/Menu';

// import NavBar.css
import '../styles/navBar.css'

function NavBar(){
	return(
		<nav>
			<ul className="nav-bar">
				<li className="cat-image"><img src={require('../images/cat-image.jpg')} alt="cat-image"/></li>
				<ul className="menu-lists">
					<li><Link id='link' to='/'>Все котики</Link></li>
					<li><Link id='link' to='/likedcats'>Любимые котики</Link></li>
				</ul>
				<li className="menu-icon"><MenuIcon/></li>
			</ul>
		</nav>
		)
}

export default NavBar

