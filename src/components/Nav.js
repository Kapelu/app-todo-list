import { Link } from "react-router-dom"
import './Nav.css'

export default function Nav(){
    return(
	<nav className='nav'>
		<ul>
			<li>
				<Link to={'/'}>Home</Link>
			</li>
			<li>
				<Link to={'/about'}>About</Link>
			</li>
			<li>
				<Link to={'/portfolio'}>Portfolio</Link>
			</li>
			<li>
				<Link to={'/contact'}>Contact</Link>
			</li>
		</ul>
	</nav>
	)
}