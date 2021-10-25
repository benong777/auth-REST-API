const { createUser,
        getUsers,
        getUserById,
        updateUser,
        deleteUser } = require('./user.controller');
const router = require('express').Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
//-- The id will be in the data sent
router.patch("/", updateUser);
router.delete("/", deleteUser);


module.exports = router;