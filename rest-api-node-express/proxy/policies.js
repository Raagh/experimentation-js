'use strict';
const request = require('request');
const services = require('../config/services');

module.exports.getPoliciesByUserName = (userName) => {
    let promise = new Promise((resolve, reject) => {
        let clientFiltered = '';
        request.get(services.clients, (err, resService, body) => {
            if (err) {
                reject(err);
            } else {
                let clients = JSON.parse(body).clients;
                clientFiltered = clients.filter((item) => {
                    return item.name == userName;
                });
                request.get(services.policies, (err, resService, body) => {
                    if (err) {
                        reject(err);
                    } else {
                        let policies = JSON.parse(body).policies;
                        let policiesFiltered = policies.filter((item) => {
                            return item.clientId == clientFiltered[0].id;
                        });
                        resolve(policiesFiltered);
                    }
                });
            }
        });
    });

    return promise;
}