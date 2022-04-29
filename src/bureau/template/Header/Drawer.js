import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu'
import { links, linkKeys } from './LinksData';

export default function TemporaryDrawer({ DrawerMenu }) {

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (left, open) => (event) => {

    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [left]: open });
  };

  const list = (item) => (
    <Box
      sx={{ width: item === 'top' || item === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(item, DrawerMenu)}
      onKeyDown={toggleDrawer(item, DrawerMenu)}
    >
      <List>
        {linkKeys.map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key="left">
          <Button style={{ color: '#fff', padding:'0px' }} onClick={toggleDrawer("left", !DrawerMenu)} sx={{ display: { xs: 'block', lg: 'none' } }}><MenuIcon /></Button>
          <Drawer
            anchor="left"
            open={state["left"]}
            onClose={toggleDrawer("left", DrawerMenu)}
          >
            {list('left')}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
