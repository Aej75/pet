const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')

const AdminBroMongoose = require('@admin-bro/mongoose')



AdminBro.registerAdapter(AdminBroMongoose)
const mongoose = require('mongoose');
const User = require('../../model/User');
const Pet = require('../../model/Pet');
const promotion = require('../../model/promotion');
const requestedpets = require('../../model/requested_pet');



const adminBro = new AdminBro({
    // databases: [mongoose],
    rootPath: '/admin',
    resources: [
        {
            resource: User,
            options: {
                parent: {
                    name: 'Database',
                    icon: 'fas fa-database',
                },
            },
        },
        {
            resource: Pet,
            options: {
                parent: {
                    name: 'Database',
                    icon: 'fas fa-database',
                },
            },
        },
        {
            resource: promotion,
            options: {
                parent: {
                    name: 'Database',
                    icon: 'fas fa-database',
                },
            },
        }, {
            resource: requestedpets,
            options: {
                parent: {
                    name: 'Database',
                    icon: 'fas fa-database',
                },
            },
        },
    ],


})

const router = AdminBroExpress.buildRouter(adminBro)
module.exports = router;
