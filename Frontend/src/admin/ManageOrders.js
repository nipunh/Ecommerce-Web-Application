import React,  {useState, useEffect} from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper';
import { getAllOrders } from './helper/adminapicall';
import { Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';




export default function ManageOrders() {

    const [ orders, setOrder] = useState([]);
    const {user, token} = isAuthenticated();

    const preload = () => {
        getAllOrders(user._id, token).then(data=>{
            console.log(data)
            if(data.error){
                console.log(data.error)
            }else{
                setOrder(data);
            }
        })
    }

    useEffect(() => {
        preload();
    }, [])

    function preventDefault(event) {
        event.preventDefault();
      }
      
      const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });
      const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);
      
      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableRow);
    
      const classes = useStyles();

    return (
        <Base title="Manage Orders"  description="View and Manage orderes">
            <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
        
      <TableContainer className="my-4" component={Paper}>
      <Table className="table" aria-label="simple table">
        <TableHead>
          <StyledTableRow component="th" scope="row">
            <StyledTableCell>Order Date</StyledTableCell>
            {/* <TableCell>Customer Name</TableCell> */}
            <StyledTableCell>Transaction Id</StyledTableCell>
            <StyledTableCell>Status Update Date</StyledTableCell>
            <StyledTableCell>Amount</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody className="text-white">
           {orders.map((order, index) =>{
          return (
              <StyledTableRow key={index}>
              <StyledTableCell>{order.createdAt.split("T")[0].split("-").reverse().join("-")}</StyledTableCell>
              <StyledTableCell>{order.transaction_id}</StyledTableCell>
              <StyledTableCell>{order.updatedAt.split("T")[0].split("-").reverse().join("-")}</StyledTableCell>
              <StyledTableCell>{order.amount}</StyledTableCell>
              <StyledTableCell align="right">{order.status}</StyledTableCell>
            </StyledTableRow>
            )
        })}
        </TableBody>
      </Table>
       </TableContainer>
        </Base>
    )
}
