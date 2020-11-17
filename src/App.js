import "./App.css";
import {Route, Switch} from 'react-router-dom';
import { Header } from "./components/Navabar";
import { Home } from "./components/Home";

function App() {
  return (
    <>
      <Header/>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </>
  );
}

export default App;
