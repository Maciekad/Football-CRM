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

const TicketsTable = (props) => {
  const classes = useStyles();
  const { tickets } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Card>
      <CardHeader title="Booked tickets" />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Match</TableCell>
              <TableCell align="left">PurchaseDate</TableCell>
              <TableCell align="left">Seat</TableCell>
              <TableCell align="left">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ticket) => (
              <TableRow key={ticket.bookingId}>
                <TableCell align="left">
                  {ticket.match && 
                  (ticket.match.homeTeamNavigation && 
                  (ticket.match.homeTeamNavigation.name))} vs {ticket.match && 
                    (ticket.match.awayTeamNavigation && 
                    (ticket.match.awayTeamNavigation && 
                      ticket.match.awayTeamNavigation.name))} 
                </TableCell>
                <TableCell align="left">
                  {ticket.purchaseDate}
                </TableCell>
                <TableCell align="left">{ticket.seat}</TableCell>
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
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tickets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Card>
  );
}

export default TicketsTable;