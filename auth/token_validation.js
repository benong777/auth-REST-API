const { verify } = require('jsonwebtoken')

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {        // Authorized
            //-- Remove the "Bearer " (7 characters including the space)
            token = token.slice(7);
            verify( token, 
                    process.env.JWT_KEY,
                    (error, decoded) => {
                        if (error) {
                            res.json({
                                success: 0,
                                message: "Invalid token"
                            });
                        } else {
                            next();
                        }
                    });
        } else {            // Denied
            res.json({
                success: 0,
                message: "Access denied. Unauthorized user"
            });
        }
    }
}