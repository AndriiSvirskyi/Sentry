import React, { Component } from 'react';
import Logo from '/home/andrii/Desktop/project/Sentry/src/components/Header/GloLogo.svg'
import { withStyles, Toolbar, Typography, InputBase, AppBar} from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";

const styles = {
    search: {
        display: "flex",
        alignItems: "center",
        justifyContent: "left",
        position: "relative",
        borderRadius: '20px',
        width: '40%',
        backgroundColor: fade('#fff', 0.15),
        marginLeft: '15px',  
        '&:hover': {
            backgroundColor: '#757575',
            border: '2px solid #ef6c00',
        },
    },
    focus: {
        backgroundColor: '#757575',
        border: '2px solid #ef6c00'
    }
}

class Header extends Component {
    render() {
        return (
            <AppBar position="static" style={{width: "100%",marginBottom: '20px'}}>
                <Toolbar style={{display: "flex", justifyContent: "space-between"}}>
                    <div style={{display:'flex', width:'40%', alignItems:'center'}}>
                        <img 
                            style={{
                                cursor:'pointer', 
                                height:'40px', 
                                backgroundSize:'cover', 
                                borderRadius: '20px', 
                                marginRight: '15px'
                            }} 
                            src={Logo} alt='logo'>
                        </img>
                        <Typography variant="h6" color="inherit" noWrap>Sentry</Typography>
                        
                        <label className={this.props.classes.search}>
                            <SearchIcon style={{marginLeft: '15px'}}/>
                            <InputBase
                                placeholder="Search…"
                                style={{marginLeft: '10px', color: 'white'}}
                            />
                        </label>
                    </div>
                    <AccountCircle/>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Header);
