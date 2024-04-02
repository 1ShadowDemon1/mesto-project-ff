//Добавление новой карточки на сервер

export function addNewCardDataServer(linkCard, nameCard, renderLoading, deleteCard, likeButton, openCardPopup, createCard, cardsPlaces) {
  fetch('https://nomoreparties.co/v1/wff-cohort-10/cards', {
    method: 'POST',
    headers: {
      authorization: '57dd4f5d-dace-4e52-a052-4e42c99f4a48',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${nameCard}`,
      link: `${linkCard}`
    })
  })
    .then(res => res.json())
    .then((result) => {
      const cardElement = createCard(deleteCard, result._id, result.owner._id, result.likes.length, result.link, result.name, likeButton, openCardPopup)
      cardsPlaces.prepend(cardElement);
    })
    .finally(() => {renderLoading})
}


//API токен

export function takeTocenAPI(profileTitle, profileDescription, profileImage) {
  fetch('https://nomoreparties.co/v1/wff-cohort-10/users/me', {
  headers: {
    authorization: '57dd4f5d-dace-4e52-a052-4e42c99f4a48'
  }
})
  .then(res => res.json())
  .then((result) => {
    profileTitle.textContent = result.name
    profileDescription.textContent = result.about
    
    profileImage.style = `background-image: url("${result.avatar}")`
  }); 
}


// Загрузка карточек с сервера

export function loadCardServerAPI(deleteCard, likeButton, openCardPopup, createCard, cardsPlaces) {
  fetch('https://nomoreparties.co/v1/wff-cohort-10/cards', {
  headers: {
    authorization: '57dd4f5d-dace-4e52-a052-4e42c99f4a48'
  }
})
  .then(res => res.json())
  .then((resultList) => {
    resultList.forEach((result) => {
      const cardElement = createCard(deleteCard, result._id, result.owner._id, result.likes.length, result.link, result.name, likeButton, openCardPopup);
      cardsPlaces.append(cardElement);
    })
  })
}


//Редактирование профиля, обновления данныйх на сервере 

export function sendDataServerAPI(profileName, profileAbout, renderLoading) {
  fetch('https://nomoreparties.co/v1/wff-cohort-10/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '57dd4f5d-dace-4e52-a052-4e42c99f4a48',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${profileName}`,
      about: `${profileAbout}`
    })
  })
    .finally(() => {renderLoading})
}


//Удаления карточки с сервера

export function deleteCardAPI(idCard) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-10/cards/${idCard}`, {
    method: 'DELETE',
    headers: {
      authorization: '57dd4f5d-dace-4e52-a052-4e42c99f4a48',
    }
  })
}


//Обновление аватара пользователя на севрере

export function updateAvatarAPI(Photo, renderLoading) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-10/users/me/avatar`, {
  method: 'PATCH',
  headers: {
    authorization: '57dd4f5d-dace-4e52-a052-4e42c99f4a48',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    avatar: `${Photo}`
  })
})
  .finally(() => {renderLoading})
}