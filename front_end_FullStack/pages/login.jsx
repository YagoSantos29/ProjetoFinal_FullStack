import { useState } from "react";
import "./login.css";
import { login } from "../src/services/authService";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (event) => {
<<<<<<< HEAD
  event.preventDefault();
  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: senha }),
    });
    const data = await res.json();
    if (!res.ok) {
      setErro(data.message);
    } else {
      localStorage.setItem("token", data.token);
      setSucesso(`Bem-vindo, ${data.user.name}`);
=======
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
      const mensagem =
        error.response?.data?.message ||
        "Não foi possível fazer login. Tente novamente.";
      setErro(mensagem);
    } finally {
      setCarregando(false);
>>>>>>> 92396ccae3bf6bb2d31d53e01152a51829d67d0f
    }
  } catch (err) {
    setErro("Erro ao conectar ao servidor");
  }
};

  return (
    <div className="login-page">
      <h1>Sistema Escolar</h1>
      <p>Acesse o painel da escola</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="usuario@escola.com"
            required
          />
        </div>

        <div>
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>

        <button type="submit" disabled={carregando}>
          {carregando ? "Entrando..." : "Entrar"}
        </button>

        {erro ? <p className="login-error">{erro}</p> : null}
      </form>
    </div>
  );
}

export default Login;