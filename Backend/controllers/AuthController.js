import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AuthController = {
    login: async (req, res) =>{
        try {
            const {email, password} = req.body;

            if(!email || !password){
                return res.status(400).json({
                    data: null,
                    message: "Email e senha são obrigatórios"
                });
            }

            const user = await User.findOne({where: {email}});

            if(!user){
                return res.status(404).json({
                    data: null,
                    message: "Usuário não encontrado",

                });
            }

            const isPasswordValid = await bcrypt.compare(
                password, 
                user.password
            );

            if(!isPasswordValid){
                return res.status(401).json({
                    data: null,
                    message: "Senha inválida"
                });
            }

            const token = jwt.sign(
            {
                id: user.id,
                role: user.role          
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "8h"
            }  
        );


        return res.status(200).json({
            message: "Login realizado com sucesso",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
      } catch (error) {
         return res.status(500).json({
            data: null,
            message: "Erro interno do servidor.",
            error: error.message
         });
     }    

   }
}

export default AuthController;