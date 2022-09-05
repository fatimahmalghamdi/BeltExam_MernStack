import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import ListPets from './components/ListPets';
import AddPet from './components/AddPet';
import PetDetails from './components/PetDetails';
import UpdatePet from './components/UpdatePet';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <ListPets />
          </Route>
          <Route  path="/new">
            <AddPet />
          </Route>
          <Route  path="/update/:pet_id">
            <UpdatePet />
          </Route>
          <Route  path="/details/:pet_id">
            <PetDetails />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
