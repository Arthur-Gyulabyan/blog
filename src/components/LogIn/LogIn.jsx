import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { createTheme, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { red, green } from '@material-ui/core/colors';
import isValidInput from '../../helpers/verifiers';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Arthur Gyulabyan
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const styles = {
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  redirectionText: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
    color: red['200'],
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  inputField: {
    marginBottom: 0,
  },
  validInputField: {
    '& .MuiInputBase-input + fieldset': {
      borderColor: green.A400,
    },
    '& .MuiInputBase-input:focus + fieldset': {
      borderColor: green.A400,
    },
    '& .Mui-required': {
      color: green.A400,
    },
  },
  invalidInputField: {
    '& .MuiInputBase-input + fieldset': {
      borderColor: red.A400,
    },
    '& .MuiInputBase-input:focus + fieldset': {
      borderColor: red.A200,
    },
    '& .Mui-required': {
      color: red.A200,
    },
  },
  validText: {
    width: '100%',
    marginLeft: '0.6rem',
    color: green.A400,
  },
  invalidText: {
    width: '100%',
    marginLeft: '0.6rem',
    color: red.A200,
  },
  hiddenText: {
    visibility: 'hidden',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
};

function LogIn({ classes, handleLogInClick }) {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const validationTexts = {
    validUsername: 'Valid username',
    invalidUsername: 'Only letters (2-10)',
    validPassword: 'Valid password',
    invalidPassword: 'At least 1 number, 1 uppercase (6-20)',
  };

  const handleUsernameChange = (e) => {
    const { value, name } = e.target;

    setIsValidUsername(isValidInput(value, name));
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const { value, name } = e.target;

    setIsValidPassword(isValidInput(value, name));
    setPassword(e.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography variant="h5" className={classes.redirectionText}>
        Log In to be Able to Add Post
      </Typography>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            className={`${classes.inputField} ${
              isValidUsername
                ? classes.validInputField
                : classes.invalidInputField
            }`}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="off"
            autoFocus
            onChange={handleUsernameChange}
          />
          <Typography
            style={
              username.length
                ? { visibility: 'visible' }
                : { visibility: 'hidden' }
            }
            variant="caption"
            component="p"
            className={
              isValidUsername ? classes.validText : classes.invalidText
            }>
            {isValidUsername
              ? validationTexts.validUsername
              : validationTexts.invalidUsername}
          </Typography>
          <TextField
            className={`${classes.inputField} ${
              isValidPassword
                ? classes.validInputField
                : classes.invalidInputField
            }`}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
          />
          <Typography
            style={
              password.length
                ? { visibility: 'visible' }
                : { visibility: 'hidden' }
            }
            variant="caption"
            component="p"
            className={
              isValidPassword ? classes.validText : classes.invalidText
            }>
            {isValidPassword
              ? validationTexts.validPassword
              : validationTexts.invalidPassword}
          </Typography>
          <FormControlLabel
            control={<Checkbox value="remember" color="secondary" />}
            label="Remember me"
          />
          <Button
            disabled={!(isValidUsername && isValidPassword)}
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={() => {
              handleLogInClick(username, generateUniqueID(), password);
              history.push('/add-post');
            }}>
            Log In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

LogIn.propTypes = {
  classes: PropTypes.shape({
    paper: PropTypes.string.isRequired,
    redirectionText: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    form: PropTypes.string.isRequired,
    inputField: PropTypes.string.isRequired,
    validInputField: PropTypes.string.isRequired,
    invalidInputField: PropTypes.string.isRequired,
    validText: PropTypes.string.isRequired,
    invalidText: PropTypes.string.isRequired,
    hiddenText: PropTypes.string.isRequired,
    submit: PropTypes.string.isRequired,
  }).isRequired,
  handleLogInClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(LogIn);
