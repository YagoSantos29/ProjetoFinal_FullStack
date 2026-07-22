import React, { useEffect, useState, useRef } from "react";
import "./dashBoard.css";

// Importações dos Serviços
import {
  getStudents,
  createStudent,
  deleteStudent,
} from "../src/services/studentService";
import {
  getClasses,
  createClass,
  deleteClass,
} from "../src/services/classService";
import {
  getGrades,
  createGrade,
  deleteGrade,
} from "../src/services/gradeService";

// Importações do PrimeReact
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "primereact/card";

function DashBoard({ user, onLogout }) {
  const toast = useRef(null);

  // Estados dos Alunos
  const [students, setStudents] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    registration: "",
    age: "",
  });

  const [errors, setErrors] = useState({});

  // Permissões
  const podeGerenciar = user?.role === "admin" || user?.role === "professor";
  const podeCriarExcluir = user?.role === "admin";
  const podeLancarNotas = user?.role === "admin" || user?.role === "professor";
  const podeCriarTurma = user?.role === "admin" || user?.role === "professor";

  // Estados das Turmas e Notas
  const [classes, setClasses] = useState([]);
  const [grades, setGrades] = useState([]);
  const [carregandoNotas, setCarregandoNotas] = useState(false);
  const [enviandoNota, setEnviandoNota] = useState(false);
  const [gradeFormData, setGradeFormData] = useState({
    studentId: null,
    classId: null,
    grade: null,
  });

  const [enviandoTurma, setEnviandoTurma] = useState(false);
  const [classFormData, setClassFormData] = useState({ name: "" });

  // Utilitários para exibir notificações
  const mostrarSucesso = (mensagem) => {
    toast.current?.show({ severity: "success", summary: "Sucesso", detail: mensagem, life: 3000 });
  };

  const mostrarErro = (mensagem) => {
    toast.current?.show({ severity: "error", summary: "Erro", detail: mensagem, life: 4000 });
  };

  // Funções de Busca
  const carregarAlunos = async () => {
    setCarregando(true);
    try {
      const response = await getStudents();
      setStudents(response.data.students || []);
    } catch (error) {
      mostrarErro(error.response?.data?.message || "Não foi possível carregar os alunos.");
    } finally {
      setCarregando(false);
    }
  };

  const carregarTurmas = async () => {
    try {
      const response = await getClasses();
      setClasses(response.data || []);
    } catch (error) {
      mostrarErro(error.response?.data?.message || "Não foi possível carregar as turmas.");
    }
  };

  const carregarNotas = async () => {
    setCarregandoNotas(true);
    try {
      const response = await getGrades();
      setGrades(response.data || []);
    } catch (error) {
      mostrarErro(error.response?.data?.message || "Não foi possível carregar as notas.");
    } finally {
      setCarregandoNotas(false);
    }
  };

  useEffect(() => {
    if (podeGerenciar) carregarAlunos();
    if (podeLancarNotas) {
      carregarTurmas();
      carregarNotas();
    }
  }, [podeGerenciar, podeLancarNotas]);

  // Handlers - Alunos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const validarFormularioAluno = () => {
    const novosErros = {};
    if (!formData.name.trim()) novosErros.name = "Nome é obrigatório";
    if (!formData.email.trim()) novosErros.email = "E-mail é obrigatório";
    if (!formData.password.trim()) novosErros.password = "Senha é obrigatória";

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    if (!validarFormularioAluno()) {
      mostrarErro("Por favor, preencha todos os campos obrigatórios.");
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
      setErrors({});
      mostrarSucesso("Aluno cadastrado com sucesso!");
      await carregarAlunos();
    } catch (error) {
      mostrarErro(error.response?.data?.message || "Não foi possível cadastrar o aluno.");
    } finally {
      setEnviando(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      mostrarSucesso("Aluno excluído com sucesso!");
      await carregarAlunos();
    } catch (error) {
      mostrarErro(error.response?.data?.message || "Não foi possível excluir o aluno.");
    }
  };

  // Handlers - Turmas
  const handleCreateClass = async (event) => {
    event.preventDefault();

    if (!classFormData.name.trim()) {
      mostrarErro("Informe o nome da turma.");
      return;
    }

    setEnviandoTurma(true);
    try {
      await createClass({ name: classFormData.name.trim() });
      setClassFormData({ name: "" });
      mostrarSucesso("Turma cadastrada com sucesso!");
      await carregarTurmas();
    } catch (error) {
      mostrarErro(error.response?.data?.message || "Não foi possível cadastrar a turma.");
    } finally {
      setEnviandoTurma(false);
    }
  };

  const handleDeleteClass = async (id) => {
    try {
      await deleteClass(id);
      mostrarSucesso("Turma excluída com sucesso!");
      await carregarTurmas();
    } catch (error) {
      mostrarErro(error.response?.data?.message || "Não foi possível excluir a turma.");
    }
  };

  // Handlers - Notas
  const handleCreateGrade = async (event) => {
    event.preventDefault();

    if (!gradeFormData.studentId || !gradeFormData.classId || gradeFormData.grade === null) {
      mostrarErro("Selecione o aluno, a turma e informe a nota.");
      return;
    }

    const notaNumerica = Number(gradeFormData.grade);
    if (isNaN(notaNumerica) || notaNumerica < 0 || notaNumerica > 10) {
      mostrarErro("A nota precisa ser um valor entre 0 e 10.");
      return;
    }

    setEnviandoNota(true);
    try {
      await createGrade({
        studentId: Number(gradeFormData.studentId),
        classId: Number(gradeFormData.classId),
        grade: notaNumerica,
      });

      setGradeFormData({ studentId: null, classId: null, grade: null });
      mostrarSucesso("Nota cadastrada com sucesso!");
      await carregarNotas();
    } catch (error) {
      mostrarErro(error.response?.data?.message || "Não foi possível cadastrar a nota.");
    } finally {
      setEnviandoNota(false);
    }
  };

  const handleDeleteGrade = async (id) => {
    try {
      await deleteGrade(id);
      mostrarSucesso("Nota excluída com sucesso!");
      await carregarNotas();
    } catch (error) {
      mostrarErro(error.response?.data?.message || "Não foi possível excluir a nota.");
    }
  };

  // Mapeamentos
  const nomeAluno = (studentId) =>
    students.find((s) => s.id === studentId)?.name || `Aluno #${studentId}`;

  const nomeTurma = (classId) =>
    classes.find((t) => t.id === classId)?.name || `Turma #${classId}`;

  const notaFormatada = (grade) => {
    if (typeof grade !== "number") return grade;
    return grade.toLocaleString("pt-BR", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    });
  };

  // Templates da DataTable
  const acoesAlunoTemplate = (rowData) => (
    <Button
      icon="pi pi-trash"
      severity="danger"
      text
      rounded
      onClick={() => handleDelete(rowData.id)}
      tooltip="Excluir Aluno"
    />
  );

  const acoesTurmaTemplate = (rowData) => (
    <Button
      icon="pi pi-trash"
      severity="danger"
      text
      rounded
      onClick={() => handleDeleteClass(rowData.id)}
      tooltip="Excluir Turma"
    />
  );

  const acoesNotaTemplate = (rowData) => (
    <Button
      icon="pi pi-trash"
      severity="danger"
      text
      rounded
      onClick={() => handleDeleteGrade(rowData.id)}
      tooltip="Excluir Nota"
    />
  );

  return (
    <div className="dashboard-page">
      <Toast ref={toast} />

      {/* Header */}
      <header className="dashboard-header">
        <div>
          <h1 className="m-0"><i className="pi pi-building mr-2"></i>Painel Escolar</h1>
          <p className="text-500 m-0">Bem-vindo, {user?.name}</p>
        </div>
        <Button
          label="Sair"
          icon="pi pi-sign-out"
          onClick={onLogout}
          className="btn-logout"
        />
      </header>

      {!podeGerenciar ? (
        <Message severity="warn" text="Seu perfil não possui acesso à listagem de alunos." className="w-full" />
      ) : (
        <>
          {/* SEÇÃO 1: GESTÃO DE ALUNOS */}
          <Card title={<><i className="pi pi-users mr-2"></i>Gestão de Alunos</>} className="dashboard-card">
            {podeCriarExcluir && (
              <form onSubmit={handleCreate} className="form-section" noValidate>
                <div className="inputs-grid">
                  <div className="field">
                    <label htmlFor="name">Nome *</label>
                    <InputText
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nome completo"
                      className={errors.name ? "p-invalid" : ""}
                    />
                    {errors.name && <small className="p-error">{errors.name}</small>}
                  </div>

                  <div className="field">
                    <label htmlFor="email">E-mail *</label>
                    <InputText
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@exemplo.com"
                      className={errors.email ? "p-invalid" : ""}
                    />
                    {errors.email && <small className="p-error">{errors.email}</small>}
                  </div>

                  <div className="field">
                    <label htmlFor="password">Senha *</label>
                    <Password
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      toggleMask
                      feedback={false}
                      placeholder="Senha inicial"
                      className={errors.password ? "p-invalid" : ""}
                    />
                    {errors.password && <small className="p-error">{errors.password}</small>}
                  </div>

                  <div className="field">
                    <label htmlFor="registration">Matrícula</label>
                    <InputText
                      id="registration"
                      name="registration"
                      value={formData.registration}
                      onChange={handleChange}
                      placeholder="Código"
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="age">Idade</label>
                    <InputNumber
                      id="age"
                      value={formData.age ? Number(formData.age) : null}
                      onValueChange={(e) => setFormData((prev) => ({ ...prev, age: e.value }))}
                      min={1}
                      max={120}
                      useGrouping={false}
                      placeholder="Ex: 15"
                    />
                  </div>
                </div>

                <div className="button-container">
                  <Button
                    type="submit"
                    label="Cadastrar Aluno"
                    icon="pi pi-user-plus"
                    loading={enviando}
                    className="btn-submit"
                  />
                </div>
              </form>
            )}

            {carregando ? (
              <div className="flex justify-content-center p-4">
                <ProgressSpinner style={{ width: '50px', height: '50px' }} />
              </div>
            ) : (
              <DataTable value={students} responsiveLayout="scroll" emptyMessage="Nenhum aluno encontrado." className="p-datatable-striped">
                <Column field="name" header="Nome" sortable />
                <Column field="email" header="E-mail" sortable />
                <Column field="registration" header="Matrícula" />
                <Column field="age" header="Idade" sortable />
                {podeCriarExcluir && <Column header="Ações" body={acoesAlunoTemplate} exportable={false} style={{ width: '100px' }} />}
              </DataTable>
            )}
          </Card>

          {/* SEÇÃO 2: TURMAS */}
          {podeCriarTurma && (
            <Card title={<><i className="pi pi-bookmark mr-2"></i>Turmas</>} className="dashboard-card">
              <form onSubmit={handleCreateClass} className="form-section" noValidate>
                <div className="field">
                  <label htmlFor="className">Nome da Turma *</label>
                  <InputText
                    id="className"
                    name="name"
                    value={classFormData.name}
                    onChange={(e) => setClassFormData({ name: e.target.value })}
                    placeholder="Ex: Turma A - 2026"
                  />
                </div>

                <div className="button-container">
                  <Button
                    type="submit"
                    label="Cadastrar Turma"
                    icon="pi pi-plus"
                    loading={enviandoTurma}
                    className="btn-submit"
                  />
                </div>
              </form>

              <DataTable value={classes} responsiveLayout="scroll" emptyMessage="Nenhuma turma cadastrada." className="p-datatable-striped">
                <Column field="name" header="Nome da Turma" sortable />
                {podeCriarExcluir && <Column header="Ações" body={acoesTurmaTemplate} exportable={false} style={{ width: '100px' }} />}
              </DataTable>
            </Card>
          )}

          {/* SEÇÃO 3: LANÇAMENTO DE NOTAS */}
          {podeLancarNotas && (
            <Card title={<><i className="pi pi-book mr-2"></i>Lançamento de Notas</>} className="dashboard-card">
              <form onSubmit={handleCreateGrade} className="form-section" noValidate>
                <div className="inputs-grid">
                  <div className="field">
                    <label htmlFor="studentId">Aluno *</label>
                    <Dropdown
                      id="studentId"
                      value={gradeFormData.studentId}
                      options={students}
                      optionLabel="name"
                      optionValue="id"
                      onChange={(e) => setGradeFormData((prev) => ({ ...prev, studentId: e.value }))}
                      placeholder="Selecione o aluno"
                      filter
                      panelClassName="custom-dropdown-panel"
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="classId">Turma *</label>
                    <Dropdown
                      id="classId"
                      value={gradeFormData.classId}
                      options={classes}
                      optionLabel="name"
                      optionValue="id"
                      onChange={(e) => setGradeFormData((prev) => ({ ...prev, classId: e.value }))}
                      placeholder="Selecione a turma"
                      filter
                      panelClassName="custom-dropdown-panel"
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="grade">Nota (0.00 a 10.00) *</label>
                    <InputNumber
                      id="grade"
                      value={gradeFormData.grade}
                      onValueChange={(e) => {
                        const val = e.value;
                        if (val === null) {
                          setGradeFormData((prev) => ({ ...prev, grade: null }));
                          return;
                        }

                        const parteInteira = Math.floor(Math.abs(val)).toString();
                        if (parteInteira.length <= 2 && val <= 10) {
                          setGradeFormData((prev) => ({ ...prev, grade: val }));
                        }
                      }}
                      min={0}
                      max={10}
                      mode="decimal"
                      useGrouping={false}
                      minFractionDigits={0}
                      maxFractionDigits={2}
                      locale="pt-BR"
                      inputProps={{ maxLength: 5 }}
                      placeholder="Ex: 8,75"
                    />
                  </div>
                </div>

                <div className="button-container">
                  <Button
                    type="submit"
                    label="Lançar Nota"
                    icon="pi pi-check"
                    loading={enviandoNota}
                    className="btn-submit"
                  />
                </div>
              </form>

              {carregandoNotas ? (
                <div className="flex justify-content-center p-4">
                  <ProgressSpinner style={{ width: '50px', height: '50px' }} />
                </div>
              ) : (
                <DataTable value={grades} responsiveLayout="scroll" emptyMessage="Nenhuma nota lançada." className="p-datatable-striped">
                  <Column field={(row) => nomeAluno(row.studentId)} header="Aluno" sortable />
                  <Column field={(row) => nomeTurma(row.classId)} header="Turma" sortable />
                  <Column field={(row) => notaFormatada(row.grade)} header="Nota" sortable />
                  {podeCriarExcluir && <Column header="Ações" body={acoesNotaTemplate} exportable={false} style={{ width: '100px' }} />}
                </DataTable>
              )}
            </Card>
          )}
        </>
      )}
    </div>
  );
}

export default DashBoard;