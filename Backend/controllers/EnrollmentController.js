import Enrollment from "../models/Enrollment.js";

const EnrollmentController = {

    //! MATRICULA ALUNO
     createEnrollment: async (req, res) => {

        try {

            const { studentId, classId } = req.body;

            if (!studentId || !classId) {
                return res.status(400).json({
                    message: "StudentId e ClassId são obrigatórios."
                });
            }

            const enrollment = await Enrollment.create({
                studentId,
                classId
            });

            return res.status(201).json({
                message: "Matrícula realizada com sucesso.",
                enrollment
            });

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });

        }

    },

    //! LISTAR MATRICULAS
      getAllEnrollments: async (req, res) => {

        try {

            const enrollments = await Enrollment.findAll();

            return res.status(200).json(enrollments);

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });

        }

    },

    //!BUSCAR POR ID
    getByIdEnrollment: async (req, res) => {

        try {

            const { id } = req.params;

            const enrollment = await Enrollment.findByPk(id);

            if (!enrollment) {
                return res.status(404).json({
                    message: "Matrícula não encontrada."
                });
            }

            return res.status(200).json(enrollment);

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });

        }

    },

    //!EXCLUIR MATRICULA
    deleteEnrollment: async (req, res) => {

        try {

            const { id } = req.params;

            const enrollment = await Enrollment.findByPk(id);

            if (!enrollment) {
                return res.status(404).json({
                    message: "Matrícula não encontrada."
                });
            }

            await enrollment.destroy();

            return res.status(200).json({
                message: "Matrícula removida com sucesso."
            });

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });

        }

    }

}

export default EnrollmentController;