import './pages/index.css';
import { createCard} from './scripts/card';
import { openModal, closeModal } from './scripts/modal';
import { enableValidation, clearValidation } from './scripts/validation';
import { addNewCardDataServer, takeTocenAPI, loadCardServerAPI, sendDataServerAPI, deleteCardAPI, updateAvatarAPI, likeCard, unlikeCard } from './scripts/serverAPI'



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
  clearValidation(popupTypeEdit, validationConfig)
  openModal(popupTypeEdit);
})

formElementProfile.addEventListener('submit', (evt) => {
  evt.preventDefault(); 

  profileTitle.textContent = formElementProfile.name.value;
  profileDescription.textContent = formElementProfile.description.value;

  renderLoading(true)
  sendDataServerAPI(profileTitle.textContent, profileDescription.textContent).finally(() => {renderLoading(false)})
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
  addNewCardDataServer(placeWork, nameInput)
    .then((res) => {
      const cardElement = createCard(res.owner._id, deleteCard, res._id, res.owner._id, res.likes.length, res.link, res.name, likeButton, openCardPopup)
      cardsPlaces.prepend(cardElement);
    })
    .catch(err => {
      console.error(err)
    })
    .finally(() => {renderLoading(false)})

  formElementPlace.reset();
  clearValidation(popupTypeNewCard, validationConfig)
  closeModal(popupTypeNewCard);
})


//Контроль вводимых данных

const validationConfig = {
  form: '.popup__form',
  input: '.popup__input',
  submitButton: '.popup__button',
  submitFromInactive: 'form__submit_inactive',
  formSubmitActiv: 'form__submit_active',
  errorText: 'popup__input-error_active'
}

enableValidation(validationConfig);


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

takeTocenAPI().then((res) => {
  profileTitle.textContent = res.name 
  profileDescription.textContent = res.about 
  profileImage.style = `background-image: url("${res.avatar}")`
  let idUser = res._id 


  // Загрузка карточек с сервера

  loadCardServerAPI()
    .then((resList) => {
    resList.forEach((res) => {
      const cardElement = createCard(idUser, deleteCard, res._id, res.owner._id, res.likes.length, res.link, res.name, likeButton, openCardPopup, res.likes);
      cardsPlaces.append(cardElement);
    })
  })
    .catch(err => {
      console.error(err)
    })
})
  .catch(err => {
    console.error(err)
  })


//Открыть попап удаления карточки

function deleteCard(cardid) {
  /*
  const popupDeleteCard = document.querySelector('.popup_delete_card')
  deleteCardYes(cardid, popupDeleteCard)
  */
  deleteCardAPI(cardid)
    .catch(err => {
      console.error(err)
    })
  document.getElementById(`${cardid}`).remove();
}
/* Подключение попап удаления карточки (экспонентное нажатие, проверить слушатели)
function deleteCardYes(idCard, popupDeleteCard) {
  const popupDeleteCardButton = document.forms['form_delete_card']

  popupDeleteCardButton.addEventListener('submit', (evt) => {
    evt.preventDefault(); 

    deleteCardAPI(idCard)
    

    closeModal(popupDeleteCard);
    document.getElementById(`${idCard}`).remove();
  })
}
*/

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

  updateAvatarAPI(Photo)
    .finally(() => {renderLoading})
  
  formElementAvatar.reset();
  clearValidation(avatarEdit, validationConfig)
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


//обработчик лайка\дизлайка

function likeButton (cardLikeButton, like, idCard) {
  if(cardLikeButton.classList.value === 'card__like-button') {
    cardLikeButton.classList.toggle('card__like-button_is-active')

    likeCard(idCard)
      .then((result) => {
        like.textContent = result.likes.length
      })
      .catch(err => {
        console.error(err)
      })

  } else {
    cardLikeButton.classList.toggle('card__like-button_is-active')

    unlikeCard(idCard)
      .then((result) => {
        like.textContent = result.likes.length
      })
      .catch(err => {
        console.error(err)
      })
  }
};