import { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  onLoading,
  isLoading,
  handleValidation,
  validation,
  setErrorMessage,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { isInputValid, errorMessage, isValid } = validation;

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setErrorMessage({});
  }, [currentUser, isOpen, setErrorMessage]);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onLoading();

    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      submitButtonTitle="Сохранить"
      submitButtonDescription="сохранения данных пользователя"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      onChange={handleValidation}
      isValid={isValid}
    >
      <fieldset className="form__user-data">
        <input
          type="text"
          name="userName"
          required
          placeholder="Имя"
          className="form__input form__input_info_name"
          id="username-input"
          minLength={2}
          maxLength={40}
          onChange={handleChangeName}
          value={name || ''}
        />
        <span
          className={`form__input-error place-input-error ${
            !isInputValid.userName ? 'form__input-error_visible' : ''
          }`}
        >
          {errorMessage.userName}
        </span>
        <input
          type="text"
          name="userInfo"
          required
          placeholder="О себе"
          className="form__input form__input_info_job"
          id="user-info-input"
          minLength={2}
          maxLength={200}
          onChange={handleChangeDescription}
          value={description || ''}
        />
        <span
          className={`form__input-error place-input-error ${
            !isInputValid.userInfo ? 'form__input-error_visible' : ''
          }`}
        >
          {errorMessage.userInfo}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
