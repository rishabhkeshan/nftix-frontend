import "./LoginScreen.scss";

// import Footer from "../../components/Footer/Footer";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Api from "../../utils/api";
import { useSnackbar } from "notistack";

function LoginScreen() {
  const [dashboardModal, setDashboardModal] = useState(false);
  const [loginInputFields, setLoginInputFields] = useState({email:'',password:''});
  const api = new Api();
  let history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const showErrorSnack = (message) => {
    enqueueSnackbar(message, {
      variant: "error",
      preventDuplicate: true,
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };
  const showSuccessSnack = (message) => {
    enqueueSnackbar(message, {
      variant: "success",
      preventDuplicate: true,
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };
  const handleCloseSelectDashboard = () => {
    setDashboardModal(false);
  };
  const handleSubmit = async () => {
    console.log(loginInputFields);
    const data = await api.signup(loginInputFields);
    if (data.status) {
      localStorage.setItem("jwt", data.token);
      showSuccessSnack("Login successful, JWT is with me bitch");
    }
  };
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      "& > fieldset": {
        border: "1px solid white",
      },
      //   "&:hover": { border: "1px solid white" },
    },
    "& .MuiInputLabel-root": {
      color: "white",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    input: { color: "white" },
  };
  return (
    <article className="loginscreen">
      <section className="loginscreen_maincontainer">
        <div className="loginscreen_maincontainer_title">Login</div>
        <div className="loginscreen_maincontainer_inputcontainer">
          <TextField
            id="outlined-basic"
            className="loginscreen_maincontainer_inputcontainer_inputfield"
            label="Email"
            value={loginInputFields.email}
            onChange={(e) =>
              setLoginInputFields({
                ...loginInputFields,
                email: e.target.value,
              })
            }
            sx={inputStyle}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            className="loginscreen_maincontainer_inputcontainer_inputfield"
            value={loginInputFields.password}
            onChange={(e) =>
              setLoginInputFields({
                ...loginInputFields,
                password: e.target.value,
              })
            }
            sx={inputStyle}
            label="Password"
            variant="outlined"
            margin="dense"
            fullWidth
          />
        </div>
      </section>
      <section className="loginscreen_bottomcontainer">
        <div className="loginscreen_bottomcontainer_textcontainer">
          New User?{" "}
          <span className="loginscreen_bottomcontainer_textcontainer_highlighttext">
            <Link to="/signup">Sign up here</Link>
          </span>
        </div>
        <div onClick={handleSubmit} className="loginscreen_bottomcontainer_btncontainer">Continue</div>
      </section>
    </article>
  );
}

export default LoginScreen;
