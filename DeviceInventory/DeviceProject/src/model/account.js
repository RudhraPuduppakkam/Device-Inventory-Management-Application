
const initialData = require("./data.json")
const collection = require("../utilities/connection")


let model = {}

model.insertScript = () => {
    return collection.getCollection().then((collection) => {
        return collection.deleteMany().then((data) => {
            return collection.insertMany(initialData).then((response) => {
                if (response && response.length > 0) {
                    return response.length
                } else {
                    let err = new Error("Script insertion failed")
                    err.status = 500
                    throw new Error
                }
            })
        })
    })
}

module.exports = model