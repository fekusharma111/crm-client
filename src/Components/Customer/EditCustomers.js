
import {
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  Typography,
  Button,

} from "@mui/material";
import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box } from "@mui/system";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../service/api";
import { editCustomer } from "../../service/api";

const Container = styled(FormGroup)`

margin-top:5%;

display:flex;
flex-direction:row;
justify-content:space-evenly;
& >div{
  
}
`
const Container2 = styled(Box)`
// 
margin-top:3%;
// margin-left:40px;
display:flex;
flex-direction: row;
// width: 900px

// flex-direction:row;
justify-content:space-between;

`
const EmailFormControl = styled(FormControl)`
margin:20px;
display:flex;
flex-direction:column;
// align-items: center;
// width:800px;
// justify-content:center;

`
const EmailBox = styled(Box)`
& >div{
  width:400px;
}
`
const ControlledBox = styled(Box)`
display:none;
`;
const MainControlledBox = styled(Box)`
// margin: 5% auto 0% auto;
margin-left:100px;
display:flex;
flex-direction:column;
align-items: center;
`

const AllFormControl = styled(FormControl)(({ theme }) => ({
  margin:"30px",
  width: "400px",
// padding:"30px",
// [theme.breakpoints.down('md')]: {
//   // display: "none",
//   width: "350px",
// },
}))
const DesignationBox = styled(Box)`
display:flex;
flex-direction:column;
`

const EditCustomers = () => {
  const navigate = useNavigate()
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
  const { id } = useParams();
  const [user, setUser] = useState(defaultValue);
  const [openConatct, setopencontact] = useState(false)
  const [openEmail, setopenEmail] = useState(false)
  const [opencontactpersonfield, setopencontactpersonfield] = useState(false)
  useEffect(() => {
    loadCustomerDetails();
  }, []);
  const EditCustomerDetails = async () => {

    if (user) {
       await API.editCustomer(user);
       alert(`${user.customername}'s details updated`);
      navigate("/all");
      
      
    } else {
      alert("Please Fill the data Perfectly!!!");
    }
  };
  const loadCustomerDetails = async () => {
    // console.log(id);
    let response = await API.getcustomer(id);
    if (response.isSuccess) {
      setUser(response.data)
    }
  };
  const AddMoreEmailField = () => {
    setopenEmail(true)
  }
  const RemoveMoreEmailField = () => {
    setopenEmail(false)
  }
  const AddMoreContactField = () => {
    setopencontact(true)
  }
  const RemoveMoreContactField = () => {
    setopencontact(false)
  }
  const AddContactPersonField = () => {
    setopencontactpersonfield(true)
  }
  const RemoveContactPersonField = () => {
    setopencontactpersonfield(false)
  }

  const onValueChange = (e) => {
    // console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <MainControlledBox>
      <Typography variant="h4" sx={{ textAlign: "center" }}>Edit Customer Details</Typography>
      <Box>
        <AllFormControl style={{margin:"20px"}}>
          <InputLabel>Customer's Name</InputLabel>
          <Input name="customername" onChange={(e) => onValueChange(e)} value={user.customername} />
        </AllFormControl>
        <EmailFormControl>
          
            <InputLabel>Customer's Email ID</InputLabel>
            <Input name="customeremail" onChange={(e) => onValueChange(e)} value={user.customeremail} />
          

          <AddCircleOutlineIcon onClick={AddMoreEmailField} />
        </EmailFormControl>
        {openEmail ? <EmailFormControl  >
          <AllFormControl style={{margin:"20px"}} >
            <InputLabel>Alternate Email 1 </InputLabel>
            <Input name="email1" onChange={(e) => onValueChange(e)} value={user.email1} />

          </AllFormControl>
          <AllFormControl style={{margin:"20px"}} >
            <InputLabel>Alternate Email 2</InputLabel>
            <Input name="email2" onChange={(e) => onValueChange(e)} value={user.email2} />

          </AllFormControl>
          <RemoveCircleOutlineIcon onClick={RemoveMoreEmailField} />
        </EmailFormControl>
          :
          <ControlledBox ></ControlledBox>
        }
      </Box>
      <Box>
        <AllFormControl style={{margin:"20px"}}>
          <InputLabel>Company Name</InputLabel>
          <Input name="companyname" onChange={(e) => onValueChange(e)} value={user.companyname} />
        </AllFormControl>
        <EmailFormControl>
          
            <InputLabel>Customer's Contact</InputLabel>
            <Input type="number" name="customercontact" onChange={(e) => onValueChange(e)} value={user.customercontact} />
          

          <AddCircleOutlineIcon onClick={AddMoreContactField} />
        </EmailFormControl>
        {openConatct ? <EmailFormControl  >
          <AllFormControl style={{margin:"20px"}} >
            <InputLabel>Alternate contact 1 </InputLabel>
            <Input type="number" name="contact1" onChange={(e) => onValueChange(e)} value={user.contact1} />

          </AllFormControl>
          <AllFormControl style={{margin:"20px"}} >
            <InputLabel>Alternate Contact 2</InputLabel>
            <Input type="number" name="contact2" onChange={(e) => onValueChange(e)} value={user.contact2} />

          </AllFormControl>
          <RemoveCircleOutlineIcon onClick={RemoveMoreContactField} />
        </EmailFormControl>
          :
          <ControlledBox ></ControlledBox>
        }

      </Box>
      <DesignationBox>
        <AllFormControl style={{margin:"20px"}} >
          <InputLabel>Designation </InputLabel>
          <Input name="designation" onChange={(e) => onValueChange(e)} value={user.designation} />

        </AllFormControl>
        <Button variant="contained" endIcon={<PersonAddIcon />} style={{width:"300px", alignSelf: "center" }}  onClick={() => AddContactPersonField()}>
          Edit Contact Person
        </Button>
      </DesignationBox>
      {opencontactpersonfield ? <EmailFormControl  >
        <AllFormControl style={{margin:"20px"}} >
          <InputLabel>Contact Person Name </InputLabel>
          <Input name="contactpersonname" onChange={(e) => onValueChange(e)} value={user.contactpersonname} />

        </AllFormControl>
        <AllFormControl style={{margin:"20px"}} >
          <InputLabel>Contact Person Email</InputLabel>
          <Input name="contactpersonemail" onChange={(e) => onValueChange(e)} value={user.contactpersonemail} />

        </AllFormControl>
        <AllFormControl style={{margin:"20px"}} >
          <InputLabel>Contact Person Mobile</InputLabel>
          <Input type="number" name="contactpersonmobile" onChange={(e) => onValueChange(e)} value={user.contactpersonmobile} />

        </AllFormControl>
        <RemoveCircleOutlineIcon onClick={RemoveContactPersonField} />
      </EmailFormControl>
        :
        <ControlledBox ></ControlledBox>
      }
      <Container>
        <AllFormControl style={{margin:"20px"}} >
          <Button variant="contained" onClick={() => EditCustomerDetails()}>
            Edit Customer
          </Button>
        </AllFormControl>
      </Container>
    </MainControlledBox>
  )
}

export default EditCustomers