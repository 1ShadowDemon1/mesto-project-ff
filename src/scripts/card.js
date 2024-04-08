import { likeCard, unlikeCard } from './serverAPI'

//Функция создания карточки

export function createCard(idUser, res, deleteCard, openCardPopup) {
  const myLikeOnCard = res.likes

  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardLikeButton = card.querySelector('.card__like-button');
  const like = card.querySelector('.like')
  const buttonDeleteCard = card.querySelector('.card__delete-button');
  const buttonRemove = card.querySelector("button");
  cardLikeButton.id = res._id

  cardImage.src = res.link
  card.querySelector('.card__title').textContent = res.name;
  cardImage.alt = res.name;
  card.id = res._id

  myLikeOnCard.forEach((likeId) => {
    if(likeId._id === idUser) {
      cardLikeButton.classList.add('card__like-button_is-active')
    }
  })

  if(!(res.owner._id === idUser)) {
    buttonRemove.remove()
  } else {
    buttonDeleteCard.addEventListener('click', () => deleteCard(card.id)); 
  }

  cardLikeButton.addEventListener('click', () => likeButton(cardLikeButton, like, res._id));
  
  like.textContent = res.likes.length;

  cardImage.addEventListener('click', () => openCardPopup(res.link, res.name))
  
  return card;
}


//Обработчик лайка\дизлайка

function likeButton (cardLikeButton, like, idCard) {
  if(cardLikeButton.classList.value === 'card__like-button') {

    likeCard(idCard)
      .then((result) => {
        like.textContent = result.likes.length
        cardLikeButton.classList.toggle('card__like-button_is-active')
      })
      .catch(err => {
        console.error(err)
      })

  } else {

    unlikeCard(idCard)
      .then((result) => {
        like.textContent = result.likes.length
        cardLikeButton.classList.toggle('card__like-button_is-active')
      })
      .catch(err => {
        console.error(err)
      })
  }
};