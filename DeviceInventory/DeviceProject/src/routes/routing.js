const express = require('express');
const routing = express.Router();
const service = require("../service/account");
const Transaction = require("../model/transaction")
const service1 = require("../service/device");

routing.get("/setupDB", (req, res, next) => {
    service.insertScript().then((data) => {
        if (data) {
            res.status(201)
            res.json({ message: "Inserted " + data + " document in database" })
        }
    })
})

routing.get("/setupDDB", (req, res, next) => {
    service1.insertScript().then((data) => {
        if(data){
            res.status(201)
            res.json({ message: "Inserted" + data + "document in database"})
        }
    })
})

//Routing for login
routing.post("/login", (req, res, next) => {
    
    let loginObj = req.body
    service1.validateLogin(loginObj).then((resp) => {
        
        if (resp) {
            res.status(200)
            res.json(resp)
        }
    }).catch((err) => {
        next(err)
    })
})

//Routing for accepting request
routing.get("/accept/:uname", (req, res, next) => {
    dobj={}
    dobj.allocatedto = req.params.uname;
    service1.allocateSystem(dobj).then((allocationDetails) => {
        res.status(200)
        res.json(allocationDetails)
    }).catch((err) => {
        next(err)
    })
})


//Routing for searching a single user
routing.get("/search/:name", (req, res, next) => {
    let user = req.params.name;
    service1.searchUser(user).then((searchDetails) => {
        res.status(200)
        res.json(searchDetails)
    }).catch((err) => {
        next(err)
    })
})

//Routing for searching all users
routing.get("/searchall", (req, res, next)=> {
    service1.searchAll().then((allDetails) => {
        res.status(200)
        res.json(allDetails)
    }).catch((err) => {
        next(err)
    })
})

//Routing for updating device
routing.get("/requests/:uuname", (req, res, next) => {
    let udet = req.params.uuname
    service1.updateSystem(udet).then((updateDetails) => {
        res.status(200)
        res.json(updateDetails)
    }).catch((err) => {
        next(err)
    })
})

//Routing for deleting allocation
routing.get("/delete/:uuuname", (req, res, next) => {
    let uudet = req.params.uuuname
    service1.deleteAllocation(uudet).then((deletedRecord) => {
        res.status(200)
        res.json(deletedRecord)
    }).catch((err) => {
        next(err)
    })
})

//Routing for creating record
routing.get("/send/:userdata", (req, res, next) => {
    let userdata = req.params.userdata
    service1.createRequest(userdata).then((data) => {
        res.json({ message: "Account Created Successfully" })
    }).catch((err) => {
        next(err)
    })
})

//Routing for viewing all requests
routing.get("/viewall", (req, res, next)=> {
    service1.viewAll().then((allDetails) => {
        res.status(200)
        res.json(allDetails)
    }).catch((err) => {
        next(err)
    })
})

//Routing for rejecting the request
routing.get("/reject/:userd", (req, res, next)=> {
    let userd = req.params.userd
    service1.rejectreq(userd).then((rejreq) => {
        res.status(200)
        res.json(rejreq)
    }).catch((err) => {
        next(err)
    })
})







module.exports = routing;