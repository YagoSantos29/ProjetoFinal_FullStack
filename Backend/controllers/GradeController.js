import Grade from "../models/Grade.js";

const GradeController = {

    //!CADASTRAR NOTA
    createGrade: async (req, res) => {

        try {

            const { studentId, classId, grade } = req.body;

            if (!studentId || !classId || grade == null) {
                return res.status(400).json({
                    message: "Todos os campos são obrigatórios."
                });
            }

            const newGrade = await Grade.create({
                studentId,
                classId,
                grade
            });

            return res.status(201).json({
                message: "Nota cadastrada com sucesso.",
                newGrade
            });

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });

        }

    },

    //! LISTAR NOTAS

    getAllGrade: async (req, res) => {

        try {

            const grades = await Grade.findAll();

            return res.status(200).json(grades);

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });

        }

    },

    //! BUSCAR NOTA POR ID

    getByIdGrade: async (req, res) => {

        try {

            const { id } = req.params;

            const grade = await Grade.findByPk(id);

            if (!grade) {

                return res.status(404).json({
                    message: "Nota não encontrada."
                });

            }

            return res.status(200).json(grade);

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });

        }

    },

    //! ATUALIZAR NOTA
    updateGrade: async (req, res) => {

        try {

            const { id } = req.params;
            const { grade } = req.body;

            const studentGrade = await Grade.findByPk(id);

            if (!studentGrade) {

                return res.status(404).json({
                    message: "Nota não encontrada."
                });

            }

            await studentGrade.update({
                grade
            });

            return res.status(200).json({
                message: "Nota atualizada com sucesso.",
                studentGrade
            });

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });

        }

    },

    //! DELETAR NOTA

    deleteGrade: async (req, res) => {

        try {

            const { id } = req.params;

            const grade = await Grade.findByPk(id);

            if (!grade) {

                return res.status(404).json({
                    message: "Nota não encontrada."
                });

            }

            await grade.destroy();

            return res.status(200).json({
                message: "Nota removida com sucesso."
            });

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });

        }

    }

}

export default GradeController;