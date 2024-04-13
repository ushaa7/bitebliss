import React, { useContext } from 'react';
import clsx from 'clsx';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {List} from '@mui/material';


import {Divider, ListItem, ListItemIcon, ListItemText} from '@mui/material';

import InboxIcon from '@mui/icons-material/MoveToInbox';

import { UserContext } from '../modules/users/context';
import { Drawer } from '@mui/material';
import NavLinks from './config';


const ListItemButton = (props) => {
    return <ListItem button component="a" {...props} />;
}

function renderNavItems({ items }) {
    return (
        items.map(item => {
            return (
                <ListItemButton key={item.title} href={item.href}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title} />
                </ListItemButton>
            )
        }
        )
    )
}

export default function MainDrawer({state, toggleOpenNav}) {
    const { logout } = useContext(UserContext);


    const list = () => (
        <div
            role="presentation"
            onClick={() => { toggleOpenNav() }}
            onKeyDown={() => toggleOpenNav()}
            onMouseLeave={()=>{toggleOpenNav()}} 
        >
            {NavLinks.map((list) => {
                const Guard = list.guard;
                const authorizedUsers = list.roles || []
                return (
                    <Guard key={list.items[0].title} authorizedUsers={authorizedUsers}>
                        <List>
                            {renderNavItems({
                                items: list.items
                            })}
                        </List>
                    </Guard>
                )
            })}
            <Divider />
            <List>
                <ListItemButton key={"Logout"} onClick={logout}>
                    <ListItemIcon> <ExitToAppIcon/> </ListItemIcon>
                    <ListItemText primary={"Logout"} />
                </ListItemButton>
            </List>
        </div>
    );

    return (
        <div>
            <Drawer
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                anchor={'left'}
                open={state}
                variant="temporary"
                onClose={() => { toggleOpenNav() }}
            >
                {list()}
            </Drawer>
        </div>
    );
}