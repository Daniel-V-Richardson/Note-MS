const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");
const config = require("../../../shared/config");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash the password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to generate auth token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, email: this.email }, "mysupersecretkey", {
    expiresIn: "1h",
  });
};

// Method to create a new database and notes collection
userSchema.methods.createUserDatabase = async function () {
  const client = new MongoClient(config.mongoUrl);
  await client.connect();
  const db = client.db(this._id.toString());
  await db.createCollection("notes");
  client.close();
};

// Deleting user-specific database
userSchema.statics.deleteUserDatabase = async function (userId) {
  MongoClient.connect(config.mongoUrl)
    .then((client) => {
      // Reference of database
      const connect = client.db(userId.toString());

      // Dropping the database
      connect.dropDatabase();

      console.log(`Deleted DB Related to User:${userId}`);
    })
    .catch((err) => {
      console.log(err.Message);
      throw new Error(err.Message);
    });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
