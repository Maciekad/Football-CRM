import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { Paper, Button, Card, CardHeader } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  }
});

const PlayersTable = (props) => {
  const classes = useStyles();
  const { rows } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Card>
      <CardHeader title="Players" />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Number</TableCell>
              <TableCell align="left">First name</TableCell>
              <TableCell align="left">Last name</TableCell>
              <TableCell align="left">Position</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.playerId}>
                  <TableCell align="left">{row.number}</TableCell>
                  <TableCell align="left">{row.firstName}</TableCell>
                  <TableCell align="left">{row.lastName}</TableCell>
                  <TableCell align="left">{row.position}</TableCell>
                  <TableCell align="left">
                    <Button color="primary" variant="contained" href="./">
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Card>
  );
}

export default PlayersTable;