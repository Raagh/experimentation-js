'use strict';
const express = require("express");
const router = express.Router();
const userService = require('../proxy/users');
const policiesService = require('../proxy/policies');
const Roles = require('../proxy/users').Roles;


router.get('/getClientDataById', (req, res) => {
    let userId = req.query.userId;
    let clientId = req.query.clientId;
    userService.getRole(userId).then((userRole) => {
        if (userRole == Roles.Admin || userRole == Roles.User) {
            userService.getUserById(clientId).then((user) => {
                res.send(user);
            }, (error) => {
                res.send('An error ocurred while retreaving user data.');
            });
        } else {
            res.send('The user doesnt have the permissions to perform this operation.');
        }
    });
});

router.get('/getClientDataByName', (req, res) => {
    let userId = req.query.userId;
    let clientName = req.query.clientName;
    userService.getRole(userId).then((userRole) => {
        if (userRole == Roles.Admin || userRole == Roles.User) {
            userService.getUserByName(clientName).then((user) => {
                res.send(user);
            }, (error) => {
                res.send('An error ocurred while retreaving user data.');
            });
        } else {
            res.send('The user doesnt have the permissions to perform this operation.');
        }
    });
});

router.get('/getClientByPolicyNumber', (req, res) => {
    let userId = req.query.userId;
    let policyId = req.query.policyId;
    userService.getRole(userId).then((userRole) => {
        if (userRole == Roles.Admin) {
            userService.getUserByPolicy(policyId).then((user) => {
                res.send(user);
            }, (error) => {
                res.send('An error ocurred while retreaving user data.');
            });
        } else {
            res.send('The user doesnt have the permissions to perform this operation.');
        }
    });
});

router.get('/getPoliciesByClientName', (req, res) => {
    let userId = req.query.userId;
    let clientName = req.query.clientName;
    userService.getRole(userId).then((userRole) => {
        if (userRole == Roles.Admin) {
            policiesService.getPoliciesByUserName(clientName).then((policies) => {
                res.send(policies);
            }, (error) => {
                res.send('An error ocurred while retreaving policies data.');
            });
        } else {
            res.send('The user doesnt have the permissions to perform this operation.');
        }
    });
});


module.exports = router;