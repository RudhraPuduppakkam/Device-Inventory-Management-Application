const dbLayer = require("../model/device")
const validator = require("../utilities/validator")

let service = {}

service.insertScript = () => {
    return dbLayer.insertScript().then((data) => {
        return data
    })
}

service.validateLogin = (loginObj) => {
    
    
    return dbLayer.getUser(loginObj.user).then((response) => {
        if (!response) {
            let err = new Error("User does not exist")
            err.status = 401
            throw err
        }
        else if (response.password != loginObj.pass) {
            let err = new Error("Incorrect password")
            err.status = 401
            throw err
        } else {
            return response
        }
    })
}

service.allocateSystem = (dobj) => {
    return dbLayer.allocateSystem(dobj).then((data) => {
        if(data) {
            return data
        }
        else {
            let err = new Error("device not allocated")
            err.status = 500
            throw err;
        }
    })
}

service.searchUser = (user) => {
    return dbLayer.searchUser(user).then((data) => {
        if(data) {
            return data
        }
        else {
            let err = new Error("could not find user")
            err.status = 404
            throw err;
        }
    })
}

service.searchAll = () => {
    return dbLayer.searchAll().then((data) => {
        if(data) {
            return data
        }
        else{
            let err = new Error("no data found")
            err.status = 404
            throw err;
        }
    })
}

service.updateSystem = (udet) => {
    return dbLayer.updateSystem(udet).then((data) => {
        if(data) {
            return data
        }
        else{
            let err = new Error("update failed")
            err.status = 500
            throw err;
        }
    })
}

service.deleteAllocation = (uudet) => {

    return dbLayer.deleteAllocation(uudet).then((data) => {
        if(data) {
            return data
        }
        else{
            let err = new Error("deleting failed")
            err.status = 500
            throw err;
        }
    })
}

service.createRequest = (userdata) => {
    return dbLayer.createRequest(userdata).then((data) => {
        if(data) {
            return data
        }
        else{
            let err = new Error("creating record failed")
            err.status = 500
            throw err;
        }
    })
}


service.viewAll = () => {
    return dbLayer.viewAll().then((data) => {
        if(data) {
            return data
        }
        else{
            let err = new Error("no data found")
            err.status = 404
            throw err;
        }
    })
}


service.rejectreq = (userd) => {
    return dbLayer.rejectreq(userd).then((data) => {
        if(data) {
            return data
        }
        else{
            let err = new Error("no data found")
            err.status = 404
            throw err;
        }
    })
}


service.acceptreq = (userd) => {
    return dbLayer.acceptreq(userd).then((data) => {
        if(data) {
            return data
        }
        else{
            let err = new Error("no data found")
            err.status = 404
            throw err;
        }
    })
}

module.exports = service