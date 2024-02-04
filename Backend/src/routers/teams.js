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
    if (req.body.employee_name) {
        Members.updateOne({ _id: req.params.id }, { employee_name: req.body.employee_name }, { runValidators: true })
            .then(function (updatedData) {
                var data = { message: "success", data: updatedData };
                return res.status(200).json(data);
            })
            .catch(function (err) {
                return res.status(400).json({ error: "Update failed" });
            });
    }
    if (req.body.employee_id) {
        Members.updateOne({ _id: req.params.id }, { employee_id: parseInt(req.body.employee_id) }, { runValidators: true })
            .then(function (updatedData) {
                var data = { message: "success", data: updatedData };
                return res.status(200).json(data);
            })
            .catch(function (err) {
                return res.status(400).json({ error: "Update failed" });
            });
    }
    if (req.body.technology_name) {
        Members.updateOne({ _id: req.params.id }, { technology_name: req.body.technology_name }, { runValidators: true })
            .then(function (updatedData) {
                var data = { message: "success", data: updatedData };
                return res.status(200).json(data);
            })
            .catch(function (err) {
                return res.status(400).json({ error: "Update failed" });
            });
    }
    if (req.body.experience) {
        Members.updateOne({ _id: req.params.id }, { experience: req.body.experience }, { runValidators: true })
            .then(function (updatedData) {
                var data = { message: "success", data: updatedData };
                return res.status(200).json(data);
            })
            .catch(function (err) {
                return res.status(400).json({ error: "Update failed" });
            });
    }

});

membersRouter.get('/tracker/members/display', auth, async (req, res) => {
    let query = {};
    let sort = {}
    if (req.query.tech) {
        query.technology_name = req.query.tech;
    }
    if (req.query.experience) {
        query.experience = { $gte: parseInt(req.query.experience) }
    }
    if (req.query.tech && req.query.experience) {
        query = {
            $or: [
                { technology_name: req.query.tech },
                { experience: { $gte: parseInt(req.query.experience) } }
            ]
        }
        sort = { experience: -1 }
    }

    const members = await Members.find(query).sort(sort);
    res.status(200).json(members);
});

membersRouter.delete('/tracker/members/delete/:id', auth, async (req, res) => {
    const members = await Members.deleteOne({ _id: req.params.id });
    res.status(200).json(members);
});
module.exports = membersRouter;

