import User from "../models/User.js";
import bcrypt from "bcrypt";

const UserController = {
       //! CRIAR USUÁRIO

      createUser: async (req, res) => {
        try {
            const { name, email, password, role } = req.body;

            if (!name || !email || !password || !role) {
                return res.status(400).json({
                    data: null,
                    message: "Todos os campos são obrigatórios"
                })
            }

            const existingUser = await User.findOne({ 
                where: { email }});
                if (existingUser) {
                return res.status(409).json({
                    data: null,
                    message: "Usuário já existe"
                })
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
                role
            });

                return res.status(201).json({
                    data: {
                        id: newUser.id,
                        name: newUser.name,
                        email: newUser.email,
                        role: newUser.role
                    },
                    message: "Usuário criado com sucesso"
                });
              } catch (error) {
                res.status(500).json({
                    data: null,
                    message: "Erro ao criar usuário",
                    error: error.message
                });
    
            }

    },
      
    getAllUsers: async (req, res) => {
        //! LISTAR TODOS OS USUÁRIOS
        try {
            const users = await User.findAll({
                attributes: ['id', 'name', 'email', 'role']
            });
            return res.status(200).json({
                data: users,
                message: "Usuários listados com sucesso"
            })
        } catch (error) {
            return res.status(500).json({
                data: null,
                message: "Erro ao listar usuários",
                error: error.message
            })
        }

                
    },

    getUserById: async (req, res) => {
        //! LISTAR USUÁRIO POR ID
        try {
            const { id } = req.params;
            const user = await User.findByPk(id, {
                attributes: ['id', 'name', 'email', 'role']
            });
            if (!user){
                return res.status(404).json({
                    data: null,
                    message: "Usuário não encontrado"
                })


            }
        } catch (error) {
            return res.status(500).json({
                data: null,
                message: "Erro ao buscar usuário",
                error: error.message
            })
        }
    },

    updateUser: async (req, res) => {
        //!ATUALIZAR USUÁRIO
        try {
            const { id } = req.params;
            const { name, email, password, role } = req.body;

            const user = await User.findByPk(id);
            if (!user){
                return res.status(404).json({
                    data: null,
                    message: "Usuário não encontrado"
                })
            }

            if (email && email !== user.email) {
                const existingUser = await User.findOne({
                where: { email }});

                if(existingUser){
                    return res.status(409).json({
                        data: null,
                        message: "Email já está em uso"
                    })
                }
            }

            const passwordHashed = user.password;
            if(password){
                passwordHashed = await bcrypt.hash(password, 10)
            }

            await user.update({
                name: name ?? user.name,
                email: email ?? user.email,
                password: passwordHashed,
                role: role ?? user.role
            });
            return res.status(200).json({
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                message: "Usuário atualizado com sucesso"
            });

        } catch (error) {
            return res.status(500).json({
                data: null,
                message: "Erro ao atualizar usuário",
                error: error.message
            });
        } 
    },
      
    deleteUser: async (req, res) => {
        //! DELETAr USUÁRIO
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if(!user){
                return res.status(404).json({
                    data: null,
                    message: "Usuário não encontrado"
                });
            }

            await user.destroy();
            return res.status(200).json({
                data: user, 
                message: "Usuário deletado com sucesso"
            });
        } catch (error) {
            return res.status(500).json({
                data: null,
                message: "Erro ao deletar usuário"
            })
        }
    
    
    }


}

export default UserController