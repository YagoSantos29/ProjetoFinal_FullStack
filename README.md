# 📚 Sistema Escolar - Projeto Full Stack

## 👨‍💻 Integrantes

- Yago Santos
- Nicolas
- Gregory

---

## 📖 Sobre o Projeto

O Sistema Escolar é uma aplicação Full Stack desenvolvida para a disciplina de **Desenvolvimento de Sistemas**.

O objetivo do projeto é facilitar o gerenciamento de uma instituição de ensino, permitindo o controle de usuários, alunos, turmas, matrículas e notas, utilizando diferentes níveis de acesso para Administradores, Professores e Alunos.

---

# 🚀 Tecnologias Utilizadas

## Frontend

- React
- React Router DOM
- Axios
- CSS

## Backend

- Node.js
- Express
- Sequelize
- MySQL
- JWT (JSON Web Token)
- bcrypt
- dotenv
- cors

---

# 🗄️ Banco de Dados

O sistema utiliza o **MySQL**, sendo gerenciado através do **Sequelize ORM**.

---

# 👥 Tipos de Usuários

### 👑 Administrador

- Criar usuários
- Editar usuários
- Excluir usuários
- Cadastrar alunos
- Cadastrar turmas
- Matricular alunos
- Visualizar todos os alunos
- Gerenciar notas

---

### 👨‍🏫 Professor

- Visualizar alunos
- Visualizar turmas
- Lançar notas
- Editar notas

---

### 🎓 Aluno

- Fazer login
- Visualizar seus próprios dados
- Visualizar suas notas

---

# ⚙️ Funcionalidades

- Autenticação com JWT
- Controle de permissões por perfil
- Cadastro de usuários
- Cadastro de alunos
- Cadastro de turmas
- Matrículas
- Registro de notas
- Relacionamentos entre tabelas utilizando Sequelize

---

# 📂 Estrutura do Projeto

```
ProjetoFinal_FullStack/
│
├── Backend/
│   ├── controllers/
│   ├── database/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# 📌 Modelos do Banco

O sistema possui os seguintes modelos:

- User
- Student
- Class
- Enrollment
- Grade

---

# 🔗 Relacionamentos

- Um User pode representar um aluno, professor ou administrador.
- Um Student pertence a um User.
- Um Student pode estar matriculado em várias turmas.
- Uma Class possui vários alunos.
- Uma matrícula (Enrollment) relaciona um aluno a uma turma.
- As notas (Grade) pertencem a um aluno dentro de uma turma.

---

# 🔐 Autenticação

O sistema utiliza **JWT (JSON Web Token)**.

Após realizar o login, o backend retorna um token que deve ser enviado nas requisições protegidas através do header:

```
Authorization: Bearer SEU_TOKEN
```

---

# ▶️ Como Executar o Projeto

## Backend

Entre na pasta Backend:

```bash
cd Backend
```

Instale as dependências:

```bash
npm install
```

Configure o arquivo `.env`:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=sistema_escolar

JWT_SECRET=seuSegredoJWT
```

Execute o servidor:

```bash
node server.js
```

---

## Frontend

Entre na pasta Frontend:

```bash
cd Frontend
```

Instale as dependências:

```bash
npm install
```

Execute a aplicação:

```bash
npm run dev
```

---

# 📡 Principais Rotas da API

## Autenticação

| Método | Rota | Descrição |
|---------|------|-----------|
| POST | /auth/login | Realiza o login |

---

## Usuários

| Método | Rota |
|---------|------|
| GET | /users |
| GET | /users/:id |
| POST | /users |
| PUT | /users/:id |
| DELETE | /users/:id |

---

## Alunos

| Método | Rota |
|---------|------|
| GET | /students |
| GET | /students/:id |
| POST | /students |
| PUT | /students/:id |
| DELETE | /students/:id |

---

## Turmas

| Método | Rota |
|---------|------|
| GET | /classes |
| GET | /classes/:id |
| POST | /classes |
| PUT | /classes/:id |
| DELETE | /classes/:id |

---

## Matrículas

| Método | Rota |
|---------|------|
| GET | /enrollments |
| GET | /enrollments/:id |
| POST | /enrollments |
| PUT | /enrollments/:id |
| DELETE | /enrollments/:id |

---

## Notas

| Método | Rota |
|---------|------|
| GET | /grades |
| GET | /grades/:id |
| POST | /grades |
| PUT | /grades/:id |
| DELETE | /grades/:id |

---

# 👨‍💻 Desenvolvido por

- **Yago Santos**
- **Nicolas**
- **Gregory**

Projeto desenvolvido para a disciplina de **Desenvolvimento de Sistemas**.