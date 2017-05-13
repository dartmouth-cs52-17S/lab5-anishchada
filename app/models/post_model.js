import mongoose, { Schema } from 'mongoose';

// PostSchema based on PollSchema code from short assignment 7

// create a PostSchema with a title field
const PostModelSchema = new Schema({
  title: String,
  tags: String,
  content: String,
  cover_url: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  toJSON: {
    virtuals: true,
  },
});

// create PostModel class from schema
const PostModel = mongoose.model('Post', PostModelSchema);

export default PostModel;
