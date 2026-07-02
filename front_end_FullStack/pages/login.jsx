import { useState } from "react";

function Login() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nome.trim() || !email.trim() || !senha.trim()) {
      setErro("Preencha o nome, o e-mail e a senha para entrar.");
      setSucesso("");
      return;
    }

    if (
      nome.trim().toLowerCase() === "aluno_teste" &&
      email.trim().toLowerCase() === "aluno@escola.com" &&
      senha === "123456"
    ) {
      setSucesso(`Login realizado com sucesso! Bem-vindo, ${nome}.`);
      setErro("");
    } else {
      setErro("Credenciais inválidas. Use nome: Aluno Teste, e-mail: aluno@escola.com e senha: 123456.");
      setSucesso("");
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
