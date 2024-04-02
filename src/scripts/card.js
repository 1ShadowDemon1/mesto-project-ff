//Функция создания карточки

export function createCard(deleteCard, idCard, userId, likes, сardLink, сardText, likeButton, openCardPopup) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardLikeButton = card.querySelector('.card__like-button');
  cardLikeButton.id = idCard
  const like = card.querySelector('.like')
  const buttonDeleteCard = card.querySelector('.card__delete-button');
  const buttonRemove = card.querySelector("button");
  const myApiKey = '1fff6a9b44b2ebd8e3ab0f01'

  cardImage.src = сardLink
  card.querySelector('.card__title').textContent = сardText;
  cardImage.alt = сardText;
  card.id = idCard

  if(!(userId === myApiKey)) {
    buttonRemove.remove()
  } else {
    buttonDeleteCard.addEventListener('click', () => deleteCard(card.id)); 
  }

  cardLikeButton.addEventListener('click', () => likeButton(cardLikeButton, like));
  
  like.textContent = likes;

  cardImage.addEventListener('click', () => openCardPopup(сardLink, сardText))
  
  return card;
}


//обработчик лайка\дизлайка

export function likeButton (cardLikeButton, like) {
  if(cardLikeButton.classList.value === 'card__like-button') {
    cardLikeButton.classList.toggle('card__like-button_is-active')
    fetch(`https://nomoreparties.co/v1/wff-cohort-10/cards/likes/${cardLikeButton.id}`, {
      method: 'PUT',
      headers: {
        authorization: '57dd4f5d-dace-4e52-a052-4e42c99f4a48',
      }
    })
      .then(res => res.json())
      .then((result) => {
        like.textContent = result.likes.length
      })
  } else {
    cardLikeButton.classList.toggle('card__like-button_is-active')
    fetch(`https://nomoreparties.co/v1/wff-cohort-10/cards/likes/${cardLikeButton.id}`, {
      method: 'DELETE',
      headers: {
        authorization: '57dd4f5d-dace-4e52-a052-4e42c99f4a48',
      }
    })
      .then(res => res.json())
      .then((result) => {
        like.textContent = result.likes.length
      })
  }

};

