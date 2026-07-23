import Student from "../models/Student.js";
import User from "../models/User.js";
import Enrollment from "../models/Enrollments.js";
import Grade from "../models/Grade.js";
import Class from "../models/Class.js";
import banco from "../database/dbConnection.js";
import bcrypt from "bcrypt";

const StudentController = {

    //! ADMIN CRIA ALUNO (cria o User de login e o Student juntos, em uma única transação)

    createStudent: async (req, res) => {

        const transaction = await banco.transaction();

        try {

            const {
                name,
                email,
                password,
                registration,
                age
            } = req.body;

            if (!name || !email || !password) {
                await transaction.rollback();
                return res.status(400).json({
                    data: null,
                    message: "Nome, e-mail e senha são obrigatórios."
                });
            }

            const existingUser = await User.findOne({
                where: { email },
                transaction
            });

            if (existingUser) {
                await transaction.rollback();
                return res.status(409).json({
                    data: null,
                    message: "Já existe um usuário cadastrado com este e-mail."
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            // Cria o login (User) do aluno. O id é auto-increment, gerado pelo banco.
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                role: "aluno"
            }, { transaction });

            // Cria a ficha acadêmica (Student), já vinculada ao User acima.
            // O id do Student também é auto-increment, gerado pelo banco.
            const student = await Student.create({
                name,
                email,
                userId: user.id,
                registration,
                age
            }, { transaction });

            await transaction.commit();

            return res.status(201).json({
                message: "Aluno cadastrado com sucesso!",
                student
            });

        } catch (error) {

            await transaction.rollback();

            return res.status(500).json({
                message: error.message
            });

        }
    },

    //! ADMIN E PROFESSOR LISTAM TODOS OS ALUNOS

    getAllStudent: async (req, res) => {

        try {

            const students = await Student.findAll({
                include: {
                    model: User,
                    as: "user",
                    attributes: ["id", "name", "email", "role"]
                }
            });

            return res.status(200).json({
                message: "Alunos listados com sucesso!",
                students
            });

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });

        }

    },

    //! BUSCAR ALUNO POR ID

    getByIdStudent: async (req, res) => {

        try {

            const { id } = req.params;

            const student = await Student.findByPk(id, {
                include: {
                    model: User,
                    as: "user",
                    attributes: ["id", "name", "email", "role"]
                }
            });

            if (!student) {
                return res.status(404).json({
                    data: null,
                    message: "Aluno não encontrado."
                });
            }

            return res.status(200).json({
                message: `Aluno ${id} encontrado com sucesso!`,
                student
            });

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });

        }

    },

    //! ATUALIZAR ALUNO

    updateStudent: async (req, res) => {

        try {

            const { id } = req.params;

            const student = await Student.findByPk(id);

            if (!student) {

                return res.status(404).json({
                    data: null,
                    message: "Aluno não encontrado."
                });

            }

            await student.update(req.body);

            return res.status(200).json({
                message: "Aluno atualizado com sucesso!",
                student
            });

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });

        }

    },

    //! DELETAR ALUNO

    deleteStudent: async (req, res) => {

        try {

            const { id } = req.params;

            const student = await Student.findByPk(id);

            if (!student) {

                return res.status(404).json({
                    data: null,
                    message: "Aluno não encontrado."
                });

            }

            await student.destroy();

            return res.status(200).json({
                message: "Aluno deletado com sucesso!"
            });

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });

        }

    },

    //! ALUNO VISUALIZA O PRÓPRIO PERFIL

    viewStudent: async (req, res) => {

        try {

            const student = await Student.findOne({
                where: {
                    userId: req.user.id
                },
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: ["id", "name", "email"]
                    },
                    {
                        model: Enrollment,
                        as: "enrollments",
                        include: {
                            model: Class,
                            as: "class"
                        }
                    },
                    {
                        model: Grade,
                        as: "grades",
                        include: {
                            model: Class,
                            as: "class"
                        }
                    }
                ]
            });

            if (!student) {

                return res.status(404).json({
                    data: null,
                    message: "Aluno não encontrado."
                });

            }

            return res.status(200).json({
                message: "Perfil do aluno",
                student
            });

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });

        }

    }

};

export default StudentController;