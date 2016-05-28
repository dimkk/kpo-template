/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
'use strict';
var thing_model_1 = require('../api/thing/thing.model');
var user_model_1 = require('../api/user/user.model');
console.log('in seedOnce1');
thing_model_1["default"].find().exec()
    .then(function (entity) {
    console.log(JSON.stringify(entity));
    if (entity.length > 0) {
        return;
    }
    else {
        thing_model_1["default"].find({}).remove()
            .then(function () {
            thing_model_1["default"].create({
                name: 'Development Tools',
                info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
                    'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
                    'Stylus, Sass, and Less.'
            }, {
                name: 'Server and Client integration',
                info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
                    'AngularJS, and Node.'
            }, {
                name: 'Smart Build System',
                info: 'Build system ignores `spec` files, allowing you to keep ' +
                    'tests alongside code. Automatic injection of scripts and ' +
                    'styles into your index.html'
            }, {
                name: 'Modular Structure',
                info: 'Best practice client and server structures allow for more ' +
                    'code reusability and maximum scalability'
            }, {
                name: 'Optimized Build',
                info: 'Build process packs up your templates as a single JavaScript ' +
                    'payload, minifies your scripts/css/images, and rewrites asset ' +
                    'names for caching.'
            }, {
                name: 'Deployment Ready',
                info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
                    'and openshift subgenerators'
            });
        });
        user_model_1["default"].find({}).remove()
            .then(function () {
            user_model_1["default"].create({
                provider: 'local',
                name: 'Test User',
                email: 'test@example.com',
                password: 'test'
            }, {
                provider: 'local',
                role: 'admin',
                name: 'Admin',
                email: 'admin@example.com',
                password: 'admin'
            })
                .then(function () {
                console.log('finished populating users');
            });
        });
    }
});
