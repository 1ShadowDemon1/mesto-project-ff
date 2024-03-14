//Закрыть попап

import { createCard, removeCard, LikeButton } from './card';

export function popUpClose (popupTypeEdit, popupClose) {
  popupClose.addEventListener('click', function () {
    popupTypeEdit.classList.remove('popup_is-opened')
  });
  
  const page = document.querySelector('.page');

  page.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      popupTypeEdit.classList.remove('popup_is-opened')
    }
  });

  popupTypeEdit.addEventListener('click', (evt) => {
    if (evt.currentTarget === evt.target) {
      popupTypeEdit.classList.remove('popup_is-opened')
    }
  })
};

//Данные из профиля
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

export function profileText () {
  const formElement = document.forms['edit-profile']

  document.forms['edit-profile'].name.value = profileTitle.textContent;
  document.forms['edit-profile'].description.value = profileDescription.textContent;

  formElement.addEventListener('submit', handleFormSubmit); 
}

// Редактирование профиля

function handleFormSubmit(evt) {
  const nameInput = document.forms['edit-profile'].name
  const jobInput = document.forms['edit-profile'].description
  const popupTypeEdit = document.querySelector('.popup_type_edit ') 

  evt.preventDefault(); 

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;

  popupTypeEdit.classList.remove('popup_is-opened')
}


const cardsList = document.querySelector('.places__list');
const formElements = document.forms['new-place']

export function formElement(addCard) {
  formElements.addEventListener('submit', function(evt) {
    const nameInput = document.forms['new-place']['place-name'].value
    const jobInput = document.forms['new-place'].link.value
  
    evt.preventDefault();
  
    const cardElement = createCard(jobInput, nameInput, removeCard, );
    cardsList.prepend(cardElement);
    addCard.classList.remove('popup_is-opened')
    formElements.reset();
  });
}


//Добавление карточки


export function handleFormCardSubmit () {
  const nameInput = document.forms['new-place']['place-name'].value
  const jobInput = document.forms['new-place'].link.value


  formElements.preventDefault();

  const cardElement = createCard(jobInput, nameInput, removeCard);
  cardsList.prepend(cardElement);
  addCard.classList.remove('popup_is-opened')
  formElements.reset();
}