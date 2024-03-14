const cardTemplate = document.querySelector('#card-template').content;

//Функция создания карточки

export function createCard(сardLink, сardText, removeCard, LikeButton) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = card.querySelector('.card__image');

  cardImage.src = сardLink;
  card.querySelector('.card__title').textContent = сardText;
  cardImage.alt = сardText;

  const buttonDeleteCard = card.querySelector('.card__delete-button');
  buttonDeleteCard.addEventListener('click', removeCard);

  const cardLikeButton = card.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', LikeButton);
  
  return card;
}

// @todo: Функция удаления карточки

export function removeCard(event) {
  const card = event.target.closest('.places__item');
  card.remove();
}

//обработчик лайка\дизлайка

export function LikeButton (evt) {
  if (evt.target.classList.value === 'card__like-button') {
    evt.target.classList.add('card__like-button_is-active')
  } else {
    evt.target.classList.remove('card__like-button_is-active')
  }
};