import React, { Component } from 'react';
import Logo from 'D:/JavaScript/Sentry/src/components/Header/GloLogo.svg'
import { withStyles, Toolbar, Typography, InputBase, AppBar} from "@material-ui/core";
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
        backgroundColor: '#616161',
        marginLeft: '15px',  
        border: '1px solid #616161',
        '&:hover': {
            backgroundColor: '#757575',
        },
    },
    focus: {
        backgroundColor: '#757575',
        border: '1px solid #ef6c00'
    },
}

class Header extends Component {
    constructor(props){
        super(props)
        this.state={
            focus:0
        }
    }
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
                        
                        <label className={this.state.focus > 0 ? `${this.props.classes.search} ${this.props.classes.focus}` : this.props.classes.search }>
                            <SearchIcon style={{marginLeft: '15px'}}/>
                            <InputBase
                                placeholder="Search…"
                                style={{marginLeft: '10px', color: 'white'}}
                                onFocus={()=>{ this.setState({ focus:1 }) }}
                                onBlur={()=>{ this.setState({ focus: 0 }) }}
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
