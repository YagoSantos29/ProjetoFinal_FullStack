
import Student from "../models/Student.js"
import User from "../models/User.js"

const StudentController = {

    //! ADMIN CRIA ALUNO

    createStudent : async (req, res) => {
        try {
            const {
                userId,
                registration,
                birthDate,
                phone
            } = req.body;

            const user = await User.findByPk(userId);

            if(!user){
                return res.status(404).json({
                    data: null,
                    message: "Usuário não encontrado"
                });
            }

            if(user.role !== "aluno"){
                return res.status(404).json({
                    data: null,
                    message: "Usuário informado não possui role aluno"
                });
            }

            const studentExisting = await Student.findOne ({
                where: { userId }
            });

            if(studentExisting){
                return res.status(404).json({
                    data: null,
                    message: "Estudante já possui cadastro"
                });
            }

            const student = await Student.create({
                userId,
                registration,
                birthDate,
                phone
            });

            return res.status(200).json({
                message: "Aluno cadastrado com sucesso",
                student
            });
        } catch (error) {
            return res.status(500).json({
                message: "Erro interno ao cadastrar usuário",
                message: error.message
            })


        }
            

    },
       //!ADMIN E DOCENTE LISTAM TODOS OS ALUNOS

       getAllStudent : async (req, res) => {
          try {
            const students = await Student.findAll({
                include: {
                    model: User,
                    attributes: ["id", "name", "email"]
                }
            });

            return res.status(200).json({
                message: "Alunos listados com sucesso",
                students
            })
          } catch (error){
              return res.status(500).json({
                message: "Erro interno a listar todos os alunos",
                message: error.message
              });
          }

    },

       //! ADMIN E DOCENTE LISTAM ALUNO POR ID

       getByIdStudent : async (req, res) => {
        try {
            const { id } = req.params;

            const student = await Student.findByPk(id, {
                include: {
                    model: User,
                    attributes: ["id", "name", "email"]
                }
            });

            if(!student) {
                return res.status(404).json({
                    data: null,
                    message: "Aluno não encontrado"
                });
            }

            return res.status(200).json({
                message:`Aluno do id ${userId} listado com sucesso!`,
                student
            });
        } catch(error) {
            return res.status(500).json({
                message: "Erro interno ao listar aluno por id",
                message: error.message
            });
        }
    },

    //! ADMIN ATUALIZA ALUNO

    updateStudent: async (req, res) => {
     try {
        const { id } = req.params;

        const student = await Student.findByPk(id);

        if(!student) {
            return res.status(404).json({
                data: null,
                message: "Aluno não encontrado"
            });
        }

        await student.student(req.body);

        return res.status(200).json({
            message: "Aluno atualizado com sucesso",
            student
        });

    } catch (error) {
        return res.status(500).json({
            message: "Erro interno ao atualizar aluno",
            message: error.message
        })
       }


    },

    //! ADMIN DELETA ALUNO

    deleteStudent: async (req, res) => {
        try{
            const { id } = req.params;

            const student = await Student.findByPk(id)

            if(!student){
                return res.status(404).json({
                    data: null,
                    message: "Aluno não encontrado"
                })
            }

            await student.destroy()

            return res.status(200).json({
                message: "Aluno deletado com sucesso"
            });
        } catch (error) {
            return res.status(500).json({
                message: "Erro interno ao deletar usuário",
                message: error.message
            });
        
        }

    },


    //! ALUNO VISUALIZA SEUS DADOS
    
    viewStudent: async (req, res) => {
        try{
            const student = await Student.findOne({
                where: {
                    userId: req.user.id
                },
                include:  {
                    model: User,
                    attributes: ["name", "email", "grade"]
                }
            });

            if(!student) {
                return res.status(404).json({
                    data: null,
                    message: "Aluno não encontrado"
                });
            }

            return res.status(200).json({
                message: "Seu perfil:"
            })
        } catch(error){
            return res.status(500).json({
                message: "Erro interno ao buscar seus dados",
                message: error.message
            });
        }
    
    
    }



}

export default StudentController