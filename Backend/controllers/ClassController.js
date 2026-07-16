import Class from "../models/Class.js";

const ClassController = {

    //!CRIAR TURMA
    createClass: async (req, res) => {

        try {

            const { name } = req.body;

            if (!name) {
                return res.status(400).json({
                    message: "O nome da turma é obrigatório."
                });
            }

            const turma = await Class.create({
                name
            });

            return res.status(201).json({
                message: "Turma criada com sucesso.",
                turma
            });

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });

        }

    },

    //!LISTAR TODAS AS TURMAS

    getAllClass: async (req, res) => {

        try {

            const turmas = await Class.findAll();

            return res.status(200).json(turmas);

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });

        }

    },

    //!BUSCAR TURMA PELO ID
    getByIdClass: async (req, res) => {

        try {

            const { id } = req.params;

            const turma = await Class.findByPk(id);

            if (!turma) {

                return res.status(404).json({
                    message: "Turma não encontrada."
                });

            }

            return res.status(200).json(turma);

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });

        }

    },

    //!ATUALIZAR TURMA

    updateClass: async (req, res) => {

        try {

            const { id } = req.params;
            const { name } = req.body;

            const turma = await Class.findByPk(id);

            if (!turma) {

                return res.status(404).json({
                    message: "Turma não encontrada."
                });

            }

            await turma.update({
                name
            });

            return res.status(200).json({
                message: "Turma atualizada com sucesso.",
                turma
            });

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });

        }

    },

    //!EXCLUIR TURMA
    
    deleteClass: async (req, res) => {

        try {

            const { id } = req.params;

            const turma = await Class.findByPk(id);

            if (!turma) {

                return res.status(404).json({
                    message: "Turma não encontrada."
                });

            }

            await turma.destroy();

            return res.status(200).json({
                message: "Turma excluída com sucesso."
            });

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });

        }

    }

}

export default ClassController;