const User = require('../models/user');
const STATUS = require('../utils/status');

// возвращает всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(STATUS.SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};

// возвращает пользователя по _id
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(STATUS.NOT_FOUND).send({ message: 'Пользователь по указанному id не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(STATUS.BAD_REQUEST).send({ message: 'Переданы некорректные данные пользователя' });
        return;
      }
      res.status(STATUS.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

// создаёт пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  // записываем данные в базу
  User.create({ name, about, avatar })
    // возвращаем записанные в базу данные пользователю
    .then((user) => res.status(STATUS.CREATED).send({ data: user }))
    // если данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS.BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя' });
        return;
      }
      res.status(STATUS.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

// обновляет профиль
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        res.status(STATUS.NOT_FOUND).send({ message: 'Пользователь с указанным id не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(STATUS.BAD_REQUEST).send({ message: `Переданы некорректные данные при обновлении профиля ${err.message}` });
        return;
      }
      res.status(STATUS.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

// обновляет аватар
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        res.status(STATUS.NOT_FOUND).send({ message: 'Пользователь с указанным id не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(STATUS.BAD_REQUEST).send({ message: `Переданы некорректные данные при обновлении аватара ${err.message}` });
        return;
      }
      res.status(STATUS.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};
