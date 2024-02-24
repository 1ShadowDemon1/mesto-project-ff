// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(сardLink, сardText, removeCard) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = card.querySelector('.card__image');

  cardImage.src = сardLink;
  card.querySelector('.card__title').textContent = сardText;
  cardImage.alt = "Фото";

  const buttonDeleteCard = card.querySelector('.card__delete-button');
  buttonDeleteCard.addEventListener('click', removeCard);

  return card;
}

// @todo: Функция удаления карточки

function removeCard(event) {
  const card = event.target.closest('.places__item');
  card.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function(item) {
  const cardElement = createCard(item.link, item.name, removeCard);
  cardsList.append(cardElement);
})
