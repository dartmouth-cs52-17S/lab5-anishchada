import Post from '../models/post_model';

// The code for the createPost method was given to use by Tim in the assignment
// I used the Mongoose methods documentation to implement these controller methods
// I got some help from both Tim and Jon Gonzalez in implementing a few of these below controller functions

// This cleanposts method was given to us by Tim in the assignment

// const cleanPosts = (posts) => {
//   return posts.map((post) => {
//     return { id: post._id, title: post.title, tags: post.tags, cover_url: post.cover_url };
//   });
// };

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.cover_url = req.body.cover_url;
  post.save()
    .then((result) => {
      res.json({ message: 'Post created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Referenced http://mongoosejs.com/docs/api.html for find and the return. Used part of the cleanposts method directly implemented here

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

// Referenced http://mongoosejs.com/docs/api.html for findById

export const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((result) => {
      console.log(result);
      res.json(result);
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

// Referenced http://mongoosejs.com/docs/api.html for findById and Save

export const updatePost = (req, res) => {
  Post.findById(req.params.id)
    .then((result) => {
      result.title = req.body.title;
      result.tags = req.body.tags;
      result.content = req.body.content;
      result.cover_url = req.body.cover_url;
      return result.save();
    }).then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
