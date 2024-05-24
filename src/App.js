import { Redirect, Route, Switch } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header/Header";
import ProfilePage from "./pages/ProfilePage";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <Header/>
      <Switch>
        <Route path="/auth" exact>
          {authCtx.hasAccount ?<Redirect to="/profile"/>:<AuthPage/>}
        </Route>
        <Route path="/profile" exact>
          {authCtx.hasAccount ? <ProfilePage/>: <Redirect to="/auth"/>}
        </Route>
      </Switch>

      
    </>
  );
}

export default App;
