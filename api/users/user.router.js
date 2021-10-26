const { createUser,
        getUsers,
        getUserById,
        updateUser,
        deleteUser, 
        login } = require('./user.controller');
const router = require('express').Router();

router.post("/", createUser);
router.get("/", getUsers);
//-- id will be in the path
router.get("/:id", getUserById);
//-- The id will be in the data sent
router.patch("/", updateUser);
router.delete("/", deleteUser);

router.post("/login", login);


module.exports = router;