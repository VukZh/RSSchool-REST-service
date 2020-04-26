const uuid = require('uuid');
const bcrypt = require('bcryptjs');

const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: String,
    login: String,
    password: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

// eslint-disable-next-line func-names
// eslint-disable-next-line space-before-function-paren
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 4);
  }
  next();
});

const User = model('User', userSchema);

module.exports = User;
