var Userdb = require('../model/model');

//create and save new user
exports.create = (req,res) => {
    //validate request
    if(!req.body){
        req.status(400),send({message : "Content can not be Empty!"});
        return;
    }
    //new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        status : req.body.status
    })
    //save user in db
    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/add-user')
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Somee Error Occurred while Create Operation"
            });
        });
}

//retrive and return all users/single users
exports.find = (req,res) => {
if(req.query.id){
    const id = req.query.id;

    Userdb.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message : "No User found with id="+id})
            }
            else{
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error retrieving User with id="+id})
        })
}
else{
    Userdb.find()
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        res.status(500).send({message : console.error.message || "Error Occured while Retriving User Info"})
    })
}
}

// Update a new identified user by userid
exports.update = (req,res) => {
    if(!req.body){
        return res
        .status(400)
        .send({message : "Data to Update cannot be Empty"})
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify : false })
        .then(data => {
        if(!data){
            res.status(404).send({message : `Cannot Update user with ${id}. May be User Not Found`})
        }
        else{
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({message : "Error Update User Information"})
    })
}

// Delete a user with specified userid in the request
exports.delete = (req,res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }
            else{
                res.send({
                    message : "User was Deleted Successfully"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message : "Could not Delete User with id="+id
            });
        });
}