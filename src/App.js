import "./App.css";
import AddProducts from "./component/AddProducts";
import Home from "./component/Home";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Notfound from "./component/Notfound";
import Cart from "./component/Cart";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/addproducts" component={AddProducts} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/cart" component={Cart} />
        <Route component={Notfound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
