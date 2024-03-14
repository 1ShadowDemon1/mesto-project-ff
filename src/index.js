import './pages/index.css';
import { initialCards } from './scripts/cards';
import { createCard, removeCard, LikeButton } from './scripts/card';
import {popUpClose, profileText, formElement, handleFormCardSubmit} from './scripts/modal';

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardsList = document.querySelector('.places__list');



// @todo: Вывести карточки на страницу

initialCards.forEach(function(item) {
  const cardElement = createCard(item.link, item.name, removeCard, LikeButton);
  cardsList.append(cardElement);
})



//Добавление анимации всем поапам


const popup = document.querySelectorAll('.popup')
for(let i = 0; i < popup.length; i++) {
  popup[i].classList.add('popup_is-animated');
}

//Открыть профиль

const profileButton = document.querySelector('.profile__edit-button')

profileButton.addEventListener('click', function (evt) {
  const popupTypeEdit = document.querySelector('.popup_type_edit')
  const popupClose = popupTypeEdit.querySelector('.popup__close')
  popupTypeEdit.classList.add('popup_is-opened')

  if (popupTypeEdit.classList.contains('popup_is-opened')) {
    profileText();
    popUpClose(popupTypeEdit, popupClose);
  }
});


//Открыть форму добавления карточек

const addCardButton = document.querySelector('.profile__add-button')

addCardButton.addEventListener('click', function() {
  const addCard = document.querySelector('.popup_type_new-card')
  const popupClose = addCard.querySelector('.popup__close')

  addCard.classList.add('popup_is-opened')

  if (addCard.classList.contains('popup_is-opened')) {
    popUpClose(addCard, popupClose, LikeButton);
    formElement(addCard)
  }
});

//Открыть карточку
const popupTypeImage = document.querySelector('.popup_type_image');

cardsList.addEventListener('click', function(evt) {

  if (evt.target.classList.value === 'card__image'){
    const popupImage = popupTypeImage.querySelector('.popup__image')
    const popupCaption = popupTypeImage.querySelector('.popup__caption')
    popupImage.src = evt.target.src
    popupCaption.textContent = evt.target.alt
    popupTypeImage.classList.add('popup_is-opened')
    const popupClose = popupTypeImage.querySelector('.popup__close')

    if (popupTypeImage.classList.contains('popup_is-opened')) {
      popUpClose(popupTypeImage, popupClose);
    }
  }
})
