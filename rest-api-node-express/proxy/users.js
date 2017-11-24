'use strict';
const request = require('request');
const services = require('../config/services');


module.exports.getUserById = (id) => {
    let promise = new Promise((resolve, reject) => {
        request.get(services.clients, (err, resService, body) => {
            if (err) {
                reject(err);
            } else {
                let clients = JSON.parse(body).clients;
                let clientFiltered = clients.filter((item) => {
                    return item.id == id;
                });
                resolve(clientFiltered);
            }
        });
    });

    return promise;
}

module.exports.getUserByName = (name) => {
    let promise = new Promise((resolve, reject) => {
        request.get(services.clients, (err, resService, body) => {
            if (err) {
                reject(err);
            } else {
                let clients = JSON.parse(body).clients;
                let clientFiltered = clients.filter((item) => {
                    return item.name == name;
                });
                resolve(clientFiltered);
            }
        });
    });

    return promise;
}

module.exports.getUserByPolicy = (policyId) => {
    let promise = new Promise((resolve, reject) => {
        request.get(services.policies, (err, resService, body) => {
            let policyFiltered = '';
            if (err) {
                reject(err);
            } else {
                let policies = JSON.parse(body).policies;
                policyFiltered = policies.filter((item) => {
                    return item.id == policyId;
                });
                request.get(services.clients, (err, resService, body) => {
                    if (err) {
                        reject(err);
                    } else {
                        let clients = JSON.parse(body).clients;
                        let clientFiltered = clients.filter((item) => {
                            return item.id == policyFiltered[0].clientId;
                        });
                        resolve(clientFiltered);
                    }
                });
            }
        });
    });

    return promise;
}

module.exports.getRole = (userId) => {
    let promise = new Promise((resolve, reject) => {
        this.getUserById(userId).then((user) => { resolve(user[0].role); }, (error) => { reject(error) });
    });

    return promise;
}

module.exports.Roles = {
    User: "users",
    Admin: "admin"
}