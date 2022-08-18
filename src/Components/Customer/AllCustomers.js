import React, {useEffect, useState} from 'react';
import { Box, Button, Typography, styled } from '@mui/material';
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { API } from '../../service/api';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';



const Component = styled(Box)(({ theme }) => ({
  // width: "1000px",
  // margin:"auto",
  // // margin: "auto ",
  // padding: "40px 20px 20px 20px",

  // boxShadow: "5px 2px 5px 2px rgb(0 0 0/ 0.6)",
  padding: "40px 20px 20px 20px",
  [theme.breakpoints.up('xl')]: {
    width: "90%",
    margin:"auto",
    // margin: "auto ",
   
  },
  [theme.breakpoints.down('xl')]: {
    width: "1050px",
    // margin:"auto",
    margin:"auto"
 
  },
  [theme.breakpoints.down('lg')]: {
      // display: "none",
      width: "90%",
    margin: "auto 50px auto 100px",
    paddingRight:"50px",
  },
  [theme.breakpoints.down('md')]: {
      // display: "none",
      width: "90%",
      // height:"300px",
    margin: "auto 50px auto 70px",
      paddingRight:"50px",
      
  },
  [theme.breakpoints.down('sm')]: {
      // display: "none",
    // width: "500px",
    width:"90%",
    margin:"auto 50px auto 70px",
      // height:"300px",
      paddingRight:"40px"
      
  }
}))

const AllCustomers = () => {
  const navigate= useNavigate()
    const [customer, setCustomer] = useState([]);
    useEffect(() => {
        getAllCustomer();
    }, [])
    
    const getAllCustomer = async () => {
        let response = await API.getAllCustomers()
        if (response.isSuccess) {
          setCustomer(response.data);
        }
       
  }
  const ADDCUSTOMER = () => {
    // console.log("i am called");
    navigate('/addcustomers')
  }
  const handleEditClick = (id) => {
    // console.log(id);
    navigate(`/edit/${id}`);
  };
  const handleViewClick = (id) => {
    navigate(`/detailview/${id}`);
  }
  const handleDeleteClick = async (id) => {
    // navigate("/all");
    // console.log(`handle Delete click ${id}`);
    if (window.confirm("Customer details will be delete permanently")) {
      let response = await API.deleteEmployee({id});
      if (response.isSuccess) {
        alert(response.data.message);
        
      }
      //   .then((res) => {
      //   alert(res.data.message);
      // });
     
      // navigate("/all");
    };
    // await API.deleteEmployee(id);
    getAllCustomer();
  }
    const columns = [
        {
          field: "customername",
          headerName: "Customer Name",
          width: 160,
          editable: true,
        },
        { field: "companyname", headerName: "Company Name", width: 180 },
        {
          field: "designation",
          headerName: "Designation",
          // type: "number",
          width: 140,
          
        },
        { field: "customeremail", headerName: "Email", width: 200 },
        { field: "customercontact", headerName: "Mobile No.", width: 150 },
        {
          field: "actions",
          type: "actions",
          headerName: "Actions",
          width: 100,
          cellClassName: "actions",
          getActions: ({ id }) => {
            return [
              <GridActionsCellItem
                icon={<RemoveRedEyeIcon />}
                label="View"
                className="textPrimary"
                onClick={() => {handleViewClick(id)}}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={() => {handleEditClick(id)
                 
                }}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                className="textPrimary"
                onClick={() => {
                  handleDeleteClick(id)
                }}
                color="inherit"
              />,
            ];
          },
        },
    ];
    for (const row of customer) {
        row.id = row._id;
      }
  return (
    <Component>
      <Button variant='contained' onClick={()=>ADDCUSTOMER()}>Add Customers</Button>
    <Typography variant="h4" style={{ textAlign: "center" }}>
      All Customer Details
    </Typography>
    <DataGrid
      editMode="row"
      rows={customer}
      columns={columns}
      // pageSize={5}
      // rowsPerPageOptions={[1, 10]}
      checkboxSelection
      autoHeight={true}
      experimentalFeatures={{ newEditingApi: true }}
    />
  </Component>
  )
}

export default AllCustomers;