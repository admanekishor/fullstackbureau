import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import logo from '../../../assets/images/logo_white.png';
import links from "./LinksData";
import { Link } from "react-router-dom";
import MenuList from './MenuList';
import bureau from '../../../assets/css/Custom.module.css';
import { CssBaseline } from "@mui/material";
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import useScrollPosition from "./useScrollPosition";
import Button from '@mui/material/Button';
const useStyles = makeStyles({
    drawer: {
        width: 250
    }
});

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

const Header = (props) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const classes = useStyles();
    const scrollPosition = useScrollPosition();


    return (
        <React.Fragment>

            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar variant="outline" position={`${scrollPosition}` == 0 ? "relative" : "fixed"} style={{ background: "rgb(129, 0, 80)" }}>
                    <Toolbar>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>

                            <Typography sx={{ padding: { xs: '0px' } }} component="div">
                                <Link to="/"> <img src={logo} alt="Muktai Nurses Bureau" className={bureau.logo} /></Link>
                            </Typography>
                            <MenuList />

                            <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                                <List className={classes.drawer}>
                                    {links.map((menu) => (
                                        <ListItem button key={menu.label} component={Link} to={menu.url}>
                                            <ListItemText primary={menu.label} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Drawer>
                            <Button
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={() => setIsDrawerOpen(true)}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                                style={{ position: "absolute", right: '0px' }}
                            >
                                <MenuIcon />
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </React.Fragment>
    );
}
export default React.memo(Header);