import "./LoginScreen.scss";

// import Footer from "../../components/Footer/Footer";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Api from "../../utils/api";
import { useSnackbar } from "notistack";

function SignupScreen() {
  const api = new Api();
  let history = useHistory();
  const [dashboardModal, setDashboardModal] = useState(false);
  const [loginInputFields, setLoginInputFields] = useState({
    email: "",
    password: "",
    username: "",
    org_application: true,
  });
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
      if (data.alreadySent) {
        showSuccessSnack("OTP already sent on email");
      } else {
        showSuccessSnack("OTP sent on email");
      }
      localStorage.setItem("xrc",loginInputFields.password);
      history.push({ pathname: "/verify", email: loginInputFields.email });
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
        <div className="loginscreen_maincontainer_title">Sign Up</div>
        <div className="loginscreen_maincontainer_inputcontainer">
          <TextField
            id="outlined-basic"
            className="loginscreen_maincontainer_inputcontainer_inputfield"
            value={loginInputFields.email}
            onChange={(e) =>
              setLoginInputFields({
                ...loginInputFields,
                email: e.target.value,
              })
            }
            label="Email"
            sx={inputStyle}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            className="loginscreen_maincontainer_inputcontainer_inputfield"
            value={loginInputFields.username}
            onChange={(e) =>
              setLoginInputFields({
                ...loginInputFields,
                username: e.target.value,
              })
            }
            label="Username"
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
          Existing User?{" "}
          <span className="loginscreen_bottomcontainer_textcontainer_highlighttext">
            <Link to="/login"> Log In</Link>
          </span>
        </div>
        <div
          onClick={handleSubmit}
          className="loginscreen_bottomcontainer_btncontainer"
        >
          Continue
        </div>
      </section>
    </article>
  );
}

export default SignupScreen;
