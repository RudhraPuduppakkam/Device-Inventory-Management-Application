let validator = {}

validator.validateDate = (tDate) => {
    if (new Date(tDate) > new Date()) {
        let err = new Error("Transaction date cannot be future date")
        err.status = 406 //Not acceptable
        throw err
    }
}

module.exports = validator