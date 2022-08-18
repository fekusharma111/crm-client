import React from 'react';
import { useState } from 'react';
import { Box, Button, Input, styled, TextField, Typography } from '@mui/material';
import { API } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { useForm, Controller } from "react-hook-form";

const Component = styled(Box)(({ theme }) => ({
    width: "400px",
    margin: "150px auto",
    background: "rgba( 255, 255, 255, 0.35 )",
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    backdropFilter: "blur( 4px )",
    webkitBackdropFilter: "blur( 4px )",
    borderRadius: "10px",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    [theme.breakpoints.down('md')]: {
        // display: "none",
        width: "350px",
    },
    [theme.breakpoints.down('sm')]: {
        // display: "none",
        width: "250px",
        // height:"300px",

    }
}))

const Image = styled("img")({
    width: 150,
    display: "flex",
    margin: "auto",
    padding: "50px 0 0",
});
const Wrapper = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 25px 35px;
  overflow: auto;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;
const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
  
`;
const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  
`;
const Login = ({ isAdminAuthenticated }) => {
    const navigate = useNavigate();
    const imageURL =
        "https://www.neerajbooks.com/assets-new/img/nios-logo.png";
    const loginInitialValue = {
        username: "",
        password: "",
    };
   
   
    const [login, setLogin] = useState(loginInitialValue);
    

    

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };
    
    const loginuser = async () => {
        let response = await API.loginuser(login);
        if (response.isSuccess) {
            isAdminAuthenticated(true);
            alert(response.data.message)
            navigate('/')
        }
    }
    const { handleSubmit, register, formState: { errors } } = useForm()
    const onSubmit = data => {
        loginuser();
    };
    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="Logo" />

                
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Wrapper>
                            <TextField
                                variant="standard"
                                type="text"
                                label="Enter Username"
                                value={login.username}
                                name="username"
                                {...register("username", { required: "Username is Required"})}

                                error={!!errors?.username}
                                helperText={errors.username ? errors.username.message : null}
                                // error
                                onChange={(e) => onValueChange(e)}
                            // helperText={error ? "Required" : null}

                            />
                            <TextField
                                variant="standard"
                                type="password"
                                label="Enter Password"
                                value={login.password}
                                name="password"
                                {...register("password", { required: "Password is required" })}
                                error={!!errors?.password}
                                helperText={errors.password ? errors.password.message : null}
                                onChange={(e) => onValueChange(e)}
                            />

                            <LoginButton type='submit' variant="contained" >
                                Login
                            </LoginButton>
                            
                        </Wrapper>
                    </form>
              
            </Box>
        </Component>
    )
}

export default Login
