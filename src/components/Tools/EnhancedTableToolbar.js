import React, { Component } from "react";
import {
    Toolbar,
    Typography,
    TextField
} from "@material-ui/core";
    import RenderToolBar from '../Tools'

class EnhancedTableToolbar extends Component {
    render(){
        const { numSelected } = this.props;
        return (
            <Toolbar style={{width:'100%', padding: 0}}>
                {numSelected ? ( 
                    RenderToolBar(numSelected) 
                ) : ( <div style={{width:"100%", display:'flex', alignItems:'center',paddingTop:'8px'}}>
                        <Typography variant="h6" id="tableTitle" style={{flex:'1 0 auto', paddingLeft: '20px'}}> 
                            Task list
                        </Typography>
                        <TextField
                            id="outlined-search"
                            label="Search field"
                            type="filter"
                            style={{width: '20%', paddingRight:'20px'}}
                            variant="outlined"
                            fullWidth
                        />
                    </div>
                )}
            </Toolbar>
        );
    }
}
export default EnhancedTableToolbar