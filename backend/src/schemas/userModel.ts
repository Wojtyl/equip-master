import mongoose, { Model } from "mongoose";
import bcrypt from "bcryptjs/dist/bcrypt";
import { Roles } from "../enums/roles-enum";

export interface IUser {
  name: string;
  surname: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  role: string;
  signupDate: Date;
  resetToken: String | null;
}

interface IUserMethods {
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<any>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  surname: {
    type: String,
    required: [true, "Please enter your surname"]
  },
  email: {
    type: String,
    required: [true, "Please enter an email address"],
    validate: {
      validator: function (val) {
        return val.includes("@");
      },
      message: "Please enter a valid email address",
    },
  },
  password: {
    type: String,
    minlength: [5, "Password is too short"],
    required: [true, "Please enter your password"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm password"],
    validate: {
      validator: function (val) {
        return val === (this as IUser).password;
      },
      message: "Passwords are not the same",
    },
  },
  role: {
    type: String,
    enum: Roles,
    default: Roles.User,
  },
  signupDate: {
    type: Date,
    default: new Date(),
  },
  resetToken: {
    type: String,
    default: ''
  }
});

userSchema.index({ email: 1 }, { unique: true });

userSchema.pre("save", async function (next) {
  //Only run if password is modified
  if (!this.isModified("password")) return next();

  if (process.env.DO_ENCRYPT === "false") return next();
  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete passwordConfirm field
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  console.log(candidatePassword, userPassword);
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

export { User };
