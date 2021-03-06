/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 * POST    /api/things              ->  create
 * GET     /api/things/:id          ->  show
 * PUT     /api/things/:id          ->  update
 * DELETE  /api/things/:id          ->  destroy
 */
'use strict';
var _ = require('lodash');
var thing_model_1 = require('./thing.model');
function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            // Warning: a promise was created in a handler but was not returned from it
            // https://github.com/petkaantonov/bluebird/blob/master/docs/docs/warning-explanations.md#warning-a-promise-was-created-in-a-handler-but-was-not-returned-from-it
            return res.status(statusCode).json(entity);
        }
    };
}
function saveUpdates(updates) {
    return function (entity) {
        var updated = _.merge(entity, updates);
        return updated.save()
            .then(function (updated) {
            return updated;
        });
    };
}
function removeEntity(res) {
    return function (entity) {
        if (entity) {
            return entity.remove()
                .then(function () {
                res.status(204).end();
            });
        }
    };
}
function handleEntityNotFound(res) {
    return function (entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}
function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}
// Gets a list of Things
function index(req, res) {
    console.log('99999');
    return thing_model_1["default"].find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}
exports.index = index;
// Gets a single Thing from the DB
function show(req, res) {
    return thing_model_1["default"].findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}
exports.show = show;
// Creates a new Thing in the DB
function create(req, res) {
    return thing_model_1["default"].create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}
exports.create = create;
// Updates an existing Thing in the DB
function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return thing_model_1["default"].findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}
exports.update = update;
// Deletes a Thing from the DB
function destroy(req, res) {
    return thing_model_1["default"].findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}
exports.destroy = destroy;
