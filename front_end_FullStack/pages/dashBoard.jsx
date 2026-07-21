import { useEffect, useState } from "react";
import "./dashBoard.css";
import {
  getStudents,
  createStudent,
  deleteStudent,
} from "../src/services/studentService";
import { getClasses, createClass } from "../src/services/classService";
import {
  getGrades,
  createGrade,
  deleteGrade,
} from "../src/services/gradeService";

function DashBoard({ user, onLogout }) {
  const [students, setStudents] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    registration: "",
    age: "",
  });

  const podeGerenciar = user?.role === "admin" || user?.role === "professor";
  const podeCriarExcluir = user?.role === "admin";

  // Notas (professor e admin cadastram; só admin exclui)
  const podeLancarNotas = user?.role === "admin" || user?.role === "professor";
  const [classes, setClasses] = useState([]);
  const [grades, setGrades] = useState([]);
  const [carregandoNotas, setCarregandoNotas] = useState(false);
  const [erroNotas, setErroNotas] = useState("");
  const [enviandoNota, setEnviandoNota] = useState(false);
  const [gradeFormData, setGradeFormData] = useState({
    studentId: "",
    classId: "",
    grade: "",
  });

  // Turmas (professor e admin cadastram; só admin edita/exclui)
  const podeCriarTurma = user?.role === "admin" || user?.role === "professor";
  const [erroTurma, setErroTurma] = useState("");
  const [enviandoTurma, setEnviandoTurma] = useState(false);
  const [classFormData, setClassFormData] = useState({ name: "" });

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

  const carregarTurmas = async () => {
    try {
      const response = await getClasses();
      setClasses(response.data || []);
    } catch (error) {
      const mensagem =
        error.response?.data?.message || "Não foi possível carregar as turmas.";
      setErroNotas(mensagem);
    }
  };

  const carregarNotas = async () => {
    setCarregandoNotas(true);
    setErroNotas("");

    try {
      const response = await getGrades();
      setGrades(response.data || []);
    } catch (error) {
      const mensagem =
        error.response?.data?.message || "Não foi possível carregar as notas.";
      setErroNotas(mensagem);
    } finally {
      setCarregandoNotas(false);
    }
  };

  useEffect(() => {
    if (podeGerenciar) {
      carregarAlunos();
    }

    if (podeLancarNotas) {
      carregarTurmas();
      carregarNotas();
    }
  }, [podeGerenciar, podeLancarNotas]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    setErro("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setErro("Preencha nome, e-mail e senha para cadastrar o aluno.");
      return;
    }

    setEnviando(true);

    try {
      await createStudent({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        registration: formData.registration.trim(),
        age: formData.age ? Number(formData.age) : null,
      });

      setFormData({ name: "", email: "", password: "", registration: "", age: "" });
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

  const handleGradeChange = (event) => {
    const { name, value } = event.target;
    setGradeFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateGrade = async (event) => {
    event.preventDefault();
    setErroNotas("");

    if (!gradeFormData.studentId || !gradeFormData.classId || gradeFormData.grade === "") {
      setErroNotas("Selecione o aluno, a turma e informe a nota.");
      return;
    }

    setEnviandoNota(true);

    try {
      await createGrade({
        studentId: Number(gradeFormData.studentId),
        classId: Number(gradeFormData.classId),
        grade: Number(gradeFormData.grade),
      });

      setGradeFormData({ studentId: "", classId: "", grade: "" });
      await carregarNotas();
    } catch (error) {
      const mensagem =
        error.response?.data?.message ||
        "Não foi possível cadastrar a nota.";
      setErroNotas(mensagem);
    } finally {
      setEnviandoNota(false);
    }
  };

  const handleDeleteGrade = async (id) => {
    setErroNotas("");

    try {
      await deleteGrade(id);
      await carregarNotas();
    } catch (error) {
      const mensagem =
        error.response?.data?.message ||
        "Não foi possível excluir a nota.";
      setErroNotas(mensagem);
    }
  };

  const nomeAluno = (studentId) =>
    students.find((student) => student.id === studentId)?.name || `Aluno #${studentId}`;

  const nomeTurma = (classId) =>
    classes.find((turma) => turma.id === classId)?.name || `Turma #${classId}`;

  const handleClassChange = (event) => {
    const { name, value } = event.target;
    setClassFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateClass = async (event) => {
    event.preventDefault();
    setErroTurma("");

    if (!classFormData.name.trim()) {
      setErroTurma("Informe o nome da turma.");
      return;
    }

    setEnviandoTurma(true);

    try {
      await createClass({ name: classFormData.name.trim() });
      setClassFormData({ name: "" });
      await carregarTurmas();
    } catch (error) {
      const mensagem =
        error.response?.data?.message ||
        "Não foi possível cadastrar a turma.";
      setErroTurma(mensagem);
    } finally {
      setEnviandoTurma(false);
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
                <label htmlFor="password">Senha de acesso</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Senha inicial do aluno"
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

          {podeCriarTurma ? (
            <section className="grades-section">
              <h2>Turmas</h2>

              <form onSubmit={handleCreateClass}>
                <div>
                  <label htmlFor="className">Nome da turma</label>
                  <input
                    id="className"
                    name="name"
                    type="text"
                    value={classFormData.name}
                    onChange={handleClassChange}
                    placeholder="Ex: Turma A - 2026"
                    required
                  />
                </div>

                <button type="submit" disabled={enviandoTurma}>
                  {enviandoTurma ? "Cadastrando..." : "Cadastrar turma"}
                </button>
              </form>

              {erroTurma ? <p className="dashboard-error">{erroTurma}</p> : null}

              <table>
                <thead>
                  <tr>
                    <th>Nome da turma</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((turma) => (
                    <tr key={turma.id}>
                      <td>{turma.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ) : null}

          {podeLancarNotas ? (
            <section className="grades-section">
              <h2>Notas</h2>

              <form onSubmit={handleCreateGrade}>
                <div>
                  <label htmlFor="studentId">Aluno</label>
                  <select
                    id="studentId"
                    name="studentId"
                    value={gradeFormData.studentId}
                    onChange={handleGradeChange}
                    required
                  >
                    <option value="">Selecione o aluno</option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="classId">Turma</label>
                  <select
                    id="classId"
                    name="classId"
                    value={gradeFormData.classId}
                    onChange={handleGradeChange}
                    required
                  >
                    <option value="">Selecione a turma</option>
                    {classes.map((turma) => (
                      <option key={turma.id} value={turma.id}>
                        {turma.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="grade">Nota</label>
                  <input
                    id="grade"
                    name="grade"
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={gradeFormData.grade}
                    onChange={handleGradeChange}
                    required
                  />
                </div>

                <button type="submit" disabled={enviandoNota}>
                  {enviandoNota ? "Cadastrando..." : "Cadastrar nota"}
                </button>
              </form>

              {erroNotas ? <p className="dashboard-error">{erroNotas}</p> : null}

              {carregandoNotas ? (
                <p>Carregando notas...</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Aluno</th>
                      <th>Turma</th>
                      <th>Nota</th>
                      {podeCriarExcluir ? <th>Ações</th> : null}
                    </tr>
                  </thead>
                  <tbody>
                    {grades.map((grade) => (
                      <tr key={grade.id}>
                        <td>{nomeAluno(grade.studentId)}</td>
                        <td>{nomeTurma(grade.classId)}</td>
                        <td>{grade.grade}</td>
                        {podeCriarExcluir ? (
                          <td>
                            <button type="button" onClick={() => handleDeleteGrade(grade.id)}>
                              Excluir
                            </button>
                          </td>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          ) : null}
        </>
      )}
    </div>
  );
}

export default DashBoard;
