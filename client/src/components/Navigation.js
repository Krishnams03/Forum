import React, { useState, Fragment } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText,
	Spinner,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	const auth = useSelector((state) => state.auth);

	return (
		<div className="shadow-md">
			<Navbar color="blue" dark expand="md" className="bg-indigo-800 px-4 py-3">
				<NavbarBrand
					tag={Link}
					to="/"
					className="text-white text-xl font-bold tracking-wide hover:text-yellow-300 transition"
				>
					Community forum
				</NavbarBrand>
				<NavbarToggler onClick={toggle} className="border-gray-400" />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto flex items-center gap-4" navbar>
						{auth.isLoading ? (
							<Spinner
								type="grow"
								size="sm"
								color="light"
								className="ml-2 animate-spin"
							/>
						) : (
							<Fragment>
								{!auth.isAuthenticated ? (
									<Fragment>
										<NavItem>
											<NavLink
												tag={Link}
												to="/login"
												className="text-white hover:text-yellow-300 transition"
											>
												Login
											</NavLink>
										</NavItem>
										<NavItem>
											<NavLink
												tag={Link}
												to="/register"
												className="text-white hover:text-yellow-300 transition"
											>
												Register
											</NavLink>
										</NavItem>
									</Fragment>
								) : (
									<Fragment>
										<UncontrolledDropdown nav inNavbar>
											<DropdownToggle
												nav
												caret
												className="text-white hover:text-yellow-300 transition"
											>
												User profile
											</DropdownToggle>
											<DropdownMenu right className="bg-white text-gray-900 rounded-md shadow-lg">
												<Link to="/user-profile">
													<DropdownItem className="hover:bg-indigo-100 transition">
														My profile
													</DropdownItem>
												</Link>
												<DropdownItem divider />
												<Link to="/logout">
													<DropdownItem className="hover:bg-indigo-100 transition">
														Logout
													</DropdownItem>
												</Link>
											</DropdownMenu>
										</UncontrolledDropdown>
									</Fragment>
								)}
							</Fragment>
						)}
					</Nav>
					<NavbarText className="text-gray-300 text-sm">
						{new Date().toLocaleDateString()}
					</NavbarText>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default Navigation;
