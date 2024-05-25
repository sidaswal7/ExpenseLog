import { Redirect, Route, Switch } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header/Header";
import ProfilePage from "./pages/ProfilePage";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <Header/>
      <Switch>
        <Route path="/auth" exact>
          {authCtx.isLoggedIn ?<Redirect to="/profile"/>:<AuthPage/>}
        </Route>
        <Route path="/profile" exact>
          {authCtx.isLoggedIn ? <ProfilePage/>: <Redirect to="/auth"/>}
        </Route>
        <Route path="/forgot-password">
          {authCtx.isLoggedIn ? <Redirect to="/profile"/>:<ForgotPasswordPage/>}
        </Route>
      </Switch>

      
    </>
  );
}

export default App;
