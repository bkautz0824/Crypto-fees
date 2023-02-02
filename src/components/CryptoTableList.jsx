import * as React from 'react';
import Row from './TableRow'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import 
  { 
    TablePagination, 
    Paper,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table,
    IconButton
  } from '@mui/material';



export default function CollapsibleTable({data}) {

  const [sort, setSort] = React.useState(true)
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
 
  <TableContainer component={Paper} sx={{
    width:'60%',
  }}>
      <Table aria-label="collapsible table">
        <TableHead sx={{background:'black'}}>
          <TableRow>
            <TableCell />
            <TableCell align="center" sx={{color:'white'}}>Ticker</TableCell>
            <TableCell align="center" sx={{color:'white'}}>Name</TableCell>
            <TableCell align="center" sx={{color:'white'}}>
              1 Day Avg Fees
              <IconButton
              aria-label="expand row"
              size="small"
              sx={{color: 'white'}}
              onClick={() => setSort(!sort)}
              >
              {sort ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            </TableCell>
            <TableCell align="center"/>
          </TableRow>
        </TableHead>
        <TableBody>
          
          { sort ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => { 

            return (
            <Row key={item.name} data={item} />
          )})
              :  data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).sort((a, b) => {
                return (a.results.oneDayTotalFees - b.results.oneDayTotalFees) 
              }).map((item) => { 
                return (
                <Row key={item.name} data={item} />
              )})
        }
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>

  ) 
}