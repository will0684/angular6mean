import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Issue from './models/issue';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

// Connects to the MongoDB database collection.
mongoose.connect('mongodb://localhost:27017/issues');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

app.use('/', router);

// Establishes which port the backend runs on.
app.listen(4000, () => console.log('Express server running on port 4000'));

// Fetches all documents.
router.route('/issues').get((req, res) => {
  Issue.find((err, issues) => {
    if (err)
      console.log(err);
    else
      res.json(issues);
  });
});

// Fetches a single document by _id.
router.route('/issue/:id').get((req, res) => {
  Issue.findById(req.params.id, (err, issue) => {
    if (err)
      console.log(err);
    else
      res.json(issue);
  });
});

// Adds a document.
router.route('/issues/add').post((req, res) => {
  let issue = new Issue(req.body);
  issue.save()
    .then(issue => {
      res.status(200).json({'issue': 'Added Successfully'});
    })
    .catch(err => {
      res.status(400).send('Failed to create new record');
    });
});

// Updates an existing document.
router.route('/issues/update/:id').post((req, res) => {
  Issue.findById(req.params.id, (err, issue) => {
    if (!issue)
      return new Error('Could not load document');
    else {
      issue.title = req.body.title;
      issue.responsible = req.body.responsible;
      issue.description = req.body.description;
      issue.severity = req.body.severity;
      issue.status = req.body.status;

      issue.save().then(issue => {
        res.json('Update Complete');
      }).catch(err => {
        res.status(400).send('Update failed');
      });
    }
  });
});

// Deletes a single document by _id.
router.route('/issues/delete/:id').get((req, res) => {
  Issue.findByIdAndRemove({_id: req.params.id }, (err, issue) => {
    if (err)
      res.json(err);
    else
      res.json('Removed Successfully');
  });
});