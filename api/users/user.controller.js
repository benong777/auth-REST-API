const { create, 
        getUserById, 
        getUsers, 
        updateUser, 
        deleteUser,
        getUserByEmail } = require('./user.service');

const { genSaltSync, hashSync, hash, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);

        body.password = hashSync(body.password, salt);

        create(body, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getUserById: (req, res) => {
        const id = req.params.id;
        //-- From user.services
        getUserById(id, (error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            if (!results) {         // null case
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            //-- else RETURN the result
            return res.json({
                success: 1,
                data: results
            });
        })
    },

    getUsers: (req, res) => {
        getUsers((error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            //-- Is this needed???
            if (!results) {         // null case
                return res.json({
                    success: 0,
                    message: "Failed to update user"
                });
            }
            return res.json({
                success: 1,
                message: "User updated successfully"
            });
        });
    },

    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            //======== CASE not working ========
            if (!results) {         // null case
                console.log('Results: ' + results);
                return res.json({
                    success: 0,
                    message: results + "Record not found"
                });
            }
            return res.json({
                success: 1,
                message: "User was deleted successfully"
            });
        })
    },

    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (error, results) => {
            if (error) {
                console.log(error);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
            //-- Check if password is correct
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign( {result: results}, 
                                            'JWT_KEY',
                                            {expiresIn: '1h'} );
                return res.json({
                    success: 1,
                    message: "Login successful",
                    token: jsontoken
                });
            }
            else {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
        });
    }
}