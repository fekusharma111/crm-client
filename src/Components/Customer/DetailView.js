import React, { useState, useEffect } from 'react'
import { Box, Typography,  styled,  Divider, Button } from '@mui/material'
// import { detailview } from "../../service/api";
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import { deleteEmployee } from '../../service/api';
import { API } from '../../service/api';
import Comments from './Comments/Comments';

const Container = styled(Box)(({ theme }) => ({
  
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
    margin:"auto 30px auto 30px",
      // height:"300px",
      paddingRight:"40px"
      
  }
}))

const OuterBox = styled(Box)(({ theme }) => ({
  width: "90%",
  margin: "50px auto 0px auto",
  border: "2px solid black",
  padding: "20px",
  display: "flex",
  marginTop:"20px",
  justifyContent: "space-around",
  [theme.breakpoints.down('lg')]: {
    // display: "none",
    width: "90%",
    flexDirection:"column",
  margin: "auto 50px auto 50px",
  paddingRight:"50px",
},
  [theme.breakpoints.down('sm')]: {
    // display: "none",
    width: "90%",
    padding: "0px",
    flexDirection:"column",
  margin: "auto 40px auto 30px",
    paddingRight: "0px",
    // paddingLeft:"0px",
    marginTop:"10px",
  
},
}))
// `
// width:90%;
// margin: 50px auto 0px auto;
// border: 2px solid black;
// // heigth:200px;
// padding:20px;
// display:flex;
// justify-content: space-around;
//     // align-content: center;
// `
const Innerbox = styled(Box)`
display:flex;
padding:20px

// justify-content:space-evenly
`
const CustomerTypography = styled(Typography)`
margin-left:40px;
padding-right:40px;
font-size:18px;
color:#dc6254;
`

const ButtonBox = styled(Box)`
display:flex;
margin-left:40px;
// justify-content: flex-end;
justify-content: center;
margin-Right:40px;
& > button{margin-left:40px;}
`
const DetailView = () => {
  const navigate = useNavigate();
  const defaultValue = {
    customername: "",
    customeremail: "",
    email1: "",
    email2: "",
    companyname: "",
    customercontact: "",
    contact1: "",
    contact2: "",
    designation: "",
    contactpersonname: "",
    contactpersonemail: "",
    contactpersonmobile: ""
  };
  const [user, setUser] = useState(defaultValue);
  const { id } = useParams();
  useEffect(() => {
    loadCustomerDetails();
  }, [ ])
  const loadCustomerDetails = async () => {

    let response = await API.getcustomer(id);
    if (response.isSuccess) {
      setUser(response.data)
    }
  };
  const loadcustomername = user.customername ? user.customername : "N/A";
  const loadcustomeremail = user.customeremail ? user.customeremail : "N/A";
  const loademail1 = user.email1 ? user.email1 : "N/A";
  const loademail2 = user.email2 ? user.email2 : "N/A";
  const loadcompanyname = user.companyname ? user.companyname : "N/A";
  const loadcustomercontact = user.customercontact ? user.customercontact : "N/A";
  const loadcontact1 = user.contact1 ? user.contact1 : "N/A";
  const loadcontact2 = user.contact2 ? user.contact2 : "N/A";
  const loaddesignation = user.designation ? user.designation : "N/A";
  const loadcontactpersonname = user.contactpersonname ? user.contactpersonname : "N/A";
  const loadcontactpersonemail = user.contactpersonemail ? user.contactpersonemail : "N/A";
  const loadcontactpersonmobile = user.contactpersonmobile ? user.contactpersonmobile : "N/A";
  const EditCustomerdetails = () => {
    navigate(`/edit/${id}`);
  }
  const DeleteCustomerdetails = async () => {
    if (window.confirm("Customer details will be delete permanently")) {
      let response = await API.deleteEmployee({ id });
      if (response.isSuccess) {
        alert(response.data.message);
        await API.getAllCustomers();
      navigate("/all");
      }
        // .then((response) => {
        //   alert(response.data.message);
        // });
      await API.getAllCustomers();
      navigate("/all");
      // };
      // // await API.deleteEmployee(id);
      // getAllCustomer();
      // navigate("/all");
      // await deleteEmployee(id);
    
    }
  }
  return (
    <Container >
      <Box>
        <Typography variant="h4" sx={{ textAlign: "center" }}>{user.customername} Details</Typography>
        <ButtonBox>
          <Button variant='contained' endIcon={<EditIcon />} onClick={() => EditCustomerdetails()}>Edit</Button>
          <Button variant='contained' endIcon={<DeleteIcon />} onClick={() => DeleteCustomerdetails()}>Delete</Button>
        </ButtonBox>
        <OuterBox>
          <Box>
            <Innerbox>
              <CustomerTypography>Name :-</CustomerTypography>
              <Typography >{loadcustomername}</Typography>
            </Innerbox>
            <Divider />
            <Innerbox>
              <CustomerTypography>Email :-</CustomerTypography>
              <Typography>{loadcustomeremail}</Typography>
            </Innerbox>
            <Divider />
            <Innerbox>
              <CustomerTypography>Alternate Email 1 :-</CustomerTypography>
              <Typography>{loademail1}</Typography>
            </Innerbox>
            <Divider />
            <Innerbox>
              <CustomerTypography>Alternate Email 2 :-</CustomerTypography>
              <Typography>{loademail2}</Typography>
            </Innerbox>
            <Divider />
            <Innerbox>
              <CustomerTypography>Company Name :-</CustomerTypography>
              <Typography>{loadcompanyname}</Typography>
            </Innerbox>
            <Divider />
            <Innerbox>
              <CustomerTypography>Contact No. :-</CustomerTypography>
              <Typography>{loadcustomercontact}</Typography>
            </Innerbox>
            <Divider />
          </Box>
          <Box>
            <Innerbox>
              <CustomerTypography>Alternate Contact 1 :-</CustomerTypography>
              <Typography>{loadcontact1}</Typography>
            </Innerbox>
            <Divider />
            <Innerbox>
              <CustomerTypography>Alternate Contact 2 :-</CustomerTypography>
              <Typography>{loadcontact2}</Typography>
            </Innerbox>
            <Divider />
            <Innerbox>
              <CustomerTypography>Designation :-</CustomerTypography>
              <Typography>{loaddesignation}</Typography>
            </Innerbox>
            <Divider />

            <Innerbox>
              <CustomerTypography>Contact Person Name :-</CustomerTypography>
              <Typography>{loadcontactpersonname}</Typography>
            </Innerbox>
            <Divider />
            <Innerbox>
              <CustomerTypography>Contact Person Email :-</CustomerTypography>
              <Typography>{loadcontactpersonemail}</Typography>
            </Innerbox>
            <Divider />
            <Innerbox>
              <CustomerTypography>Contact Person Mobile No. :-</CustomerTypography>
              <Typography>{loadcontactpersonmobile}</Typography>
            </Innerbox>
          </Box>
        </OuterBox>
      </Box>
      <Box>
       <Comments/> 
      </Box>
    </Container>
  )
}

export default DetailView