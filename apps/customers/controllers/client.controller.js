const Router = require('express');
const router = Router();
const apiResponse = require("../../../helpers/api-response");
const {
    _clientRegister,
    _getAllClients,
    _getClientById,
    _clientUpdate,
    _clientDelete
} = require("../../customers/services/client.service");
const { requireSignIn } = require('../../../common-middleware/index');

router.post('/clientRegister',requireSignIn, clientRegister);
router.get('/getAllClients',requireSignIn, getAllClients);
router.get('/clientById/:id',requireSignIn, getClientById);
router.put('/clientUpdate/:id',requireSignIn, clientUpdate);
router.patch('/clientDelete/:id',requireSignIn, clientDelete);


module.exports = router;


function clientRegister(req, res, next) {
    _clientRegister(req)
        .then((user) =>
            res.json(apiResponse({
                data: user,
                status: "OK",
                message: "Created Successfully!",
            })))
        .catch((err) => next(err));
}

function getAllClients(req, res, next) {
    _getAllClients(req)
        .then((user) =>
            res.json(apiResponse({
                data: user,
                status: "OK",
                message: "Fetched Successfully!",
            })))
        .catch((err) => next(err));
}

function getClientById(req, res, next) {
    _getClientById(req)
        .then((user) =>
            res.json(apiResponse({
                data: user,
                status: "OK",
                message: "Fetched Successfully!",
            })))
        .catch((err) => next(err));
}

function clientUpdate(req, res, next) {
    _clientUpdate(req)
        .then((user) =>
            res.json(apiResponse({
                data: user,
                status: "OK",
                message: "Updated Successfully!",
            })))
        .catch((err) => next(err));
}

function clientDelete(req, res, next) {
    _clientDelete(req)
        .then((user) =>
            res.json(apiResponse({
                data: user,
                status: "OK",
                message: "Deleted Successfully!",
            })))
        .catch((err) => next(err));
}