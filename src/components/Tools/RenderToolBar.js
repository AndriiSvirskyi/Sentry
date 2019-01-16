import React from "react";
import {
    Tooltip, 
    IconButton, 
    Typography, 
} from "@material-ui/core";
    import DeleteIcon from "@material-ui/icons/Delete";
    import EditIcon from "@material-ui/icons/Edit";
    
    const RenderToolBar = (select)=>{
        if(select){ return (
            <div style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                width: '100%', 
                background: '#fff3e0',
                minHeight: '64px',
            }}>
            <Typography color="inherit" variant="subtitle1" style={{paddingLeft:"20px"}}>
                {select} selected
            </Typography>
                {select === 1 ? (
                <div>
                    <Tooltip title="Edit">
                            <IconButton aria-label="Edit">
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" >
                            <IconButton aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                </div>
                ) : (
                    <div>
                        <Tooltip title="Delete" >
                            <IconButton aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                
                )}  
        </div>
        )}else{
            return false
        }
    }

export default RenderToolBar
