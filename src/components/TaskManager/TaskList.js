import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    withStyles,
    Table, 
    TablePagination,
    Paper,
} from "@material-ui/core";
import TableItem from '../Tools'
import EnhancedTableToolbar from '../Tools'
import TabsBar from '../Tools/TabsBar'

const items = [{
    id: "id",
    disablePadding: true,
    label: "ID"
    },{ 
        id: "shortDescription",
        disablePadding: false,
        label: "Short description"
    },{
        id: "description",
        disablePadding: false,
        label: "Description"
    },{ 
        id: "type", 
        disablePadding: false, 
        label: "Type" 
    },{ 
        id: "complexity", 
        disablePadding: false, 
        label: "Complexity" 
    }];

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 3
    },
    table: {},
    tableWrapper: {
        overflowX: "auto"
    }
});

let data = [
    {
        id:111,
        shortDescription:'Reverse number',
        description:'Write a JavaScript function that reverse a number.', 
        type:'JS',
        complexity:'★'
    },
    {
        id:222,
        shortDescription:'Reverse number',
        description:'Write a JavaScript function that reverse a number.', 
        type:'JS',
        complexity:'★★',
    },
    {
        id:333,
        shortDescription:'Reverse number',
        description:'Write a JavaScript function that reverse a number.', 
        type: 'JS',
        complexity:'★★★',
    },
    {
        id:444,
        shortDescription:'Reverse number',
        description:'Write a JavaScript function that reverse a number.', 
        type:'JS',
        complexity:'★'},
    {
        id:555,
        shortDescription:'Reverse number',
        description:'Write a JavaScript function that reverse a number.', 
        type:'JS',
        complexity:'★★',
    },
    {
        id:666,
        shortDescription:'Reverse number',
        description:'Write a JavaScript function that reverse a number.', 
        type: 'JS',
        complexity:'★★★',
    }
]

class TaskList extends Component {
    state = {
        order: "asc",
        orderBy: "",
        selected: [],
        page: 0,
        rowsPerPage: 5
    };

    deleteTask = (current) => {
        console.log(current)
        let getData = this.state.data;
        getData.splice(current,1);
        this.setState({data: getData})
    }

    handleRequestSort = (event, orderBy) => {
        let order;
        this.state.orderBy === orderBy && this.state.order === "desc" ? order = "asc" : order = "desc";
        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        event.target.checked ? this.setState({selected: data.map(item => item.id) }) : this.setState({ selected: [] })
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if(selectedIndex > 0){
            newSelected = newSelected.concat(selected.slice(0, selectedIndex),selected.slice(selectedIndex + 1))
        }else{
            switch(selectedIndex){
                case -1: newSelected = newSelected.concat(selected, id);break;
                case 0: newSelected =  newSelected = newSelected.concat(selected.slice(1));break;
                case (selected.length - 1):  newSelected = newSelected.concat(selected.slice(0, -1));break;
                default : break;
            }
        }
        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes } = this.props;
        const { order, orderBy, selected, rowsPerPage, page } = this.state;

        return (
        <Paper className={classes.root}>
            
            <div className={classes.tableWrapper}>
                <Table className={classes.table} aria-labelledby="tableTitle">
                    <TabsBar
                       items ={items}
                       numSelected={selected.length}
                       order={order}
                       orderBy={orderBy}
                       onSelectAllClick={this.handleSelectAllClick}
                       onRequestSort={this.handleRequestSort}
                       rowCount={data.length}
                    />
                </Table>
            </div>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                "aria-label": "Previous Page"
                }}
            nextIconButtonProps={{
                "aria-label": "Next Page"
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
        </Paper>
        );
    }
}
    TaskList.propTypes = {
        classes: PropTypes.object.isRequired
    };

    export default withStyles(styles)(TaskList);
