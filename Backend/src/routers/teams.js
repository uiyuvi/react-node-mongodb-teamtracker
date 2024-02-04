const express = require("express");
const auth = require('../middlewares/auth');
const Members = require('../mongoose/models/members');
const Teams = require('../mongoose/models/teams');

//setting up router for teams
const membersRouter = new express.Router();

//code goes here for endpoints


membersRouter.post('/tracker/members/add', auth, (req, res) => {
    console.log("add member", req.body)

    Members.find({ employee_id: req.body.employee_id, technology_name: req.body.technology_name }, function (err, data) {
        console.log('inside find member', req.body.employee_name)
        if (err) {
            console.log('error')
            return res.status(400).json({ error: err });
        }
        if (data && data.length > 0) {
            console.log('user with same name and technology exist')
            return res.status(400).json({ error: "Member with same team already exists" });
        }
        console.log('about to create', req.body.employee_name)
        Members.create(req.body, function (error, createdData) {
            if (error) {
                return res.status(400).json({ error: err });
            }
            Teams.create({ name: req.body.technology_name }, function (err, data) {
                if (err) {
                    console.log('error ignore');
                }
            })
            return res.status(201).json("created");
        })
    });
});

membersRouter.get('/tracker/technologies/get', auth, async (req, res) => {
    const teams = await Teams.find();
    res.status(200).json(teams);
});

membersRouter.post('/tracker/technologies/add', auth, async (req, res) => {
    Teams.create({ name: req.body.technology_name }, function (err, data) {
        if (err) {
            console.log('error ignore');
            return res.status(400).json({ error: err });
        }
        return res.status(201).json("created");
    })
});

membersRouter.delete('/tracker/technologies/remove/:name', auth, async (req, res) => {
    const teams = await Teams.deleteOne({ name: req.params.name });
    const members = await Members.deleteMany({ technology_name: req.params.name });
    res.status(200).json([teams, members]);
});

membersRouter.patch('/tracker/members/update/:id', auth, async (req, res) => {
    let updatedResponse;
    if(req.body.employee_name){
        updatedResponse = await Members.updateOne({ _id: req.params.id }, { employee_name: req.body.employee_name });
    }
    if(req.body.employee_id){
        updatedResponse = await Members.updateOne({ _id: req.params.id }, { employee_id: req.body.employee_id });
    }
    return res.status(200).json(updatedResponse);
});
module.exports = membersRouter;

