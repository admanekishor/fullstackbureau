
import React, { useState } from 'react';
// import { FaWhatsapp, FaWhatsappSquare } from 'react-icons/fa';
import {
	Nav,
	Logo,
	NavLink,
	Bars,
	Times,
	DropDownMenu,
	DropDown,
	DropDownLink,
	Button,
	NavMenu,
	staticMenu,
	NavBtn,
	NavBtnLink,
} from './NavbarElements';
import logourl from '../assets/images/logo_white.png';
import { links, linkKeys } from './LinksData';

const Header = () => {
	const [isOpen, setisOpen] = useState(false)
	const [click, setClick] = useState(false);

	const handleClick = () => setClick(!click);
	const drodownoption = () => {
		console.log("isOpen", isOpen);
		setisOpen(!isOpen)
	};
	const Close = () => setClick(false);

	return (

		<Nav>
			<NavBtn>
				<NavBtnLink to='/'>
					<Logo activeStyle><img src={logourl} alt="logo" style={{ width: '100%' }} /></Logo>
				</NavBtnLink>
				{/* <NavBtnLink to='/'>Muktai Nurses Bureu</NavBtnLink> */}
			</NavBtn>

			<NavMenu className={click ? "active" : ""} onClick={() => Close()}>
				{
					linkKeys.map((link) => {
						// console.log("link", links);
						const currLink = links[link]
						// console.log("currLink", currLink.label, currLink.getDropdownOptions)
						if (!currLink.getDropdownOptions || !currLink.isDropdown) {
							if (link == 'ecard') {
								return (
									<NavLink to={currLink.url} activeStyle onClick={click ? handleClick : null} download="ecard"> 
										<Button type="button">
											{currLink.label}
										</Button>
									</NavLink>

								)
								console.log("object", link)
							} else {

								return (
									<NavLink to={currLink.url} activeStyle onClick={click ? handleClick : null}>
										{currLink.label}
									</NavLink>
								)
							}
						} else {
							return (
								<div>
									<DropDownMenu>
										<NavLink to='/typesofcare' activeStyle onClick={click ? drodownoption : null}>
											{currLink.label}
										</NavLink>
										<DropDown isOpen={isOpen}>
											<DropDownLink to='/typesofcare/elderly-care-service' activeStyle>Elder Care Service</DropDownLink>
											<DropDownLink to='/demo' activeStyle>Menu 2</DropDownLink>
											<DropDownLink to='/kaj' activeStyle>Menu 3</DropDownLink>
										</DropDown>
									</DropDownMenu>
									{/* <NavLink to={currLink.url} activeStyle onClick={click ? handleClick : null}>
										{currLink.label}
									</NavLink> */}
								</div>
							)
						}
					})
				}


				{/* <NavLink to='/home' activeStyle onClick={click ? handleClick : null}>
					Home
				</NavLink>
				<NavLink to='/about' activeStyle>
					About Us
				</NavLink>
				<DropDownMenu>
					<NavLink to='/typesofcare' activeStyle >
						Types of Care
					</NavLink>
					<DropDown>
						<DropDownLink to='/typesofcare' activeStyle>Elder Care Service</DropDownLink>
						<DropDownLink to='/typesofcare' activeStyle>Menu 2</DropDownLink>
						<DropDownLink to='/typesofcare' activeStyle>Menu 3</DropDownLink>
					</DropDown>
				</DropDownMenu>
				<NavLink to='/knowledgecenter' activeStyle>
					Knowledge Center
				</NavLink>
				<NavLink to='/contact' activeStyle>
					Contact
				</NavLink>

				<NavLink to='/contact' activeStyle>
					<Button activeStyle>Ask a Question</Button>
				</NavLink> */}
			</NavMenu>


			{/* <NavMenu>
				<NavLink href={require("../assets/Booklet.pdf")} target="blank" activeStyle>
						<FaWhatsapp size={40} style={{color:'#fff'}} />
					</NavLink>
			</NavMenu> */}
			<div onClick={handleClick}>{
				click ? <Times /> : <Bars />
			}

			</div>
		</Nav>

	);
};

export default Header;
