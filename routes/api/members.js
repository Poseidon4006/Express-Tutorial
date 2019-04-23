const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../Members');

// Get all members
router.get('/', (req, res) => {
    res.json(members);
});

// Get single member by id
router.get('/:id', (req, res) => {
    // res.send(req.params.id); // check if searched 'id' from the request url is returned or not
    // Boolean value to check if object with particular id is present
    const found = members.some(member => member.id === parseInt(req.params.id));  

    if(found) {
        res.json(members.filter( member => member.id === parseInt(req.params.id)));

    } else {
        res.status(400);
        res.json({Msg : `There is no member with id ${req.params.id}`});
    }
});

// Get single member by name
router.get('/names/:name', (req, res) => {
    // Boolean value to check if object with particular name exist
    const found = members.some(member => member.name === req.params.name);  

    if(found) {
        res.json(members.filter( member => member.name ===(req.params.name)));

    } else {
        res.status(400);
        res.json({Msg : `There is no member with name ${req.params.name}`});
    }
});

// Create a member
router.post('/', (req,res) => {
    // res.send(req.body); // Just to parse the req.body and display
    // new member details
    const newMember = {
        id : uuid.v4(),
        name : req.body.name,
        email : req.body.email,
        status :"active"
    }

    if(!newMember.name || !newMember.email){
        return res.status(400).json({ msg: "Kindly enter name and email"});
    }

    members.push(newMember);
    res.json(members);
});

// Update a member
router.put('/:id', (req, res) => {
    // Boolean value to check if object with particular id is present
    const found = members.some(member => member.id === parseInt(req.params.id));  

    if(found) {
        const newMemberInfo = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = newMemberInfo.name ? newMemberInfo.name : member.name;
                member.email = newMemberInfo.email ? newMemberInfo.email : member.email;
                res.json({"Msg": "Member info updated", member});
            }
        } );
    } else {
        res.status(400);
        res.json({Msg : `There is no member with id ${req.params.id}`});
    }
});


// Delete member
router.delete('/:id', (req, res) => {
    // Boolean value to check if object with particular id is present
    const found = members.some(member => member.id === parseInt(req.params.id));  

    if(found) {
        res.json({ msg :`Member deleted with member id ${req.params.id}`,
        members : members.filter( member => member.id !== parseInt(req.params.id))});

    } else {
        res.status(400);
        res.json({Msg : `There is no member with id ${req.params.id}`});
    }
});

module.exports = router;