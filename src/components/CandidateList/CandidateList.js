import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import TabsBar from '../Tools'

function createData(id, createdAt, feedback, skills, name, phone, email) {
  return { id, createdAt, feedback, skills, name, phone, email };
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

const items = [
  {
    id: "id",
    disablePadding: true,
    label: "ID"
  },
  {
    id: "createdAt",
    disablePadding: false,
    label: "Created at"
  },
  { id: "feedback", disablePadding: false, label: "Feedbacks" },
  { id: "skills", disablePadding: false, label: "Skills" },
  { id: "name", disablePadding: false, label: "Name" },
  { id: "phone", disablePadding: false, label: "Phone" },
  { id: "email", disablePadding: false, label: "Email" }
];

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
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
  }
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
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
            Candidate list
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          null
        )}
      </div>
    </Toolbar>
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

class CandidateList extends React.Component {
  state = {
    order: "asc",
    orderBy: "createAt",
    selected: [],
    data: [
      createData(
        "111",
        "28.10.2018",
        "feedback",
        "skill1, skill2, skill3",
        "name",
        "phone",
        "email"
      ),
      createData(
        "222",
        "29.10.2018",
        "feedback",
        "skill1, skill2, skill3",
        "name",
        "phone",
        "email"
      ),
      createData(
        "333",
        "25.10.2018",
        "feedback",
        "skill1, skill2, skill3",
        "name",
        "phone",
        "email"
      ),
      createData(
        "444",
        "22.09.2018",
        "feedback",
        "skill1, skill2, skill3",
        "name",
        "phone",
        "email"
      ),
      createData(
        "555",
        "28.11.2018",
        "feedback",
        "CSS, HTML, JS",
        "name",
        "phone",
        "email"
      ),
      createData(
        "666",
        "20.10.2018",
        "feedback",
        "skill1, skill2, skill3",
        "name",
        "phone",
        "email"
      ),
      createData(
        "777",
        "15.10.2018",
        "feedback",
        "skill1, skill2, skill3",
        "name",
        "phone",
        "email"
      ),
      createData(
        "888",
        "3.01.2019",
        "feedback",
        "CSS, HTML, JS",
        "name",
        "phone",
        "email"
      ),
      createData(
        "999",
        "4.01.2019",
        "feedback",
        "skill1, skill2, skill3",
        "name",
        "phone",
        "email"
      ),
      createData(
        "000",
        "8.01.2019",
        "feedback",
        "CSS, HTML, JS",
        "name",
        "phone",
        "email"
      ),
      createData(
        "123",
        "10.10.2018",
        "feedback",
        "CSS, HTML, JS",
        "name",
        "phone",
        "email"
      ),
      createData(
        "456",
        "28.11.2018",
        "feedback",
        "skill1, skill2, skill3",
        "name",
        "phone",
        "email"
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
                      <TableCell align="left">{n.createdAt}</TableCell>
                      <TableCell align="left">{n.feedback}</TableCell>
                      <TableCell align="left">{n.skills}</TableCell>
                      <TableCell align="left">{n.name}</TableCell>
                      <TableCell align="left">{n.phone}</TableCell>
                      <TableCell align="left">{n.email}</TableCell>
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

CandidateList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CandidateList);
