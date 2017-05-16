import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  console.log('=================');
  console.log(user);
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const signin = (req, res, next) => {
  console.log(req.body);
  console.log(req.user);
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  if (!email || !password || !username) {
    return res.status(422).send('You must provide email and password');
  }

  // Adapted code from http://stackoverflow.com/questions/25232423/mongo-mongoose-check-if-an-item-exists to check for user and then create

  // User.findOne({ email })
  //   .then((result) => {
  //     if (result) {
  //       console.log(result);
  //       res.status(422).send('This email already exists');
  //     } else {
  //       console.log('Anish');
  //     }
  //     // res.json(result);
  //   })
  //   .catch((error) => {
  //     res.status(500).json({ error });
  //   });


  User.findOne({ email }, (err, UserEmail) => {
    if (err) {
      return res.status(422).send('ERROR ERROR ERROR');
    }

    if (!UserEmail) {
      console.log(UserEmail);
      console.log(req.email);
      console.log('Creating new account');

      const user = new User();
      user.email = email;
      user.password = password;
      user.username = username;
      user.save() // should i do a return here
        .then((result) => {
          return res.send({ token: tokenForUser(result) });
        })
        .catch((error) => {
          return res.status(500).json({ error });
        });
    } else {
      return res.status(422).send('This email already exists \n');
    }
  });
};
