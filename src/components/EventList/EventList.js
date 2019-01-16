import React, {Component} from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TabsBar from '../Tools'
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";

function desc(a, b, orderBy) {
if (b[orderBy] < a[orderBy]) {
    return -1;
}
if (b[orderBy] > a[orderBy]) {
    return 1;
}
return 0;
}

function stableSort(array, cmp) {
const stabilizedThis = array.map((el, index) => [el, index]);
stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
});
return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const items = [
    {
        id: "id",
        disablePadding: true,
        label: "ID"
    },
    {
        id: "name",
        disablePadding: false,
        label: "Name"
    },
    {
        id: "startDate",
        disablePadding: false,
        label: "Start date"
    },
    { id: "endDate", disablePadding: false, label: "End date" },
    { id: "type", disablePadding: false, label: "Type" },
    { id: "result", disablePadding: false, label: "Result" },
    { id: "status", disablePadding: false, label: "Status" },
    { id: "created", disablePadding: false, label: "Created" }
];

class EnhancedTableToolbar extends Component {

    renderToolBar = (select)=>{
        if(select){ return <div style={{
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
        }else{
            return false
        }
    }
    render(){
        const { numSelected } = this.props;
        return (
            <Toolbar style={{width:'100%', padding: 0}}>
                {numSelected ? ( 
                    this.renderToolBar(numSelected) 
                ) : ( <div style={{width:"100%", display:'flex', alignItems:'center',paddingTop:'8px'}}>
                        <Typography variant="h6" id="tableTitle" style={{flex:'1 0 auto', paddingLeft: '20px'}}> 
                            Event list
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
    name:'Event',
    startDate:'15.03.2017',
    endDate:'14.03.2018',
    result:'3',
    status:'Done', 
    type:'JS',
    created:'1.06.2017'
},
{
    id:222,
    name:'Event1',
    startDate:'13.03.2017',
    endDate:'11.03.2018',
    result:'3',
    status:'Done', 
    type:'JS',
    created:'1.04.2017'
},
{
    id:333,
    name:'Event2',
    startDate:'16.03.2017',
    endDate:'12.03.2018',
    result:'3',
    status:'Done', 
    type:'JS',
    created:'1.03.2017'
},
{
    id:444,
    name:'Event',
    startDate:'15.03.2017',
    endDate:'14.03.2018',
    result:'3',
    status:'Done', 
    type:'JS',
    created:'1.06.2017'
},
{
    id:555,
    name:'Event1',
    startDate:'13.03.2017',
    endDate:'11.03.2018',
    result:'3',
    status:'Done', 
    type:'JS',
    created:'1.04.2017'
},
{
    id:666,
    name:'Event2',
    startDate:'16.03.2017',
    endDate:'12.03.2018',
    result:'3',
    status:'Done', 
    type:'JS',
    created:'1.03.2017'
}
,{
    id:777,
    name:'Event',
    startDate:'15.03.2017',
    endDate:'14.03.2018',
    result:'3',
    status:'Done', 
    type:'JS',
    created:'1.06.2017'
},
{
    id:888,
    name:'Event1',
    startDate:'13.03.2017',
    endDate:'11.03.2018',
    result:'3',
    status:'Done', 
    type:'JS',
    created:'1.04.2017'
},
{
    id:999,
    name:'Event2',
    startDate:'16.03.2017',
    endDate:'12.03.2018',
    result:'3',
    status:'Done', 
    type:'JS',
    created:'1.03.2017'
}
]
class EventList extends Component {
    state = {
        order: "asc",
        orderBy: "createAt",
        selected: [],
        page: 0,
        rowsPerPage: 5
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = "desc";

        if (this.state.orderBy === property && this.state.order === "desc") {
        order = "asc";
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: data.map(item => item.id) }));
        return;
        }
        this.setState({ selected: [] });
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
        const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

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
                    .map(n => {
                    const isSelected = this.isSelected(n.id);
                    return (
                        <TableRow
                            hover
                            onClick={event => this.handleClick(event, n.id)}
                            role="checkbox"
                            aria-checked={isSelected}
                            tabIndex={-1}
                            key={n.id}
                            selected={isSelected}
                        >
                        <TableCell padding="checkbox">
                            <Checkbox checked={isSelected} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                            {n.id}
                        </TableCell>
                        <TableCell align="left">{n.name}</TableCell>
                        <TableCell align="left">{n.startDate}</TableCell>
                        <TableCell align="left">{n.endDate}</TableCell>
                        <TableCell align="left">{n.type}</TableCell>
                        <TableCell align="left">{n.result}</TableCell>
                        <TableCell align="left">{n.status}</TableCell>
                        <TableCell align="left">{n.created}</TableCell>
                        </TableRow>
                    );
                    })}
                {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
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

EventList.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EventList);
