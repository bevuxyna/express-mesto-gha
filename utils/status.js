const CREATED = 201;

// переданы некорректные данные в методы создания карточки, пользователя,
// обновления аватара пользователя или профиля
const BAD_REQUEST = 400;

// передан неверный логин или пароль. Также эту ошибку возвращает middleware авторизации,
// если передан неверный JWT
const UNAUTHORIZED = 401;

// попытка удалить чужую карточку
const FORBIDDEN = 403;

// карточка или пользователь не найден; или был запрошен несуществующий роут
const NOT_FOUND = 404;

// при регистрации указан email, который уже существует на сервере
const CONFLICT = 409;

// ошибка по умолчанию «На сервере произошла ошибка»
const SERVER_ERROR = 500;

module.exports = {
  CREATED, BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, CONFLICT, SERVER_ERROR,
};
