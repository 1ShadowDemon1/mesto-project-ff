import './pages/index.css';
import { initialCards } from './scripts/cards';
import { createCard, removeCard, likeButton} from './scripts/card';
import { openModal, closeModal } from './scripts/modal';


// @todo: DOM узлы

const popupList = document.querySelectorAll('.popup');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElementProfile = document.forms['edit-profile'];
const formElementPlace = document.forms['new-place'];
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeImage = document.querySelector('.popup_type_image ');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const cardsPlaces = document.querySelector('.places__list');


// @todo: Вывести карточки на страницу

initialCards.forEach(function(item) {
  const cardElement = createCard(item.link, item.name, removeCard, likeButton, openCardPopup);
  cardsPlaces.append(cardElement);
})


//Добавление анимации всем поапам и слушателя для закрытия

popupList.forEach(function(popupList) {
  popupList.classList.add('popup_is-animated');

  popupList.addEventListener('click', function(evt) {
    if (evt.currentTarget === evt.target) {
      closeModal(evt.target)
    }
  });

  const popupClose = popupList.querySelector('.popup__close');
  popupClose.addEventListener('click', () => closeModal(popupList));
});


//Открыть профиль

profileEditButton.addEventListener('click', () => {

  formElementProfile.name.value = profileTitle.textContent;
  formElementProfile.description.value = profileDescription.textContent;

  openModal(popupTypeEdit);
})

formElementProfile.addEventListener('submit', (evt) => {
  evt.preventDefault(); 

  profileTitle.textContent = formElementProfile.name.value;
  profileDescription.textContent = formElementProfile.description.value;

  closeModal(popupTypeEdit);
})


//Открыть форму добавления карточек

profileAddButton.addEventListener('click', () => {
  openModal(popupTypeNewCard);
})

formElementPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const nameInput = formElementPlace['place-name'].value;
  const placeWork = formElementPlace.link.value;

  const cardElements = createCard(placeWork, nameInput, removeCard, likeButton, openCardPopup);
  cardsPlaces.prepend(cardElements);
  formElementPlace.reset();
  closeModal(popupTypeNewCard);
})

//Открыть попап карточку

function openCardPopup(сardLink, сardText) {
  popupImage.src = сardLink;
  popupCaption.textContent = сardText;
  openModal(popupTypeImage);
}


