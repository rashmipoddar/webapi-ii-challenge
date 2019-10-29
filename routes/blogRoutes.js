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
      res.status(500).send({error: 'The comments information could not be retrieved.'});
    })
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  // console.log(id);

  db.findById(id)
    .then(response => {
      // console.log(response);
      if(response.length === 0) {
        res.status(404).send({error: 'The post with the specified ID does not exist.'});
      } else {
        db.remove(id)
          .then(deleteResponse => {
            // console.log(deleteResponse);
            res.status(200).send(response);
          })
          .catch(error => {
            // console.log(error);
            res.status(500).send({error: 'The post could not be removed.'});
          })
      }
    })
    .catch(error => {
      // console.log(error);
      res.status(500).send({error: 'The post could not be removed.'});
    })
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const updatedBlog = req.body;
  console.log(updatedBlog);

  db.findById(id)
    .then(response => {
      // console.log(response);
      if(response.length === 0) {
        res.status(404).send({error: 'The post with the specified ID does not exist.'});
      } else {
        if (!req.body.title || !req.body.contents) {
          res.status(400).send({error: 'Please provide title and contents for the post.'});
        } else {
          db.update(id, updatedBlog)
          .then(updateResponse => {
            console.log(updateResponse);
            res.status(200).send(updatedBlog);
          })
          .catch(error => {
            console.log(error);
            res.status(500).send({error: 'The post information could not be modified.'});
          })
        }
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({error: 'The post information could not be modified.'});
    })
})

module.exports = router;