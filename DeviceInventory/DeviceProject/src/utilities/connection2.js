const mongoose = require("mongoose")
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema
mongoose.set("useCreateIndex", true)

let dschema = {
    "deviceid": {
        type: Number,
        required: true
    },
    "devicename": {
        type: String,
        required: true
    },
    "allocatedto": {
        type: String
    },
    "status": {
        type: Number
    }
}





let deviceSchema = new Schema(dschema, { collection: "Device", timestamps: true })

let connection2 = {}
connection2.getCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/ExpressWalletDB", { useNewUrlParser: true }).then((db) => {
        return db.model("Device", deviceSchema)
    }).catch((err) => {
        console.log(err.message);

        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}

module.exports = connection2