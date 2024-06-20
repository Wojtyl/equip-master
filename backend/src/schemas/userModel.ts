import mongoose, { Model, UpdateQuery } from "mongoose";
import bcrypt from "bcryptjs";
import { Roles } from "../enums/roles-enum";
import { validatePassword } from "../utils/validators/password-validator";
import { AppError } from "../utils/appError";

export interface IUser {
  name: string;
  surname: string;
  birthday: Date;
  phoneNumber: string;
  email: string;
  image: string;
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
  hashPassword(newPassword: string): Promise<string>;
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
    required: [true, "Please enter your password"],
    validate: {
      validator: (val: string) => validatePassword(val),
      message: "Password is too short!"
    }
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
  phoneNumber: {
    type: String,
    default: ''
  },
  image: {
    type: String
  },
  birthday: {
    type: Date
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

  console.log("is modified")

  if (process.env.DO_ENCRYPT === "false") return next();
  //Hash the password with cost of 12
  this.password = await this.hashPassword(this.password);

  //Delete passwordConfirm field
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as UpdateQuery<any>;
  if (update.password) {
    if (!validatePassword(update.password)) {
      throw new AppError("Password is too short!", 403);
    }
    update.password = await bcrypt.hash(update.password, 12);
  }

  next();
})

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  console.log(candidatePassword, userPassword);
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.hashPassword = async function (newPassword: string) {
  return bcrypt.hash(newPassword, 12);
}

const User = mongoose.model("User", userSchema);

export { User };
