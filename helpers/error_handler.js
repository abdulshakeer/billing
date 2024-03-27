const apiResponse = require("./api-response");

function errorHandler(err, req, res, next) {
    if (typeof err === "string") {
        return res.status(400).json(
            apiResponse({
                data: [],
                status: "BAD",
                errors: [],
                message: err,
            })
        )
    }
    switch (err.name) {
        case "ValidationError":
            return res.status(400).json(
                apiResponse({
                    data: [],
                    status: "BAD",
                    errors: [],
                    message: err,
                })
            )
        case "UnauthorizedError":
            return res.status(401).json(
                apiResponse({
                    data: [],
                    status: "BAD",
                    errors: [],
                    message: "Invalid Token"
                })
            )
        case "SequelizeUniqueConstraintError":
            return res.status(400).json(
                apiResponse({
                    data: [],
                    status: "BAD",
                    errors: [],
                    message: err.errors[0] ? err.errors[0].message : 'Unique constraint Error',
                })
            )
        case "NetsuiteError":
            return res.status(400).json(
                apiResponse({
                    data: [],
                    status: "BAD",
                    errors: [],
                    message: err.message,
                })
            )
        default:
            return res.status(500).json(
                apiResponse({
                    data: [],
                    status: "BAD",
                    errors: [],
                    message: err.message
                })
            )

    }
}

module.exports = errorHandler