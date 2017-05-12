import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// UserModelSchema based on PollSchema and PostSchema code from short assignment 7 and Lab 5 part 1
// Referenced https://www.npmjs.com/package/bcrypt

// create a UserModelSchema with a title field

const saltRounds = 10;

const UserModelSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
}, {
  toJSON: {
    virtuals: true,
  },
});

UserModelSchema.set('toJSON', {
  virtuals: true,
});

// Adapted code from http://stackoverflow.com/questions/14588032/mongoose-password-hashing (link provided in assignment) for this function

UserModelSchema.pre('save', function beforeYourModelSave(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  const user = this;

  // todo: do stuff here

  if (!user.isModified('password')) return next();

  // From example at https://www.npmjs.com/package/bcrypt

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      return next();
    });
    return next();
  });

  // when done run the next callback with no arguments
  // call next with an error if you encounter one
  return next();
});

// This code is from http://stackoverflow.com/questions/14588032/mongoose-password-hashing for this component

UserModelSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    } else {
      return callback(null, isMatch);
    }
  });
};

// create UserModel class from schema

const UserModel = mongoose.model('User', UserModelSchema);

export default UserModel;
