//Открыть попап

export function openModal (popupTypeEdit) {
  popupTypeEdit.classList.add('popup_is-opened');

  document.addEventListener('keydown', closeByEsc);
}

//Закрыть попап функции

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
