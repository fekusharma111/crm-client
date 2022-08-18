import {FormControl, FormGroup, InputLabel, Input, Typography, Button, TextField, } from "@mui/material";
import styled from "@emotion/styled";
import React, { useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box } from "@mui/system";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { API } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Container = styled(FormGroup)`
margin-top:5%;
display:flex;
flex-direction:row;
justify-content:space-evenly;
& >div{ 
}
`
const AllFormControl = styled(FormControl)(({ theme }) => ({
  margin:"30px",
  width: "400px",
}))

const EmailFormControl = styled(FormControl)`
margin:20px;
display:flex;
flex-direction:column;
// align-items: center;
// width:800px;
// justify-content:center;
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
const DesignationBox = styled(Box)`
display:flex;
flex-direction:column;
`
const AddCustomers = () => {
  // const {register, handleSubmit, errors}= useForm()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleError = (errors) => { };
  const navigate = useNavigate()
  const defaultValue = {
    
    email1: "",
    email2: "",
    
    contact1: "",
    contact2: "",
    designation: "",
    contactpersonname: "",
    contactpersonemail: "",
    contactpersonmobile: ""
  };
  const [user, setUser] = useState(defaultValue);
  const [openConatct, setopencontact] = useState(false)
  const [openEmail, setopenEmail] = useState(false)
  const [opencontactpersonfield, setopencontactpersonfield] = useState(false)
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
  const onValueChange = (e) => {
    // console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const AddContactPersonField = () => {
    setopencontactpersonfield(true)
  }
  const RemoveContactPersonField = () => {
    setopencontactpersonfield(false)
  }
  const AddCustomerDetails = async (data) => {
    // console.log(data);
    // console.log(user);
    let alldata = { ...user, ...data }
    console.log(alldata);
    let response = await API.addcustomerdetails(alldata)
    if (response.isSuccess) {
      // console.log(response.status);
      setUser(defaultValue);
      alert(response.data.message)
      navigate('/all')
    }


  }
  const registerOptions = {
    customername: { required: "Customer Name is required" },
    customeremail: {
      required: "Email is required"
    },
    customercontact: {
      required: "Contact is required"
    },
    companyname: {
      required: "Company name is required"
    },
  };
 
  return (
    <MainControlledBox>
        <form  onSubmit={handleSubmit(AddCustomerDetails, handleError)}>
      <Typography variant="h4" sx={{ textAlign: "center" }}>Add Customer Details</Typography>
      <Box>
          <AllFormControl style={{ margin: "20px" }} onSubmit>
          <InputLabel>Customer's Name</InputLabel>
            <Input type="text" name="customername" id="customername" onChange={(e) => onValueChange(e)}
              {...register('customername', registerOptions.customername)}
            />
          
          <small style= {{color:"red"}}>
          {errors?.customername && errors.customername.message}
        </small>
        </AllFormControl>
        <EmailFormControl>
        
            <InputLabel>Customer's Email ID</InputLabel>
            <Input type="email" name="customeremail" onChange={(e) => onValueChange(e)}
            {...register('customeremail', registerOptions.customeremail)}/>
           <small style= {{color:"red"}}>
          {errors?.customeremail && errors.customeremail.message}
        </small>
            <AddCircleOutlineIcon onClick={AddMoreEmailField} />
            
        </EmailFormControl>
        {openEmail ? <EmailFormControl  >
          <AllFormControl style={{margin:"20px"}} >
            <InputLabel>Alternate Email 1 </InputLabel>
            <Input name="email1" onChange={(e) => onValueChange(e)} />

          </AllFormControl>
          <AllFormControl style={{margin:"20px"}} >
            <InputLabel>Alternate Email 2</InputLabel>
            <Input name="email2" onChange={(e) => onValueChange(e)} />

          </AllFormControl>
          <RemoveCircleOutlineIcon onClick={RemoveMoreEmailField} />
        </EmailFormControl>
          :
          <ControlledBox ></ControlledBox>
        }
      </Box>
      <Box>
        <AllFormControl style={{margin:"20px"}} >
          <InputLabel>Company Name</InputLabel>
            <Input name="companyname" onChange={(e) => onValueChange(e)}
              {...register('companyname', registerOptions.companyname)} />
             <small style= {{color:"red"}}>
          {errors?.companyname && errors.companyname.message}
        </small>
        </AllFormControl>
        <EmailFormControl>
          
            <InputLabel>Customer's Contact</InputLabel>
            <Input type="number" name="customercontact" onChange={(e) => onValueChange(e)}
            {...register('customercontact', registerOptions.customercontact)}/>
          
            <small style= {{color:"red"}}>
          {errors?.customercontact && errors.customercontact.message}
        </small>
          <AddCircleOutlineIcon onClick={AddMoreContactField} />
        </EmailFormControl>
        {openConatct ? <EmailFormControl  >
          <AllFormControl style={{margin:"20px"}} >
            <InputLabel>Alternate contact 1 </InputLabel>
            <Input type="number" name="contact1" onChange={(e) => onValueChange(e)} />

          </AllFormControl>
          <AllFormControl style={{margin:"20px"}} >
            <InputLabel>Alternate Contact 2</InputLabel>
            <Input type="number" name="contact2" onChange={(e) => onValueChange(e)} />

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
          <Input name="designation" onChange={(e) => onValueChange(e)} />

        </AllFormControl>
        <Button variant="contained" endIcon={<PersonAddIcon />} style={{width:"300px", alignSelf: "center" }}  onClick={() => AddContactPersonField()}>
          Add Contact Person
        </Button>
      </DesignationBox>
      {opencontactpersonfield ? <EmailFormControl  >
        <AllFormControl style={{margin:"20px"}} >
          <InputLabel>Contact Person Name </InputLabel>
          <Input name="contactpersonname" onChange={(e) => onValueChange(e)} />

        </AllFormControl>
        <AllFormControl style={{margin:"20px"}} >
          <InputLabel>Contact Person Email</InputLabel>
          <Input name="contactpersonemail" onChange={(e) => onValueChange(e)} />

        </AllFormControl>
        <AllFormControl style={{margin:"20px"}} >
          <InputLabel>Contact Person Mobile</InputLabel>
          <Input type="number" name="contactpersonmobile" onChange={(e) => onValueChange(e)} />

        </AllFormControl>
        <RemoveCircleOutlineIcon onClick={RemoveContactPersonField} />
      </EmailFormControl>
        :
        <ControlledBox ></ControlledBox>
      }
      <Container>
        <AllFormControl style={{margin:"20px"}} >
            <Button variant="contained"
              type="submit"
              // onClick={() => AddCustomerDetails()}
            >
            Add Customer
          </Button>
        </AllFormControl>
        </Container>
        </form>
    </MainControlledBox>
  );
};

export default AddCustomers;
