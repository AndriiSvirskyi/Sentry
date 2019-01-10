import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {
    Tooltip, 
    IconButton, 
    Checkbox, 
    withStyles,
    TableBody, 
    Table, 
    TableCell, 
    TableHead, 
    TablePagination,
    TableRow ,
    TableSortLabel, 
    Toolbar, 
    Typography, 
    Paper,
    TextField, 
    Button} from "@material-ui/core";
    import DeleteIcon from "@material-ui/icons/Delete";
    import FilterListIcon from "@material-ui/icons/FilterList";
    import { lighten } from "@material-ui/core/styles/colorManipulator";

function createData(
    id,
    shortDescription,
    description,
    type,
    complexity,
    actions
) {
    return { id,shortDescription ,description, type ,complexity ,actions};
}

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

const rows = [{
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
    },{ 
        id: "action", 
        disablePadding: false, 
        label: "Action" 
}];

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {
            onSelectAllClick,
            order,
            orderBy,
            numSelected,
            rowCount
        } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                align={row.numeric ? "right" : "left"}
                                padding={row.disablePadding ? "none" : "default"}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? "bottom-end" : "bottom-start"}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                    {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit
    },
    highlight:
    theme.palette.type === "light"
    ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
    } : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
    },
    spacer: {
        flex: "1 1 100%"
    },
    actions: {
        color: theme.palette.text.secondary
    },
    title: {
        flex: "0 0 auto"
    },

    textField: {
        margin: theme.spacing.unit * 3
    }
});

let EnhancedTableToolbar = props => {
    const { numSelected, classes } = props;

    return (
        <React.Fragment>
        <Toolbar
            className={classNames(classes.root, {
            [classes.highlight]: numSelected > 0
            })}
        >
            <div className={classes.title}>
            {numSelected > 0 ? (
                <Typography color="inherit" variant="subtitle1">
                {numSelected} selected
                </Typography>
            ) : (
                <Typography variant="h6" id="tableTitle">
                    Task list
                </Typography>
            )}
            </div>
            <div className={classes.spacer}></div>

            <TextField
                id="outlined-search"
                label="Search field"
                type="search"
                className={classes.textField}
                variant="outlined"
                fullWidth
            />

            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="Filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </Toolbar>
        </React.Fragment>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 3
    },
    table: {},
    tableWrapper: {
        overflowX: "auto"
    }
});

/*
    Structure:

    id                    number
    Short description     string
    Description           string
    Type                  string
    Complexity            string

*/

class TaskList extends React.Component {
    state = {
        order: "asc",
        orderBy: "createAt",
        selected: [],
        data: [
        createData(
            111,
            'Reverse number',
            'Write a JavaScript function that reverse a number.',
            'JS',
            '★',
        ),
        createData(
            222,
            'Reverse number',
            'Write a JavaScript function that reverse a number.',
            'JS',
            '★★',
        ),
        createData(
            333,
            'Reverse number',
            'Write a JavaScript function that reverse a number.',
            'JS',
            '★★★',
        )
        ],
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
        this.setState(state => ({ selected: state.data.map(n => n.id) }));
        return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1)
            );
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
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
        <Paper className={classes.root}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
                <EnhancedTableHead
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
                        <TableCell align="left">{n.shortDescription}</TableCell>
                        <TableCell align="left">{n.description}</TableCell>
                        <TableCell align="left">{n.type}</TableCell>
                        <TableCell align="left">{n.complexity}</TableCell>
                        <TableCell align="left">
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={()=>alert('Delete')}
                                >
                                Delete
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={()=>alert('Edit')}
                                padding="10px"
                                >
                                Edit
                            </Button>
                        </TableCell>
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
    TaskList.propTypes = {
        classes: PropTypes.object.isRequired
    };

    export default withStyles(styles)(TaskList);
