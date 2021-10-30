const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO users (fname, lname, email, password, deleted_flag)
                VALUES(?, ?, ?, ?, ?)`,
            [
                data.fname,
                data.lname,
                data.email,
                data.password,
                data.deleted_flag
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUsers: callBack => {
        pool.query(
            // `SELECT * FROM users`,
            `SELECT id, fname, lname, email, deleted_flag 
                FROM users`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUserById: (id, callBack) => {
        pool.query(
            `SELECT id, fname, lname, email, deleted_flag 
                FROM users
                WHERE id=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    updateUser: (data, callBack) => {
        pool.query(
            `UPDATE users 
                SET fname=?, lname=?, email=?, password=?, deleted_flag=? 
                WHERE id=?`,
            [
                data.fname,
                data.lname,
                data.email,
                data.password,
                data.deleted_flag,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    deleteUser: (data, callBack) => {
        pool.query(
            `DELETE FROM users
                WHERE id=?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                //========================================
                console.log("ID: " + data.id);
                console.log("Results[0]: " + results[0]);
                console.log("Results: " + results);
                //========================================
                return callBack(null, results);
            }
        );
    },

    getUserByEmail: (email, callBack) => {
        pool.query(
            `SELECT * from users
                WHERE email=?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                //-- results[0] will store the results.password from the controller
                return callBack(null, results[0]);
            }
        );
    },

};