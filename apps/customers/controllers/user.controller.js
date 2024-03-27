const Router = require('express');
const router = Router();
const apiResponse = require("../../../helpers/api-response");
const {
    _getAllUsers,
    _adminRegister,
    _adminLogin
} = require("../../customers/services/user.service");
const { requireSignIn } = require('../../../common-middleware/index')

router.post('/register', adminRegister);
router.post('/login', adminLogin);
router.get('/users', requireSignIn, getAllUsers);

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

function adminRegister(req, res, next) {
    _adminRegister(req)
        .then((user) =>
            res.json(apiResponse({
                data: user,
                status: "OK",
                message: "Created Successfully!",
            })))
        .catch((err) => next(err));
}

function adminLogin(req, res, next) {
    _adminLogin(req)
        .then((user) =>
            res.json(apiResponse({
                data: user,
                status: "OK",
                message: "Created Successfully!",
            })))
        .catch((err) => next(err));
}