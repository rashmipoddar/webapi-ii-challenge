const router = require('express').Router();

const db = require('../data/db');

router.post('/', (req, res) => {
  const blog = req.body;
  if (!req.body.title || !req.body.contents) {
    res.status(400).send({error: 'Please provide title and contents for the post.'});
  } else {
    db.insert(blog)
    .then(response => {
      // console.log(response);
      res.status(201).send(blog);
    })
    .catch(error => {
      // console.log(error);
      res.status(500).send({error: 'There was an error while saving the post to the database'});
    })
  }
});

router.post('/:id/comments', (req, res) => {
  const comment = req.body;
  console.log(comment);



});

router.get('/', (req, res) => {
  db.find()
    .then(response => {
      // console.log(response);
      res.status(200).send(response);
    })
    .catch(error => {
      // console.log(error);
      res.status(500).send({error: 'The posts information could not be retrieved.'});
    })
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  // console.log(id);

  db.findById(id)
    .then(response => {
      // console.log(response);
      if(response.length === 0) {
        res.status(404).send({message: 'The post with the specified ID does not exist.'});
      } else {
        res.status(200).send(response); 
      }      
    })
    .catch(error => {
      // console.log(error);
      res.status(500).send({error: 'The post information could not be retrieved.'})
    })
});

router.get('/:id/comments', (req, res) => {
  const id = req.params.id;
  // console.log(id);
  
  db.findById(id) 
    .then(response => {
      // console.log(response);
      if(response.length === 0) {
        res.status(404).send({error: 'The post with the specified ID does not exist.'});
      } else {
        db.findPostComments(id)
          .then(response => {
            // console.log(response);
            res.status(200).send(response);
          })
          .catch(error => {
            // console.log(error);
            res.status(500).send({error: 'The comments information could not be retrieved.'});
          })
      }
    })
    .catch(error => {
      // console.log(error);
      res.status().send({error: 'The comments information could not be retrieved.'});
    })
});


module.exports = router;