import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Register from "./Register";
import Login from "./Login";
import { logout, getAuth } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "../styles.css/NavigationBar.css"; 
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const navigate = useNavigate()

  const logoutUser = () => {
    dispatch(logout());
    navigate("/")
  };

  useEffect(() => {
    dispatch(getAuth());
  }, []);

  const userNotAuth = (
    <div className="auth-buttons">
      <Register />
      <Login />
    </div>
  );

  const userAuth = (
    <div className="user-info d-flex align-items-center gap-3">
      {user?.role === "admin"? <Nav.Link href="/test">Carte stationnement</Nav.Link> : ""}
      <Nav.Link href="/report" className="text-white">
        Ajouter un signalement
      </Nav.Link>
      <h5 className="mb-0">{user && user.fullName}</h5>
      <button className="logout-button" onClick={logoutUser}>
        Log out
      </button>
    </div>
  );

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand href="#home" className="navbar-brand-custom">
          SmartCity Tunis
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">{user ? userAuth : userNotAuth}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;