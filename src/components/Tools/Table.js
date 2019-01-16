import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    Checkbox, 
    withStyles,
    TableBody, 
    Table, 
    TableCell, 
    TablePagination,
    TableRow ,
    Paper, 
} from "@material-ui/core";
    import TabsBar from '../Tools'

class TaskList extends React.Component {
    state = {
        order: "asc",
        orderBy: "createAt",
        selected: [],
        page: 0,
        rowsPerPage: 5
    };

    deleteTask = (current) => {
        let getData = this.state.data;
        getData.splice(current,1);
        this.setState({data: getData})
    }

    handleRequestSort = (event, orderBy) => {
        let order = "desc";

        if (this.state.orderBy === orderBy && this.state.order === "desc") {
            order = "asc";
        }
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
            <EnhancedTableToolbar numSelected={selected.length} />
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
                <TableBody>
                    {stableSort(data, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(item => {
                        const isSelected = this.isSelected(item.id);
                        return (
                            <TableRow
                                hover
                                onClick={event => this.handleClick(event, item.id)}
                                role="checkbox"
                                aria-checked={isSelected}
                                tabIndex={-1}
                                key={item.id}
                                selected={isSelected}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox checked={isSelected} />
                                </TableCell>
                                <TableCell align="center" component="th" scope="row" padding="none">
                                    {item.id}
                                </TableCell>
                                <TableCell align="center">{item.shortDescription}</TableCell>
                                <TableCell align="center">{item.description}</TableCell>
                                <TableCell align="center">{item.type}</TableCell>
                                <TableCell align="center">{item.complexity}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
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