import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';

// The framework for the router shortcut was based on code provided to us by Tim in the assignment

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
  .put(requireAuth, Posts.updatePost)
  .delete(requireAuth, Posts.deletePost);

router.route('/posts')
  .post(requireAuth, Posts.createPost)
  .get(Posts.getPosts);

router.post('/signin', requireSignin, UserController.signin);
router.post('/signup', UserController.signup);

// your routes will go here

export default router;
