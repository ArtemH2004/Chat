import React, { useState } from "react";
import addAvatar from "./../images/icons/add-avatar.svg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="register__form">
        <h1 className="register__title">Chat</h1>
        <h2 className="register__subtitle">Регистрация</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            className="form__input"
            placeholder="Имя"
            required
          />

          <input
            type="email"
            name="name"
            className="form__input"
            placeholder="Email"
            required
          />

          <input
            type="password"
            name="password"
            className="form__input"
            placeholder="Пароль"
            required
          />

          <label htmlFor="avatar" className="form__input-file">
            <img src={addAvatar} alt="" width={30} height={30} />
            <p>Добавить аватар</p>
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            id="avatar"
            name="avatar"
            className="form__input"
            required
          />

          <button
            className="form__button button button-registration"
            disabled={loading}
          >
            Зарегистрироваться
          </button>
          {loading && (
            <span className="load">
              Загрузка и сжатие изображения,
              <br />
              пожалуйста, подождите...
            </span>
          )}
          {err && <span className="error">Что-то пошло не так</span>}
        </form>

        <p className="register__extra">
          У вас уже есть аккаунт? <Link to="/login" className="register__link">Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
