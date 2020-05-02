/**
 * API ROUTE FOR TASKS
 */

// Dependencies
var express = require('express');
var assert = require('assert');

// MongoDB Client
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var dbconfig = require('../dbconfig');

// DB info
const url = dbconfig.database.uri;
const dbName = dbconfig.database.dbName;
const collection = dbconfig.database.collections.tasks;

// Express Router
var router = express.Router();

/* GET ALL */
router.get('/', (req, res, next) => {
    // HTTP Request Callback Function

    MongoClient.connect(url, (err, client) => {
        // MongoDB Connect Callback Function

        assert.equal(null, err); // Checks if there's no error
        const db = client.db(dbName);

        // MongoDB Query -> find tasks sort by id ascending and makes an array
        db.collection(collection).find().sort({ _id: 1 }).toArray((err, result) => {
            // MongoDB Query Callback Function

            if (err) return console.log(err) // Logs any error
            res.json(result); // Send result
        });
        client.close(); // Close connection
    });
});

/* GET USING PERSONS ID */
router.get('/person/:person_id', (req, res, next) => {
    // HTTP Request Callback Function

    MongoClient.connect(url, (err, client) => {
        // MongoDB Connect Callback Function

        assert.equal(null, err); // Checks if there's no error
        const db = client.db(dbName);

        var person_id = null
        if (req.params.person_id !== undefined) {
            if (req.params.person_id.toString().length === 12) {
                person_id = ObjectID.createFromHexString(req.params.person_id);
            }
        }
        // MongoDB Query -> find tasks using person_id sort by id ascending and makes an array
        db.collection(collection).find({ person_id: person_id }).sort({ _id: 1 }).toArray((err, result) => {
            // MongoDB Query Callback Function

            if (err) return console.log(err) // Logs any error
            res.json(result); // Send results
        });
        client.close(); // Close connection
    });

});

/* GET ONE */
router.get('/:id', (req, res, next) => {
    // HTTP Request Callback Function

    MongoClient.connect(url, (err, client) => {
        // MongoDB Connect Callback Function

        assert.equal(null, err); // Checks if there's no error
        const db = client.db(dbName);

        var person_id = null
        if (req.params.person_id !== undefined) {
            if (req.params.person_id.toString().length === 12) {
                person_id = ObjectID.createFromHexString(req.params.person_id);
            }
        }
        // MongoDB Query -> find one task creates ObjectID from string given in the id request parameters
        db.collection(collection).findOne({ _id: person_id }, (err, result) => {
            // MongoDB Query Callback Function

            if (err) return console.log(err) // Logs any error
            res.json(result); // Send results
        });
        client.close(); // Close connection
    });

});

/* POST */
router.post('/', (req, res, next) => {
    // HTTP Request Callback Function

    // retrieve task
    var task = req.body;

    // Checks for data
    if (!(task.title) || !(task.description)) {
        res.status(400);
        res.json({ "msg": "Données invalides." });
    } else {
        task.completed = false;


        MongoClient.connect(url, (err, client) => {
            // MongoDB Connect Callback Function

            assert.equal(null, err); // Checks if there's no error
            const db = client.db(dbName);

            // MongoDB Query -> find one task creates ObjectID from string given in the id request parameters
            db.collection(collection).insertOne(task,
                (err, result) => {
                    // MongoDB Query Callback Function

                    if (err) return console.log(err)
                    console.log(result);
                    res.json(result);
                });
            client.close(); // Close connection
        });
    }
});

/* PUT */
router.put('/:id', function (req, res, next) {
    // HTTP Request Callback Function

    var task = req.body;

    if (!(task.title) || !(task.description) || !(task.completed)) {
        res.status(400);
        res.json({ "msg": "Données invalides." });
    } else {
        MongoClient.connect(url, (err, client) => {
            // MongoDB Connect Callback Function

            assert.equal(null, err); // Checks if there's no error
            const db = client.db(dbName);

            // MongoDB Query -> find one task creates ObjectID from string given in the id request parameters
            db.collection(collection).updateOne({ _id: ObjectID.createFromHexString(req.params.id) }, { $set: task },
                (err, result) => {
                    // MongoDB Query Callback Function

                    if (err) return console.log(err)
                    console.log(result);
                    res.json(result);
                });
            client.close(); // Close connection
        });
    }
});

/* DELETE */
router.delete('/:id', function (req, res, next) {
    // HTTP Request Callback Function

    MongoClient.connect(url, function (err, client) {
        // MongoDB Connect Callback Function

        assert.equal(null, err);
        const db = client.db(dbName);

        db.collection(collection).deleteOne({ _id: ObjectID.createFromHexString(req.params.id) },
            (err, result) => {
                // MongoDB Query Callback Function

                if (err) return console.log(err)
                res.json(result);
            })

        client.close(); // Close connection
    });
});

module.exports = router;