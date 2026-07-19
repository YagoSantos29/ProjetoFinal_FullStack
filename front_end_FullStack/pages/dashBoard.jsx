import { useEffect, useState } from "react";
import {
  getStudents,
  createStudent,
  deleteStudent,
} from "../src/services/studentService";

function DashBoard({ user, onLogout }) {
  const [students, setStudents] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userId: "",
    registration: "",
    age: "",
  });

  const podeGerenciar = user?.role === "admin" || user?.role === "professor";
  const podeCriarExcluir = user?.role === "admin";

  const carregarAlunos = async () => {
    setCarregando(true);
    setErro("");

    try {
      const response = await getStudents();
      setStudents(response.data.students || []);
    } catch (error) {
      const mensagem =
        error.response?.data?.message ||
        "Não foi possível carregar os alunos.";
      setErro(mensagem);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (podeGerenciar) {
      carregarAlunos();
    }
  }, [podeGerenciar]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    setErro("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.userId.trim()) {
      setErro("Preencha nome, e-mail e ID do usuário para cadastrar o aluno.");
      return;
    }

    setEnviando(true);

    try {
      await createStudent({
        name: formData.name.trim(),
        email: formData.email.trim(),
        userId: Number(formData.userId),
        registration: formData.registration.trim(),
        age: formData.age ? Number(formData.age) : null,
      });

      setFormData({ name: "", email: "", userId: "", registration: "", age: "" });
      await carregarAlunos();
    } catch (error) {
      const mensagem =
        error.response?.data?.message ||
        "Não foi possível cadastrar o aluno.";
      setErro(mensagem);
    } finally {
      setEnviando(false);
    }
  };

  const handleDelete = async (id) => {
    setErro("");

    try {
      await deleteStudent(id);
      await carregarAlunos();
    } catch (error) {
      const mensagem =
        error.response?.data?.message ||
        "Não foi possível excluir o aluno.";
      setErro(mensagem);
    }
  };

  return (
    <div className="dashboard-page">
      <header>
        <h1>Painel Escolar</h1>
        <p>Bem-vindo, {user?.name}</p>
        <button type="button" onClick={onLogout}>
          Sair
        </button>
      </header>

      {!podeGerenciar ? (
        <p>Seu perfil não possui acesso à listagem de alunos.</p>
      ) : (
        <>
          {podeCriarExcluir ? (
            <form onSubmit={handleCreate}>
              <div>
                <label htmlFor="name">Nome</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="userId">ID do usuário</label>
                <input
                  id="userId"
                  name="userId"
                  type="number"
                  value={formData.userId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="registration">Matrícula</label>
                <input
                  id="registration"
                  name="registration"
                  type="text"
                  value={formData.registration}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="age">Idade</label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" disabled={enviando}>
                {enviando ? "Cadastrando..." : "Cadastrar aluno"}
              </button>
            </form>
          ) : null}

          {erro ? <p className="dashboard-error">{erro}</p> : null}

          {carregando ? (
            <p>Carregando alunos...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Matrícula</th>
                  <th>Idade</th>
                  {podeCriarExcluir ? <th>Ações</th> : null}
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.registration}</td>
                    <td>{student.age}</td>
                    {podeCriarExcluir ? (
                      <td>
                        <button type="button" onClick={() => handleDelete(student.id)}>
                          Excluir
                        </button>
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

export default DashBoard;
