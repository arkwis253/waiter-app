import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.scss";
import {Container, Navbar, Nav} from 'react-bootstrap/';
import clsx from 'clsx';

const NavBar = () => {
	return(
		<Navbar bg="primary" className={clsx('navbar-dark', styles.nav)} data-bs-theme="dark">
			<Container>
				<Navbar.Brand href="/" className={styles.brand}>Waiter.app</Navbar.Brand>
				<Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
    );
};

export default NavBar;