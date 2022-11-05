import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import Header from "./components/Header/Header";
import LoginScreen from "./pages/LoginSignupScreen/LoginScreen";
import SignupScreen from "./pages/LoginSignupScreen/SignupScreen";
import VerifyOTPScreen from "./pages/LoginSignupScreen/VerifyOTPScreen";

//check user login or not
// const token = localStorage.getItem("authorizationToken")
// const loggedInUser = JSON.parse(localStorage.getItem("user"))

const App = () => (
  <Router>
    <Header/>
    <Switch>
      <Route exact path="/" component={HomeScreen}/>
      <Route exact path="/login" component={LoginScreen}/>
      <Route exact path="/signup" component={SignupScreen}/>
      <Route exact path="/verify" component={VerifyOTPScreen}/>
    </Switch>
  </Router>
);

export default App;
