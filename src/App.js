import { Redirect, Route, Switch } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header/Header";
import ProfilePage from "./pages/ProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ExpensePage from "./pages/ExpensePage";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
  return (
    <>
      <Header/>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/auth"/>
        </Route>
        <Route path="/auth" exact>
          {isLoggedIn ?<Redirect to="/profile"/>:<AuthPage/>}
        </Route>
        <Route path="/profile" exact>
          {isLoggedIn ? <ProfilePage/>: <Redirect to="/auth"/>}
        </Route>
        <Route path="/forgot-password" exact>
          {isLoggedIn ? <Redirect to="/profile"/>:<ForgotPasswordPage/>}
        </Route>
        <Route path="/expenses" exact>
          {isLoggedIn ? <ExpensePage/>:<Redirect to="/auth"/>}
        </Route>
      </Switch>

      
    </>
  );
}

export default App;
