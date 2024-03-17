//Открыть попап

export function openModal (popupTypeEdit) {
  popupTypeEdit.classList.add('popup_is-opened');

  const popupClose = popupTypeEdit.querySelector('.popup__close');

  popupTypeEdit.addEventListener('click', closeByOverlay);
  document.addEventListener('keydown', closeByEsc);
  popupClose.addEventListener('click', () => closeModal(popupTypeEdit))

}

//Закрыть попап функции

function closeByOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closeModal(evt.target); 
  }
}

function closeByEsc(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      closeModal(openedPopup); 
    }
}  

//Закрыть попап и снять слушатель

export function closeModal(classTarget) {
  classTarget.classList.remove('popup_is-opened')

  document.removeEventListener('keydown', closeByEsc);
}
