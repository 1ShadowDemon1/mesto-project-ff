//Функция создания карточки

export function createCard(idUser, deleteCard, idCard, userId, likes, сardLink, сardText, likeButton, openCardPopup, myLikeOnCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardLikeButton = card.querySelector('.card__like-button');
  const like = card.querySelector('.like')
  const buttonDeleteCard = card.querySelector('.card__delete-button');
  const buttonRemove = card.querySelector("button");
  cardLikeButton.id = idCard

  cardImage.src = сardLink
  card.querySelector('.card__title').textContent = сardText;
  cardImage.alt = сardText;
  card.id = idCard

  myLikeOnCard.forEach((likeId) => {
    if(likeId._id === idUser) {
      cardLikeButton.classList.add('card__like-button_is-active')
    }
  })

  if(!(userId === idUser)) {
    buttonRemove.remove()
  } else {
    buttonDeleteCard.addEventListener('click', () => deleteCard(card.id)); 
  }

  cardLikeButton.addEventListener('click', () => likeButton(cardLikeButton, like, idCard));
  
  like.textContent = likes;

  cardImage.addEventListener('click', () => openCardPopup(сardLink, сardText))
  
  return card;
}

