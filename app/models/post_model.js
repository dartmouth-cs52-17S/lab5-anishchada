import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const PostModelSchema = new Schema({
  title: String,

}, {
  toJSON: {
    virtuals: true,
  },
});

// create PostModel class from schema
const PostModel = mongoose.model('Post', PostModelSchema);


export default PostModel;
