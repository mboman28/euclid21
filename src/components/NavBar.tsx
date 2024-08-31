import { AppBar, Button, IconButton, Menu, MenuItem, styled, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import React, { useContext } from "react";
import { PopupState as PopupStateType } from "material-ui-popup-state/hooks";
import { NestedMenuItem } from "mui-nested-menu";
import { useNavigate } from "react-router-dom";

import DataContext from "../providers";
import { DataContextType } from "../types/types";
import { getKind } from "../data/dataUtils";

type DataMenuProps = {
    popupState: PopupStateType;
}

const DataMenu: React.FC<DataMenuProps> = ({ popupState }) => {
    const { data } = useContext(DataContext) as DataContextType;
    const navigate = useNavigate();

    return (
        <Menu {...bindMenu(popupState)}>
            {Object.keys(data).map((bookNum: string) =>
                <NestedMenuItem
                    key={bookNum}
                    label={bookNum === '0' ? 'Axioms' : 'Book ' + bookNum}
                    parentMenuOpen={popupState.isOpen}>
                    {Object.keys(data[bookNum]).map((kind: string) =>
                        <NestedMenuItem key={kind} label={getKind(kind) + 's'} parentMenuOpen>
                            {Object.keys(data[bookNum][kind]).map((prop: string) =>
                                <MenuItem key={prop} onClick={() => { navigate('/?p=' + kind + bookNum + '.' + prop)}}>{getKind(kind) + ' ' + prop}</MenuItem>
                            )}
                        </NestedMenuItem>
                    )}
                </NestedMenuItem>
            )}
        </Menu>
    );
}

type NavBarProps = {
}

const NavBar: React.FC<NavBarProps> = () => {
    const navigate = useNavigate();
    return (
        <AppBar position="static">
            <Toolbar>
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                        <>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                {...bindTrigger(popupState)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <DataMenu popupState={popupState} />
                        </>
                    )}
                </PopupState>
                <Typography variant="h6" component="div" onClick={ () => { navigate('/')} } sx={{ flexGrow: 1, cursor: 'pointer' }}>
                    Euclid<sup>21</sup>: Euclid's Elements for the 21st Century
                </Typography>
                <StyledButton onClick={() => { navigate('/help') }}>Help</StyledButton>
                <StyledButton onClick={() => { navigate('/about') }}>About</StyledButton>
            </Toolbar>
        </AppBar>
    );
}

const StyledButton = styled(Button)({
    borderRadius: '20px',
    color: 'white',
    textTransform: 'none',
})

export default NavBar;