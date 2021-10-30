const { createUser,
        getUsers,
        getUserById,
        updateUser,
        deleteUser, 
        login } = require('./user.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.post("/", checkToken, createUser);
router.get("/", checkToken, getUsers);
//-- id will be in the path
router.get("/:id", checkToken, getUserById);
//-- The id will be in the data sent
router.patch("/", checkToken, updateUser);
router.delete("/", checkToken, deleteUser);

router.post("/login", login);


module.exports = router;