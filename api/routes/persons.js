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
    var validMessage = isPersonValid(person);
    // Checks for data
    if (validMessage.length > 17) {
        res.status(400);
        res.json({ "msg": validMessage });
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

/* PUT A TASK TO A PERSON */
router.put('/task/:id', function (req, res, next) {
    // HTTP Request Callback Function

    var task = req.body;
    task.completed = false;

    var validMessage = isTaskValid(task);
    // Checks for data
    if (validMessage.length > 18) {
        res.status(400);
        res.json({ "msg": validMessage });
    } else {
        MongoClient.connect(url, (err, client) => {
            // MongoDB Connect Callback Function

            assert.equal(null, err); // Checks if there's no error
            const db = client.db(dbName);

            // MongoDB Query -> find one person creates ObjectID from string given in the id request parameters
            db.collection(collection).updateOne({ _id: ObjectID.createFromHexString(req.params.id) }, { $push: { tasks: task } },
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



/* PUT MORE THAN ONE TASK TO A PERSON */
router.put('/tasks/:id', function (req, res, next) {
    // HTTP Request Callback Function

    var tasks = req.body;
    console.log(tasks);
    var valid = true;
    tasks.forEach(task => {
        var validMessage = isTaskValid(task);
        if (validMessage.length > 18) {
            res.status(400);
            res.json({ "msg": "One of the tasks is invalid." });
            valid = false;
            return;
        }
    });

    // Checks for data
    if (valid) {
        MongoClient.connect(url, (err, client) => {
            // MongoDB Connect Callback Function

            assert.equal(null, err); // Checks if there's no error
            const db = client.db(dbName);

            // MongoDB Query -> find one person creates ObjectID from string given in the id request parameters
            db.collection(collection).update({ _id: ObjectID.createFromHexString(req.params.id) }, { $push: { tasks: { $each: tasks } } },
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
    if (req.params.id === person._id) {
        delete person._id;
    } else {
        res.status(400);
        res.json({ 'msg': 'Error modifying the person, try again.' });
    }

    var validMessage = isPersonValid(person);
    // Checks for data
    if (validMessage.length > 17) {
        res.status(400);
        res.json({ "msg": validMessage });
    } else {

        MongoClient.connect(url, (err, client) => {
            // MongoDB Connect Callback Function

            assert.equal(null, err); // Checks if there's no error
            const db = client.db(dbName);

            // MongoDB Query -> find one person creates ObjectID from string given in the id request parameters
            db.collection(collection).updateOne({ _id: ObjectID.createFromHexString(req.params.id) }, { $set: person },
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


/* Update A TASK TO A PERSON */
router.put('/updatetask/:id', function (req, res, next) {
    // HTTP Request Callback Function

    var task = req.body;
    task.completed = false;

    var validMessage = isTaskValid(task);
    // Checks for data
    if (validMessage.length > 18) {
        res.status(400);
        res.json({ "msg": validMessage });
    } else {
        MongoClient.connect(url, (err, client) => {
            // MongoDB Connect Callback Function

            assert.equal(null, err); // Checks if there's no error
            const db = client.db(dbName);

            // MongoDB Query -> find one person creates ObjectID from string given in the id request parameters
            db.collection(collection).updateOne({ "tasks._id": ObjectID.createFromHexString(req.params.id) }, { $set: { "task.$": task } },
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
   * @return 'A person requires'
   */
  function isPersonValid(person) {

    var returnMessage = 'A person requires';

    if (!(person.firstName)) {
      returnMessage += ' a first name,'
    }
    if (!(person.lastName)) {
      returnMessage += ' a last name,'
    }


    if (!(person.birthDate)) {
      returnMessage += ' a date of birth,'
    } else if (new Date(person.birthDate).getTime() > Date.now()) {
      returnMessage += ' a date of birth lower than the current date,'
    }

    if (!(person.email)) {
      returnMessage += ' an email,'
      // https://www.w3resource.com/javascript/form/email-validation.php
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(person.email))){
      returnMessage += ' a valid email,'
    }

    if (!(person.phoneNumber)) {
      returnMessage += ' a phone number,'
      // https://www.w3resource.com/javascript/form/phone-no-validation.php
    } else if (!(person.phoneNumber.match(
        /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/))){
      returnMessage += ' a XXX-XXX-XXXX formatted phone number.'
    }
    if (returnMessage.endsWith(',')) {
      returnMessage = returnMessage.slice(0, -1) + '.';
    }
    return returnMessage;
  }
/**
 * Used to validate a task
 * 
 * @param {*} task the task to validate
 */
function isTaskValid(task) {
    var returnMessage = 'A task requires a ';
    if (!(task.title)) {
        returnMessage += 'title,';
    }
    if (!(task.description)) {
        returnMessage += ' description.';
    }
    if (returnMessage.endsWith(',')) {
        returnMessage = returnMessage.slice(0, -1) + '.';
    }
    return returnMessage;
}

module.exports = router;