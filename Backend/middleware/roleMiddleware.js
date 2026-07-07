export default function roleMiddleware(...rolesPermitidas) {

    return (req, res, next) => {

        if (!rolesPermitidas.includes(req.user.role)) {

            return res.status(403).json({
                message: "Acesso negado."
            });

        }

        next();

    };

}