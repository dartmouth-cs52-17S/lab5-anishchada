import Post from '../models/post_model';

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.cover_url = req.cover_url;
  post.save()
    .then((result) => {
      res.json({ message: 'Post created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPosts = (req, res) => {
  Post.find({})
    .then((result) => {
      res.json(result.map((post) => {
        return { id: post._id, title: post.title, tags: post.tags, cover_url: post.cover_url };
      }),
    );
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Referenced http://mongoosejs.com/docs/api.html for findByIdAndRemove method documentation

export const deletePost = (req, res) => {
  Post.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.json({ message: 'Post deleted!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const updatePost = (req, res) => {
  res.send('update a post here');
};
