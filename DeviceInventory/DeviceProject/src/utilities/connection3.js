const mongoose = require("mongoose")
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema
mongoose.set("useCreateIndex", true)

let rschema = {
    "username": {
        type: String,
        required:true ,
        unique:true
    }
}



let requestSchema = new Schema(rschema, { collection: "Request", timestamps: true })


let connection3 = {}
connection3.getCollection = () => {
    return mongoose.connect("mongodb://localhost:27017/ExpressWalletDB", { useNewUrlParser: true }).then((db) => {
        return db.model("Request", requestSchema)
    }).catch((err) => {
        console.log(err.message);

        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}


module.exports = connection3