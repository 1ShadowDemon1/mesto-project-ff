// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardElement = document.querySelector('.places__list');

// @todo: Функция создания карточки

function AddCard(CardLink, CardText) {
  let card = cardTemplate.querySelector('.places__item').cloneNode(true);
  card.querySelector('.card__image').src = CardLink;
  card.querySelector('.card__title').textContent = CardText;

  const CardRem = card.querySelector('.card__delete-button');
  CardRem.addEventListener('click', CardDel)

  cardElement.append(card);
}

// @todo: Функция удаления карточки

function CardDel(event) {
  const CardRemuve = event.target.closest('.places__item');
  CardRemuve.remove();
  console.log('click')
}

// @todo: Вывести карточки на страницу
const addCard = document.querySelector('.profile__add-button');
addCard.addEventListener('click', function() {
  initialCards.forEach(function(item) {
  AddCard(item.link, item.name);})
})


