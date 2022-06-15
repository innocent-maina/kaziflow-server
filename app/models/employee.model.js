/* eslint-disable func-names */
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const EmployeeSchema = new Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['employee', 'admin'],
    default: 'employee',
  },
  phoneNumber: {
    type: Number,
    required: false,
    unique: false,
  },
  password: String,
  dateOfBirth: {
    type: Date,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true,
});

EmployeeSchema.pre('save', function () {
  if (this.isModified('password')) {
    const salt = bcrypt.genSalt(10);
    const stringPassword = this.password.toString();
    bcrypt.hash(stringPassword, salt);
  }
});

EmployeeSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.lastName}`;
});

module.exports = model('Employee', EmployeeSchema);
