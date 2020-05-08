/**
 * API ROUTE FOR PERSONS
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
const collection = dbconfig.database.collections.persons;

// Express Router
var router = express.Router();



/* GET ALL */
router.get('/', (req, res, next) => {
    // HTTP Request Callback Function

    MongoClient.connect(url, (err, client) => {
        // MongoDB Connect Callback Function

        assert.equal(null, err); // Checks if there's no error
        const db = client.db(dbName);

        // MongoDB Query -> find persons sort by id ascending and makes an array
        db.collection(collection).find().sort({ _id: 1 }).toArray((err, result) => {
            // MongoDB Query Callback Function

            if (err) return console.log(err) // Logs any error
            res.json(result); // Send result
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

        // MongoDB Query -> find one person creates ObjectID from string given in the id request parameters
        db.collection(collection).findOne({ _id: ObjectID.createFromHexString(req.params.id) }, (err, result) => {
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

    // retrieve person
    var person = req.body;

    // Checks for data
    if (!isValid(person)) {
        res.status(400);
        res.json({ "msg": "Données invalides." });
    } else {

        MongoClient.connect(url, (err, client) => {
            // MongoDB Connect Callback Function

            assert.equal(null, err); // Checks if there's no error
            const db = client.db(dbName);

            // MongoDB Query -> find one person creates ObjectID from string given in the id request parameters
            db.collection(collection).insertOne(person,
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

    var person = req.body;


    // Checks for data
    if (!isValid(person)) {
        res.status(400);
        res.json({ "msg": "Données invalides." });
    } else {
        MongoClient.connect(url, (err, client) => {
            // MongoDB Connect Callback Function

            assert.equal(null, err); // Checks if there's no error
            const db = client.db(dbName);

            // MongoDB Query -> find one person creates ObjectID from string given in the id request parameters
            db.collection(collection).updateOne({_id: ObjectID.createFromHexString(req.params.id)}, {$set : person},
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



/**
 * Function used to validate if the field are present and correct.
 * @param { Person } person the person to validate.
 * @return true if the person is valid
 */
function isValid(person){
    if (!(person.firstName) || !(person.lastName || !(person.birthDate) || !(person.email) || !(person.phoneNumbrer))) {
        return false;
    }
    return true;
}

module.exports = router;