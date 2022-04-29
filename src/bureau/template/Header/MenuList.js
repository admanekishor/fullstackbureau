import * as React from 'react';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Button from '@mui/material/Button';
import bureau from '../../../assets/css/Custom.module.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
// import { Link } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled, alpha } from '@mui/material/styles';
import Ecard from '../../../assets/ecard.pdf';
import EcardPopup from '../../component/popup/ecard/EcardPopup';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function ButtonAppBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showPopup, setShowPopup] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
       <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="/typesofcare/elderly-care-service">Elderly Care Service</NavDropdown.Item>
        <NavDropdown.Item href="/typesofcare/personal-care">Personal Care</NavDropdown.Item>
        <NavDropdown.Item href="/typesofcare/respite-care">Respite Care</NavDropdown.Item>
        <NavDropdown.Item href="/typesofcare/skilled-nursing">Skilled Nursing</NavDropdown.Item>
        <NavDropdown.Item href="/typesofcare/day-support">Day Support</NavDropdown.Item>
        <NavDropdown.Item href="/typesofcare/hospital-discharge">Hospital Discharge</NavDropdown.Item>
        <NavDropdown.Item href="/typesofcare/companion-care">Companion Care</NavDropdown.Item>
        <NavDropdown.Item href="/typesofcare/cronical-condition-care">Cronical Condition Care</NavDropdown.Item>
        <NavDropdown.Item href="/typesofcare/after-surgery-care">After Surgery Care</NavDropdown.Item>
        <NavDropdown.Item href="/typesofcare/end-of-life-care">End of Life Care</NavDropdown.Item>
        <NavDropdown.Item href="/typesofcare/special-need-care">Special Need Care</NavDropdown.Item>
      
      </NavDropdown>
    </Nav>
    <Nav>
      <Nav.Link href="#deets">More deets</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Dank memes
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
    );
}
