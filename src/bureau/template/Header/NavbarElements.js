import { FaBars, FaTimes } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Logo = styled.div`
width:300px;
@media screen and (max-width: 1024px) {
	padding: 10px 0px;
	display: block;
	width: 100%;
}
`;

export const Nav = styled.nav`
background: #810050;
display: flex;
justify-content: space-between;
padding: 10px 0px;
// padding: 0.2rem calc((80vw - 1000px) / 2);
z-index: 12;
/* Third Nav */
/* justify-content: flex-start; */

`;

export const NavLink = styled(Link)`
color: #fff;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
margin: 10px;
height: 100%;
font-weight:500;
cursor: pointer;
&.active {
	color: #c8a294;	
}
&:hover{
	color: #c8a294;
}
@media screen and (max-width: 1024px) {
	padding: 10px 0px;
	display: block;
	width: 100%;
}
`;

export const Anchor = styled.div`
color: #fff;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
margin: 10px;
height: 100%;
font-weight:500;
cursor: pointer;
&.active {
	color: #c8a294;	
}
&:hover{
	color: #c8a294;
}
@media screen and (max-width: 1024px) {
	padding: 10px 0px;
	display: block;
	width: 100%;
}
`;

export const DropDownLink = styled(Link)`
color: #fff;
font-weight: 500;
text-decoration: none;
display: -webkit-box;
padding: 10px 10px;
min-width: 100%;
max-width: 100%;
width: 100%;
cursor: pointer;
&.active {
	color: #c8a294;	
}
&:hover{
	color: #c8a294;
}
@media screen and (max-width: 768px) {
	padding: 10px 0px;
	display: block;
	width: 100%;
}
`;

export const Bars = styled(FaBars)`
display: none;
color: #808080;
@media screen and (max-width: 1024px) {
	display: block;
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(-100%, 75%);
	font-size: 1rem;
	cursor: pointer;
}
`;
export const Times = styled(FaTimes)`
display: none;
color: #808080;
@media screen and (max-width: 1024px) {
	display: block;
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(-100%, 75%);
	font-size: 1rem;
	cursor: pointer;
}
`;

export const NavMenu = styled.div`
display: flex;
align-items: center;
@media screen and (max-width: 1024px) {
    position: absolute;
    z-index: 9999999;
    background: #810050;
    width: 100%;
    display: none;
	transition: display 0ms 600ms;
    align-items: center;
    justify-content: center;
    flex-direction: column;
	top: 42px;
	&.active {
		display:block;
		
	}
}
`;

export const DropDownMenu = styled.div`
position:relative;
@media screen and (max-width: 768px) {
   
	&.active {
		display:block;
		
	}
}
`;

export const DropDown = styled.div`
position:absolute;
background:#810050;
display:none;
z-index: 999;
width: 150px;

&:hover {
	display:block;	
}
@media screen and (max-width: 768px) {
    position: absolute;
    z-index: 9999999;
    background: #810050;
    width: 100%;
    display: none;
	transition: display 0ms 600ms;
    align-items: center;
    justify-content: center;
    flex-direction: column;
	top: 42px;
	&.active {
		display:block;
		
	}
}
`;

export const NavBtn = styled.nav`
display: flex;
align-items: center;
margin-right: 0px;

@media screen and (max-width: 768px) {
	// display: none;
}
`;

export const Button = styled.nav`
// background:#c8a294;
padding:10px;
color:#fff;
border:1px solid #fff;
&:hover{
	background: #c8a294bf;
}
@media screen and (max-width: 768px) {
	display: none;
}
`;

export const NavBtnLink = styled(Link)`
border-radius: 4px;
// background: #808080;
padding: 0px 15px;
color: #fff;
outline: none;
font-size:28px;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-transform: uppercase;
text-decoration: none;
/* Second Nav */
margin-left: 0px;
&:hover {
	transition: all 0.2s ease-in-out;
	// background: #fff;
	color: #808080;
}
@media screen and (max-width: 768px) {
	font-size:16px;
}
`;
