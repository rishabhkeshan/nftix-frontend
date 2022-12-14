import "./LoginScreen.scss";

// import Footer from "../../components/Footer/Footer";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Api from "../../utils/api";
import { useSnackbar } from "notistack";

function LoginScreen() {
  const [dashboardModal, setDashboardModal] = useState(false);
  const [loginInputFields, setLoginInputFields] = useState({
    username: "",
    password: "",
    org_application: true,
  });
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
    if (data === "err") {
      // localStorage.clear();
      // localStorage.setItem(
      //   "err",
      //   "Something went wrong!"
      // );
      showErrorSnack("Something went wrong");
      return;
    }
    if (data.status) {
      if (data.data.token) {
        localStorage.setItem("jwt", data.data.token);
        localStorage.setItem("username", loginInputFields.username);
        localStorage.setItem("xrc", loginInputFields.password);
        showSuccessSnack(`Login successful! Welcome back ${loginInputFields.username}`);

        history.push("/");
      } else {
        showErrorSnack("Please check if you have an account");
      }
    } else {
      showErrorSnack(data?.description);
      return;
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
            label="Username"
            value={loginInputFields.username}
            onChange={(e) =>
              setLoginInputFields({
                ...loginInputFields,
                username: e.target.value,
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
            type={"password"}
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

export default LoginScreen;
