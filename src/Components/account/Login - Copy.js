import React from 'react';
import { useState } from 'react';
import { Box, Button, Input, styled, TextField } from '@mui/material';
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
// // background: url("https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80") no-repeat fixed center;
//   width: 400px;
//   margin: 150px auto;
//   box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
// `;
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
const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
  
`;
// const Root = styled('div')(({ theme }) => ({
//     padding: theme.spacing(1),
//     [theme.breakpoints.down('md')]: {
//       backgroundColor: red[500],
//     },
//     [theme.breakpoints.up('md')]: {
//       backgroundColor: blue[500],
//     },
//     [theme.breakpoints.up('lg')]: {
//       backgroundColor: green[500],
//     },
//   })); 
const Login = ({ isAdminAuthenticated }) => {
    const navigate = useNavigate();
    const imageURL =
        "https://www.neerajbooks.com/assets-new/img/nios-logo.png";
    const loginInitialValue = {
        email: "",
        password: "",
    };
    const [login, setLogin] = useState(loginInitialValue);

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };
    const loginuser = async () => {

        // console.log(login);
        // else

        let response = await API.loginuser(login);

        if (response.isSuccess) {
            isAdminAuthenticated(true);
            // <>
            //  <Stack sx={{ width: '100%', height:100 }} spacing={2}>
            // <Alert severity="success">{ response.data.message}</Alert>
            // </Stack>
            // </>
            alert(response.data.message)
            navigate('/')
        }
        // }

       
    }
    const { handleSubmit, control } = useForm();

    const onSubmit = data => {
        console.log(data);
    };
    
    const valueemail = login.email;
    const valuepassword = login.password;
    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="Logo" />

                <Wrapper>
                    {/* <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    label="Email"
                                    variant="standard"
                                    // name='password'
                                    value={value}
                                    // onChange={onChange}
                                    onChange={(e) => onChange(e)}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                />
                            )}
                            rules={{ required: 'Email required' }}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value}, fieldState: { error } }) => (
                                <TextField
                                    label="Password"
                                    // name='password'
                                    variant="standard"
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                />
                            )}
                            rules={{ required: 'Password required' }}
                        />



                          <LoginButton type="submit" variant="contained" onClick={() => loginuser()}>
                        Login
                    </LoginButton> 
                        {/* <Button type="submit" variant="contained" color="primary" >
                            Signup
                        </Button> */}
                {/* </form> */ }
                    

                    <TextField
                        variant="standard"
                        type="email"
                        label="Enter Email"
                        value={login.email}
                        name="email"
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
                        onChange={(e) => onValueChange(e)}
                    />

                    <LoginButton variant="contained" onClick={() => loginuser()}>
                        Login
                    </LoginButton>
                </Wrapper>

            </Box>
        </Component>
    )
}

export default Login
