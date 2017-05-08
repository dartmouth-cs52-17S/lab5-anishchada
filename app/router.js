import { Router } from 'express';
import * as Posts from './controllers/post_controller';

const router = Router();

// router.get('/', (req, res) => {
//   res.json({ message: 'welcome to our blog api!' });
// });
//
// router.get('/posts', (req, res) => {
//   res.json({ message: 'welcome to our blog api!' });
// });
//
// router.get('/posts/:id', (req, res) => {
//   res.json({ message: 'welcome to this post!' });
// });
//
// router.put('/posts/:id', (req, res) => {
//   res.json({ message: 'Post Updated!' });
// });
//
// router.delete('/posts/:id', (req, res) => {
//   res.json({ message: 'Post deleted!' });
// });
//
// router.post('/posts', (req, res) => {
//   res.json({ message: 'Post created!' });
// });

router.route('/posts/:id')
  .get(Posts.getPost)
  .put(Posts.updatePost)
  .delete(Posts.deletePost);

router.route('/posts')
  .post(Posts.createPost)
  .get(Posts.getPosts);

// your routes will go here

export default router;
