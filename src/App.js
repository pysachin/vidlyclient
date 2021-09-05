import Movies from "./components/movies";
import { getUser } from "./services/AuthService";
import "./App.css";
import NavBar from "./components/nav";
import { Redirect, Route, Switch } from "react-router-dom";
import NotFound from "./components/not-found";
import Customer from "./components/customer";
import Rentals from "./components/rentals";
import MovieDescription from "./components/movie-description";
import LoginForm from "./components/login-form";
import RegisterForm from "./components/registration-form";
import AddMovieForm from "./components/add-movie-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Component } from "react";
import Logout from "./components/logout";
import ProtectedRoute from "./components/protectedRoute";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const user = getUser();
      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    return (
      <main className="container">
        {/* <Movies /> */}
        <ToastContainer />
        <NavBar user={this.state.user} />
        <div className="container">
          <Switch>
            <Route path="/movies/:name" component={MovieDescription} />
            <Route path="/customer" component={Customer} />
            <Route path="/rentals" component={Rentals} />
            {/* <Route
              path="/addmovie/:id"
              render={(props) => {
                if (!this.state.user) return <Redirect to="/login"></Redirect>;
                return <AddMovieForm {...props} />;
              }}
            /> */}
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            />
            <Route path="/not-found" component={NotFound} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <ProtectedRoute path="/addmovie/:id" component={AddMovieForm} />
            <Route path="/addmovie" component={AddMovieForm} />
            {/* <Route path="/" exact component={Movies} /> */}
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </main>
    );
  }
}

export default App;
