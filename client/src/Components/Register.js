import { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { register } from "../Redux/actions";
import "../styles.css/Register.css"; 

Modal.setAppElement("#root");

const Register = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const [fullName, setFull] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }

  const newRegister = () => {
    const newUser = {
      fullName,
      email,
      password,
    };
    dispatch(register(newUser));
    toggleModal();
  };

  return (
    <div>
      <button className="register-button" onClick={toggleModal}>Register</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        className="register-modal"
        overlayClassName="register-overlay"
      >
        <button className="close-btn" onClick={toggleModal}>×</button>
        <div className="modal-title">Create an Account</div>
        <form className="modal-form">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Full name"
            onChange={(e) => setFull(e.target.value)}
          />
          <br />
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
          <button type="button" className="submit-btn" onClick={newRegister}>
            Sign up
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Register;