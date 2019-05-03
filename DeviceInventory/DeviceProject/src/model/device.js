
const initialData = require("./data2.json")
const collection = require("../utilities/connection")
const collection2 = require("../utilities/connection2")
const collection3 = require("../utilities/connection3")


let model = {}

model.insertScript = () => {
    return collection2.getCollection().then((collection2) => {
        return collection2.deleteMany().then((data) => {
            return collection2.insertMany(initialData).then((response) => {
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

model.generateId = () => {
    return collection2.getCollection().then((collection2) => {
        return collection2.distinct("transactions.tid").then((tid) => {
            newId = Math.max(...tid)
            return newId > 0 ? newId + 1 : 1001
        })
    })
}


model.allocateSystem = (dobj) => {
    return collection3.getCollection().then((collection3) => {
        return collection3.deleteOne({username:dobj.allocatedto}).then((data) => {
            if(data.deletedCount==1){
                return collection2.getCollection().then((collection2) => {
                    return collection2.find({"status":0}).then((data) => {
                        console.log(data[0],"data")
                        if(data.length >0){
                            console.log("here")
                            let x = data[0].deviceid
                            console.log(x)
                            let obj = data[0]
                            return collection2.updateOne({deviceid:x}, {$set:{'status':1}}).then((data) => {
                                if(data.nModified>0){
                                    return collection2.updateOne({deviceid:x}, {$set:{'allocatedto':dobj.allocatedto}}).then((data) =>{
                                        if(data.nModified>0){
                                            console.log("abc")
                                            return collection.getCollection().then((collection) => {
                                                return collection.updateOne({"username":dobj.allocatedto}, {$set:{"sysid":x}}).then((data) => {
                                                if(data.nModified>0){
                                                    return true
                                                }
                                                else{
                                                    return null
                                                }
                                            })
                                        })
                                        }
                                        else{
                                            return null
                                        }
                                    })
                                    
                                }
                                else{
                                    return null
                                }
                            })
                        }
                    })
                })
            }
            else{
                return null
            }
        })
    })
}

model.searchUser = (user) => {
    return collection2.getCollection().then((collection2) => {
        return collection2.findOne({"allocatedto":user}).then((data) => {
            if(data){
                return data
            }
            else{
                return null
            }
        })
    })
}

model.searchAll = () => {
    return collection2.getCollection().then((collection2) => {
        return collection2.find({"status":1}).then((data) => {
            if(data){
                return data
            }
            else{
                return null
            }
        })
    })
}

model.updateSystem = (udet) => {
    return collection2.getCollection().then((collection2) => {
        return collection2.find({status:0}).then((data) => {
            if(data.length>0){
                let x = data[0].deviceid
                return collection2.updateOne({allocatedto:udet}, {$set:{'status':0}}).then((data) => {
                    if(data.nModified>0){
                        return collection2.updateOne({allocatedto:udet}, {$set:{'allocatedto':""}}).then((data) => {
                            if(data.nModified>0){
                                return collection2.updateOne({deviceid:x}, {$set:{'status':1}}).then((data) => {
                                    if(data.nModified>0){
                                        return collection2.updateOne({deviceid:x}, {$set:{'allocatedto':udet}}).then((data) => {
                                            if(data.nModified>0){
                                                return collection.getCollection().then((collection) => {
                                                    return collection.updateOne({'username':udet}, {$set:{'sysid':x}}).then((data) => {
                                                        if(data.nModified>0){
                                                            return true
                                                        }
                                                        else{
                                                            return false
                                                        }
                                                    })
                                                })
                                            }
                                            else{
                                                return false
                                            }
                                        })
                                    }
                                    else{
                                        return false
                                    }
                                })
                            }
                            else{
                                return false
                            }
                        })
                    }
                    else{
                        return false
                    }
                })
            }
            else{
                return false
            }
        })
    })
}

model.deleteAllocation = (uudet) => {
    console.log("inside delete model")
    return collection2.getCollection().then((collection2) => {
        console.log("inside delete model11")
        console.log(uudet)
        return collection2.updateOne({'allocatedto':uudet}, {$set:{'status':0}}).then((data) => {
            console.log("11",data)
            if(data.nModified>0){
                console.log("2")
                return collection2.updateOne({allocatedto:uudet}, {$set:{'allocatedto':""}}).then((data) => {
                    if(data.nModified>0){
                        return collection.getCollection().then((collection) => {
                            return collection.updateOne({"username":uudet}, {$set:{"sysid":0}}).then((data) => {
                                if(data.nModified>0){
                                    return true
                                }
                                else{
                                    return null
                                }
                            })
                        })
                    }
                    else{
                        return null
                    }
                })
            }
            else{
                return null
            }
        })
    })
}

model.getUser = (username) => {
    console.log(username);
    
    return collection.getCollection().then((collection) => {
        return collection.findOne({ username: username }, { _id: 0, username: 1, password: 1,role:1 })
            .then((data) => {
                return data
            })
    })
}

model.createRequest = (userdata) => {
    return collection3.getCollection().then((collection3) => {
        return collection3.create({"username":userdata}).then((data) => {
            if (data) {
                return true
            } else {
                return false
            }
        })
    })
}


model.viewAll = () => {
    return collection3.getCollection().then((collection3) => {
        return collection3.find().then((data) => {
            if(data){
                return data
            }
            else{
                return null
            }
        })
    })
}


model.rejectreq = (userd) =>{
    return collection3.getCollection().then((collection3) => {
        return collection3.deleteOne({username:userd}).then((data) => {
            if(data.deletedCount>0){
                return true
            }
            else{
                return null
            }
        })
    })
}


model.acceptreq = (userd) =>{
    return collection3.getCollection().then((collection3) => {
        return collection3.deleteOne({username:userd}).then((data) => {
            console.log("data",data)
            if(data.deletedCount==1){
                return model.allocateSystem(userd).then((data) => {
                    if(data==true){
                        return true
                    }
                    else{
                        return null
                    }
                })
            }
            else{
                return null
            }
        })
    })
}


module.exports = model