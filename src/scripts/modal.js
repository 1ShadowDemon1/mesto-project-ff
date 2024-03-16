//Закрыть попап функции

export function popUpClose(popupTypeEdit) {
  closeModal(popupTypeEdit);  
};

function closeByOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup); 
  }
}

function closeByEsc(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      closeModal(openedPopup); 
    }
}  

//Закрыть попап и снять слушатель

function closeModal (Test) {
  const page = document.querySelector('.page')
  const popupTypeEdit = document.querySelector('.popup_type_edit')

  Test.classList.remove('popup_is-opened')

  page.removeEventListener('keydown', closeByEsc);
  popupTypeEdit.removeEventListener('click', closeByOverlay);
}


//Слушатель закрытия попапа

function closePopup (popupClose, popupTypeEdit, page) {

  popupTypeEdit.addEventListener('click', closeByOverlay);

  page.addEventListener('keydown', closeByEsc);

  popupClose.addEventListener('click', () => 
  popUpClose(popupTypeEdit))

}


//Открыть попап

export function openPopup (popupClose, popupTypeEdit, page) {
  popupTypeEdit.classList.add('popup_is-opened');

  closePopup(popupClose, popupTypeEdit, page);

}