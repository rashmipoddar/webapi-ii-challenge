const express = require('express');

const blogRoutes = require('./routes/blogRoutes');

const server = express();

server.use(express.json());
server.use('/api/blogs', blogRoutes);



server.get('/', (req, res) => 
  res.status(200).send('Go to /blogs')
);


server.listen(5000, () => 
  console.log('Server running on port 5000')
);