const Router = require('express');
const router = Router();
const apiResponse = require("../../../helpers/api-response");
const {
    _getAllUsers,
} = require("../../customers/services/user.service");

router.get('/users', getAllUsers);

module.exports = router;

function getAllUsers(req, res, next) {
    _getAllUsers(req)
        .then((user) =>
            user ?
                res.json(apiResponse({
                    data: user,
                    status: "OK",
                    message: "Fetched Successfully !",
                })) :
                res.status(400).json(
                    user
                ))
        .catch((err) => next(err));
}

