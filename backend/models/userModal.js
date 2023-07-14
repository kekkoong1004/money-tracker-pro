const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
      trim: true,
      minLength: [8, 'Minimum 8 letters for a username'],
      maxLength: [20, 'Maximum 20 letters for a username'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      trim: true,
      validate: {
        validator: function (value) {
          return value.includes('@');
        },
        message: props => `${props.value} is not a valid email`,
      },
      unique: true,
    },
    displayName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,

      // select: false,
    },
    gender: {
      type: String, //true = male, false= female
      enum: ['male', 'female'],
      required: [true, 'Gender is required,"male" or "female".'],
    },
    profileImage: {
      type: String,
      trim: true,
    },
    passwordResetHashedToken: String,
    passwordResetHashedTokenExpires: Date,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

UserSchema.pre('save', function (next) {
  if (
    !this.displayName ||
    this.displayName === null ||
    this.displayName === ''
  ) {
    this.displayName = this.username;
  }

  if (
    !this.profileImage ||
    this.profileImage === '' ||
    this.profileImage === null
  ) {
    if (this.gender === 'male') {
      this.profileImage = 'default-male.jpg';
    } else {
      this.profileImage = 'default-female.jpg';
    }
  }
  next();
});

UserSchema.methods.createPasswordResetToken = function () {};

module.exports = mongoose.model('User', UserSchema);
