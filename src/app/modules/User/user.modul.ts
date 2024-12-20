import { model, Schema } from 'mongoose';
import { Tuser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import { emailValidationRegex, roletype } from './user.constant';
import config from '../../config';

//create useshema
const userSchema = new Schema<Tuser, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'The name field is required.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'The email field is required.'],
      unique: true,
      validate: {
        validator: function (value: string) {
          return emailValidationRegex.test(value);
        },
        message: 'Please provide a valid email address.',
      },
    },
    password: {
      type: String,
      required: [true, 'The password field is required.'],
      minlength: [6, 'Password must be at least 6 characters long.'],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: roletype,
        message: "Role must be either 'admin' or 'user'.",
      },
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//plant passworld convert to has passworld
userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
});

//instance methods for checking if passwords are matched

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

//instance methods for checking if the user exist
userSchema.statics.isUserExistsByEmail = async function (email) {
  return await User.findOne({ email }).select('+password');
};

//create user model
const User = model<Tuser, UserModel>('User', userSchema);

export default User;
