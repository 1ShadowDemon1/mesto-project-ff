import './pages/index.css';
import { initialCards } from './scripts/cards';
import { createCard, removeCard, LikeButton} from './scripts/card';
import { openPopup, popUpClose } from './scripts/modal';


// @todo: Темплейт карточки

const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const formElement = document.forms['edit-profile']
const newPlace = document.forms['new-place']
const popupTypeEdit = document.querySelector('.popup_type_edit')
const addCard = document.querySelector('.popup_type_new-card')
const page = document.querySelector('.page')
// @todo: DOM узлы

const cardsList = document.querySelector('.places__list');


// @todo: Вывести карточки на страницу

initialCards.forEach(function(item) {
  const cardElement = createCard(item.link, item.name, removeCard, LikeButton, openCardPopup);
  cardsList.append(cardElement);
})


//Добавление анимации всем поапам

const popupCollection = document.querySelectorAll('.popup')
for(let i = 0; i < popupCollection.length; i++) {
  popupCollection.forEach(popupCollection => popupCollection.classList.add('popup_is-animated'))
}


//Открыть профиль

const profileButton = document.querySelector('.profile__edit-button')

profileButton.addEventListener('click', () => {
  const popupClose = popupTypeEdit.querySelector('.popup__close')

  document.forms['edit-profile'].name.value = profileTitle.textContent;
  document.forms['edit-profile'].description.value = profileDescription.textContent;

  openPopup(popupClose, popupTypeEdit, page);

  formElement.addEventListener('submit', (evt) => handleFormSubmit(evt)); 
});


// Редактирование данных из профиля

function handleFormSubmit(evt) {
  const nameInput = document.forms['edit-profile'].name
  const jobInput = document.forms['edit-profile'].description 

  evt.preventDefault(); 

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;

  popUpClose(popupTypeEdit)
}


//Открыть форму добавления карточек

const addCardButton = document.querySelector('.profile__add-button')

addCardButton.addEventListener('click', function() {
  const popupClose = addCard.querySelector('.popup__close')

  openPopup(popupClose, addCard, page)

  newPlace.addEventListener('submit', (evt) => handleFormCardSubmit(evt, newPlace));
});


//Добавить новую карточку

function handleFormCardSubmit(evt, newPlace) {
  const nameInput = document.forms['new-place']['place-name'].value
  const jobInput = document.forms['new-place'].link.value

  evt.preventDefault();

  const cardElement = createCard(jobInput, nameInput, removeCard, LikeButton, openCardPopup);
  cardsList.prepend(cardElement);
  popUpClose(addCard)
  newPlace.reset();
};


//Открыть попап карточку

function openCardPopup(сardLink, сardText) {
  const popupTypeImage = document.querySelector('.popup_type_image ')
  const popupClose = popupTypeImage.querySelector('.popup__close')
  const popupImage = popupTypeImage.querySelector('.popup__image')
  const popupCaption = popupTypeImage.querySelector('.popup__caption')
  popupImage.src = сardLink
  popupCaption.textContent = сardText
  openPopup(popupClose, popupTypeImage, page)
}