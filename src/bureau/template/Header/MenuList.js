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
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>

            <Toolbar>
                <Button color="inherit">
                    <Link to="/" className={bureau.menuLinks}>
                        Home
                    </Link></Button>
                <Button color="inherit">
                    <Link to="/about" className={bureau.menuLinks}>
                        About
                    </Link>
                </Button>
                <div>
                    <Button
                        id="demo-customized-button"
                        aria-controls="demo-customized-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        // variant="contained"
                        variant="text"
                        className={bureau.menuLinks}
                        disableElevation
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        Type of Care
                    </Button>
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        className={bureau.submenu}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose} disableRipple>
                            <Link to="/typesofcare/elderly-care-service"> Elderly Care Service</Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            <Link to="/typesofcare/personal-care"> Personal Care</Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            <Link to="/typesofcare/respite-care"> Respite Care</Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            <Link to="/typesofcare/skilled-nursing"> Skilled Nursing</Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            <Link to="/typesofcare/day-support"> Day Support</Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            <Link to="/typesofcare/hospital-discharge"> Hospital Discharge</Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            <Link to="/typesofcare/companion-care"> Companion Care</Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            <Link to="/typesofcare/cronical-condition-care"> Cronical Condition Care</Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            <Link to="/typesofcare/after-surgery-care"> After Surgery Care</Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            <Link to="/typesofcare/end-of-life-care"> End of Life Care</Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            <Link to="/typesofcare/special-need-care"> Special Need Care</Link>
                        </MenuItem>
                        {/* <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={handleClose} disableRipple>
                            <ArchiveIcon />
                            Archive
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            <MoreHorizIcon />
                            More
                        </MenuItem> */}
                    </StyledMenu>
                </div>
                <Button color="inherit">
                    <Link to="/contact" className={bureau.menuLinks}>
                        Contact
                    </Link>
                </Button>
                <Button color="inherit" variant="outlined" onClick={()=>{setShowPopup(!showPopup)}}>
                   Get E-Card
                </Button>
                <EcardPopup showPopup={showPopup} setShowPopup={setShowPopup} />

            </Toolbar>

        </Box>
    );
}
