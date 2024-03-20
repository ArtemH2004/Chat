import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="register">
      <div className="register__form">
        <h1 className="register__title">Chat</h1>
        <h2 className="register__subtitle">Вход</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="name"
            className="form__input"
            placeholder="Email"
          />

          <input
            type="password"
            name="password"
            className="form__input"
            placeholder="Пароль"
          />

          <button className="form__button button button-registration">
            Войти
          </button>

          {err && <span className="error">Что-то пошло не так</span>}
        </form>

        <p className="register__extra">
          У вас нет аккаунта?
          <br />
          <Link to="/register"  className="register__link">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
