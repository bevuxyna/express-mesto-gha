const mongoose = require('mongoose');
const validator = require('validator');
const { compare } = require('bcrypt');
const UnauthorizedError = require('../errors/unauthorized-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Текст должен быть не короче 2 символов'],
    maxlength: [30, 'Текст должен быть короче 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Текст должен быть не короче 2 символов'],
    maxlength: [30, 'Текст должен быть короче 30 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*/gm.test(v);
      },
      message: 'Введен некорректный URL',
    },
  },
  email: {
    type: String,
    required: [true, 'Введите email'],
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Введен некорректный email',
    },
  },
  password: {
    type: String,
    required: [true, 'Введите пароль'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Ошибка авторизации');
      }
      return compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Ошибка авторизации');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
