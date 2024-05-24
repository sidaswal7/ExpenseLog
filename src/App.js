import { Route, Switch } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header/>
      <Switch>
        <Route path="/auth" exact>
          <AuthPage/>
        </Route>
      </Switch>

      
    </>
  );
}

export default App;
