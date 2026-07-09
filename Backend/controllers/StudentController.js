import Student from "../models/Student.js";
import User from "../models/User.js";

const StudentController = {

    //! ADMIN CRIA ALUNO

    createStudent: async (req, res) => {
        try {

            const {
                name,
                email,
                userId,
                registration,
                age
            } = req.body;

            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({
                    data: null,
                    message: "Usuário não encontrado"
                });
            }

            if (user.role !== "aluno") {
                return res.status(400).json({
                    data: null,
                    message: "O usuário informado não possui a role aluno."
                });
            }

            const studentExisting = await Student.findOne({
                where: { userId }
            });

            if (studentExisting) {
                return res.status(400).json({
                    data: null,
                    message: "Este usuário já possui cadastro de aluno."
                });
            }

            const student = await Student.create({
                name,
                email,
                userId,
                registration,
                age
            });

            return res.status(201).json({
                message: "Aluno cadastrado com sucesso!",
                student
            });

        } catch (error) {

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
                include: {
                    model: User,
                    as: "user",
                    attributes: ["id", "name", "email"]
                }
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