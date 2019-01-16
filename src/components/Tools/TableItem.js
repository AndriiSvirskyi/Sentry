import React from "react";
import {  
    Checkbox, 
    TableBody, 
    TableCell, 
    TableRow ,
} from "@material-ui/core";
    const TableItem = (data)=>{
        const { page, rowsPerPage, items, order, orderBy } = data
        function stableSort(array, cmp) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
            return stabilizedThis.map(el => el[0]);
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
        function getSorting(order, orderBy) {
            return order === "desc"
            ? (a, b) => desc(a, b, orderBy)
            : (a, b) => -desc(a, b, orderBy);
        }

    return (
        <TableBody>
            {stableSort(items, getSorting(order, orderBy))
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
    )
}
export default TableItem