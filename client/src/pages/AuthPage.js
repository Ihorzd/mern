import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMassage } from "../hooks/message.hook";


export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMassage()
  const { loading, request, error, cleareError} = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error)
    cleareError()
  },[error, message, cleareError])
  useEffect(() => {
    window.M.updateTextFields()
  },[])
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      console.log(data);
    } catch (e) {
      console.log(e)
    }
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId)
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>скоротити силку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизація</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Введіть емеіл"
                  id="email"
                  type={"text"}
                  name="email"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Введіть пароль"
                  id="password"
                  type={"password"}
                  name="password"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="password"> Пароль</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ margin: 10 }}
              disabled={loading}
              onClick={loginHandler}
            >
              Увійти
            </button>
            <button
              className="btn grey lighten-1"
              onClick={registerHandler}
              disabled={loading}
            >
              Реєстрація
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
