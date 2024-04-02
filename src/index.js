import './pages/index.css';
import { createCard, likeButton} from './scripts/card';
import { openModal, closeModal } from './scripts/modal';
import { setEventListeners } from './scripts/validation';
import { addNewCardDataServer, takeTocenAPI, loadCardServerAPI, sendDataServerAPI, deleteCardAPI, updateAvatarAPI } from './scripts/serverAPI'


// @todo: DOM узлы

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const cardsPlaces = document.querySelector('.places__list');
const profileImage = document.querySelector('.profile__image')


//Добавление анимации всем поапам и слушателя для закрытия
const popupList = document.querySelectorAll('.popup');

popupList.forEach(function(popup) {
  popup.classList.add('popup_is-animated');

  popup.addEventListener('click', function(evt) {
    if (evt.currentTarget === evt.target) {
      closeModal(evt.target)
    }
  });

  const popupClose = popup.querySelector('.popup__close');
  popupClose.addEventListener('click', () => closeModal(popup));
});


//Открыть профиль
const formElementProfile = document.forms['edit-profile'];
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');

profileEditButton.addEventListener('click', () => {

  formElementProfile.name.value = profileTitle.textContent;
  formElementProfile.description.value = profileDescription.textContent;
  clearValidation(popupTypeEdit)
  openModal(popupTypeEdit);
})

formElementProfile.addEventListener('submit', (evt) => {
  evt.preventDefault(); 

  profileTitle.textContent = formElementProfile.name.value;
  profileDescription.textContent = formElementProfile.description.value;

  renderLoading(true)
  sendDataServerAPI(profileTitle.textContent, profileDescription.textContent, renderLoading(false))
  closeModal(popupTypeEdit);
})


//Открыть форму добавления карточек
const formElementPlace = document.forms['new-place']
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');

profileAddButton.addEventListener('click', () => {
  openModal(popupTypeNewCard);
})

formElementPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const nameInput = formElementPlace['place-name'].value;
  const placeWork = formElementPlace.link.value;

  renderLoading(true)
  addNewCardDataServer(placeWork, nameInput, renderLoading(false),
  deleteCard, likeButton, openCardPopup, createCard, cardsPlaces)

  formElementPlace.reset();
  clearValidation(popupTypeNewCard)
  closeModal(popupTypeNewCard);
})


//Контроль вводимых данных

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}; 
enableValidation(); 

function clearValidation(profileForm) {
  const errorInputResetList = profileForm.querySelectorAll('.popup__input-error')
  errorInputResetList.forEach(function(errorInputReset) {
    errorInputReset.textContent = '';
  })

  const InputStyleResetList = profileForm.querySelectorAll('.popup__input ')
  InputStyleResetList.forEach(function(InputStyleRese) {
    InputStyleRese.style = "border-bottom: 1px solid rgba(0,0,0,.2)"
  })

  const buttonElement = profileForm.querySelector('.popup__button');
  buttonElement.classList.add('form__submit_inactive');
}


//Открыть попап карточку

function openCardPopup(сardLink, сardText) {
  const popupTypeImage = document.querySelector('.popup_type_image ');
  const popupImage = popupTypeImage.querySelector('.popup__image');
  const popupCaption = popupTypeImage.querySelector('.popup__caption');

  popupImage.src = сardLink;
  popupCaption.textContent = сardText;
  openModal(popupTypeImage);
}


//API токен

takeTocenAPI(profileTitle, profileDescription, profileImage);


// Загрузка карточек с сервера

loadCardServerAPI(deleteCard, likeButton, openCardPopup, createCard, cardsPlaces)


//Открыть попап удаления карточки

function deleteCard(cardid) {
  const popupDeleteCard = document.querySelector('.popup_delete_card')
  openModal(popupDeleteCard);
  deleteCardYes(cardid, popupDeleteCard)
}

function deleteCardYes(idCard, popupDeleteCard) {
  const popupDeleteCardButton = document.forms['form_delete_card']

  popupDeleteCardButton.addEventListener('submit', (evt) => {
    evt.preventDefault(); 

    deleteCardAPI(idCard)
    

    closeModal(popupDeleteCard);
    document.getElementById(`${idCard}`).remove();
  })
}


//Обновление аватара пользователя
const avatarEdit = document.querySelector('.avatar_edit_popup')
const profileImageButton = document.querySelector('.profile__image_button')

profileImageButton.addEventListener('click', () => {
  openModal(avatarEdit);
})

const formElementAvatar = document.forms['avatar_edit']
formElementAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault(); 
  renderLoading(true)
  const Photo = formElementAvatar.avatar.value

  updateAvatarAPI(Photo, renderLoading(false))
  
  formElementAvatar.reset();
  clearValidation(avatarEdit)
  closeModal(avatarEdit);
})


//Улучшенный UX всех форм

function renderLoading(isLoading) {
  const popupButton = document.querySelector('.popup__button') 

  if(isLoading) {
    popupButton.textContent = 'Сохранение...'
  } else {
    popupButton.textContent = 'Сохранить'
  }
}