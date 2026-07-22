import { useState } from "react";
import "./login.css";
import { login } from "../src/services/authService";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Message } from "primereact/message";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErro("");

    if (!email.trim() || !senha.trim()) {
      setErro("Preencha o e-mail e a senha para entrar.");
      return;
    }

    setCarregando(true);

    try {
      const response = await login(email.trim(), senha);

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      onLoginSuccess(user);
    } catch (error) {
      setErro(
        error.response?.data?.message ||
          "Não foi possível fazer login."
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-header">

        <div className="login-icon">
          <i className="pi pi-building-columns"></i>
        </div>

        <h1>Sistema Escolar</h1>

        <p>Acesse o painel da escola</p>

      </div>

      <form onSubmit={handleSubmit}>

        <div>
          <label>E-mail</label>

          <span className="p-input-icon-left w-full">
            <i className="pi pi-envelope"></i>

            <InputText
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@escola.com"
              className="w-full"
            />
          </span>

        </div>

        <div>

          <label>Senha</label>

          <Password
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            feedback={false}
            toggleMask
            placeholder="Digite sua senha"
            className="w-full"
            inputClassName="w-full"
          />

        </div>

        <button disabled={carregando}>

          <i className="pi pi-sign-in"></i>

          &nbsp;

          {carregando ? "Entrando..." : "Entrar"}

        </button>

        {erro && (
          <Message
            severity="error"
            text={erro}
            className="login-message"
          />
        )}

      </form>

    </div>
  );
}

export default Login;