import { useState } from "react";

function Login() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleSubmit = async (event) => {
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
    }
  } catch (err) {
    setErro("Erro ao conectar ao servidor");
  }
};

  return (
    <div>
      <h1>Sistema Escolar</h1>
      <p>Acesse o painel da escola</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Aluno Teste"
            required
          />
        </div>

        <div>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="aluno@escola.com"
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

        <button type="submit">Entrar</button>

        {erro ? <p>{erro}</p> : null}
        {sucesso ? <p>{sucesso}</p> : null}
      </form>
    </div>
  );
}

export default Login;
