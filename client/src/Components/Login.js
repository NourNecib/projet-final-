import { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/actions";
import "../styles.css/login.css";

Modal.setAppElement("#root");

const Login = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }

  const loginUser = () => {
    const user = { email, password };

    dispatch(login(user, navigate))
      // .then(() => {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        console.log(currentUser)

        // if (currentUser?.role === "admin") {
        //   navigate("/admin-dashboard");
        // } else {
        //   navigate("/user-dashboard");
        // }

        toggleModal(); 
      // })
      // .catch((err) => {
      //   console.error("Login failed", err);
      //   alert("Email ou mot de passe incorrect !");
      // });
  };

  return (
    <div>
      <button className="login-button" onClick={toggleModal}>Login</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <button className="close-btn" onClick={toggleModal}>×</button>
        <div className="modal-title">Login</div>
        <form className="modal-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button
            type="button"
            className="submit-btn"
            onClick={loginUser}
          >
            Sign in
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Login;