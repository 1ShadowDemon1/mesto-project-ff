//Функция создания карточки

export function createCard(сardLink, сardText, removeCard, LikeButton, openCardPopup) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = card.querySelector('.card__image');

  cardImage.src = сardLink;
  card.querySelector('.card__title').textContent = сardText;
  cardImage.alt = сardText;

  const buttonDeleteCard = card.querySelector('.card__delete-button');
  buttonDeleteCard.addEventListener('click', () => removeCard(card)); 

  const cardLikeButton = card.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', () => LikeButton(cardLikeButton));
  
  cardImage.addEventListener('click', () => openCardPopup(сardLink, сardText))
  
  return card;
}


// @todo: Функция удаления карточки

export function removeCard(cardElement) {
  cardElement.remove(); 
}


//обработчик лайка\дизлайка

export function LikeButton (cardLikeButton) {
  cardLikeButton.classList.toggle('card__like-button_is-active')
};

