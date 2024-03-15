//Закрыть попап функции

export function popUpClose (popupTypeEdit) {
  console.log(1)
  popupTypeEdit.classList.remove('popup_is-opened')
};

function closeByOverlay(evt, popupTypeEdit) {
  if (evt.currentTarget === evt.target) {
    console.log(2)
    popupTypeEdit.classList.remove('popup_is-opened')
  }
}

function closeByEsc(evt, popupTypeEdit) {
    if (evt.key === 'Escape') {
      console.log(evt.currentTarget)
      popupTypeEdit.classList.remove('popup_is-opened')
    }
}  

function closePopup (popupClose, popupTypeEdit, page) {

  popupTypeEdit.addEventListener('click', (evt) => 
  closeByOverlay(evt, popupTypeEdit));

  page.addEventListener('keydown', (evt) => 
  closeByEsc(evt, popupTypeEdit));

  popupClose.addEventListener('click', (evt) => 
  popUpClose(popupTypeEdit))

}


//открыть попап

export function openPopup (popupClose, popupTypeEdit, page) {
  popupTypeEdit.classList.add('popup_is-opened');
  if (popupTypeEdit.classList.contains('popup_is-opened')){
    closePopup (popupClose, popupTypeEdit, page);
  }
}