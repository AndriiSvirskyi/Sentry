import React from "react";
import {
    Tooltip, 
    Checkbox, 
    TableCell, 
    TableHead, 
    TableRow ,
    TableSortLabel, 
} from "@material-ui/core";

const TabsBar = (rows) => {
    const {items, onRequestSort, numSelected, rowCount, onSelectAllClick, order, orderBy} = rows
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

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
                        {items.map(row => {
                            return (
                                <TableCell
                                    key={row.id}
                                    align={'center'}
                                    style={{marginLeft:'24px'}}
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
                                            onClick={createSortHandler(row.id)}
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
export default TabsBar;    
