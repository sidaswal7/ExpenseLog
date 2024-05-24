import { Route, Switch } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header/Header";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      <Header/>
      <Switch>
        <Route path="/auth" exact>
          <AuthPage/>
        </Route>
        <Route path="/profile" exact>
          <ProfilePage/>
        </Route>
      </Switch>

      
    </>
  );
}

export default App;
