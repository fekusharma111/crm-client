import React from 'react';
// import { makeStyles } from '@mui/styles';
import {TextField} from '@mui/material';
import {Button} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: theme.spacing(2),

//     '& .MuiTextField-root': {
//       margin: theme.spacing(1),
//       width: '300px',
//     },
//     '& .MuiButtonBase-root': {
//       margin: theme.spacing(2),
//     },
//   },
// }));

const Form = () => {
  // const classes = useStyles();
  const { handleSubmit, control } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form  onSubmit={handleSubmit(onSubmit)} style= {{margin:"100px",}}>
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="First Name"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: 'First name required' }}
      />
      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Last Name"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: 'Last name required' }}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Email"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="email"
          />
        )}
        rules={{ required: 'Email required' }}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Password"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="password"
          />
        )}
        rules={{ required: 'Password required' }}
      />
      <div>
       
        <Button type="submit" variant="contained" color="primary">
          Signup
        </Button>
      </div>
    </form>
  );
};

export default Form;

