const config = {
  url: 'https://nomoreparties.co/v1/wff-cohort-10',
  headers: {
    authorization: '57dd4f5d-dace-4e52-a052-4e42c99f4a48', 
    'Content-Type': 'application/json' 
  }
}

//Проверка запроса
function checkResponse(res) {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`)
}

//Загрузка данных пользователся с сервера
const takeTocenAPI = () => {
  return fetch(`${config.url}/users/me`, {
    headers: config.headers
  })
    .then((res) => checkResponse(res))
}

//Загрузка карточек с сервера
function loadCardServerAPI() {
return fetch(`${config.url}/cards`, {
  headers: config.headers
})
.then((res) => checkResponse(res))
}

//Редактирование профиля
function sendDataServerAPI(profileName, profileAbout) {
return fetch(`${config.url}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({ 
    name: `${profileName}`, 
    about: `${profileAbout}` 
  }) 
})
  .then((res) => checkResponse(res))
}

//Добавление новой карточки
function addNewCardDataServer(linkCard, nameCard) {
  return fetch(`${config.url}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ 
      name: `${nameCard}`, 
      link: `${linkCard}` 
    })
  })
    .then((res) => checkResponse(res))
}

//Удаление карточки
function deleteCardAPI(idCard) {
  return fetch(`${config.url}/cards/${idCard}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then((res) => checkResponse(res))
}

//Обновление аватара
function updateAvatarAPI(Photo) {
  return fetch(`${config.url}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ 
      avatar: Photo
    })
  })
    .then((res) => checkResponse(res))
}

//Лайк карточки
function likeCard(idCard) {
  return fetch(`${config.url}/cards/likes/${idCard}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then((res) => checkResponse(res))
}

//Снятие лайка с каточки
function unlikeCard(idCard) {
  return fetch(`${config.url}/cards/likes/${idCard}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then((res) => checkResponse(res))
}


export {
  takeTocenAPI,
  loadCardServerAPI,
  sendDataServerAPI,
  addNewCardDataServer,
  deleteCardAPI,
  updateAvatarAPI,
  likeCard,
  unlikeCard,

}
