//Контроль вводимых данных

export function enableValidation(validationConfig){
  const formList = Array.from(document.querySelectorAll(validationConfig.form));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
}; 


function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.input));
  const buttonElement = formElement.querySelector(validationConfig.submitButton);

  toggleButtonState(inputList, buttonElement, validationConfig)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig)
      toggleButtonState(inputList, buttonElement, validationConfig)
    });
  });
}; 


function isValid(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}; 


function showInputError(formElement, inputElement, errorMessage, validationConfig) {
  inputElement.classList.add(validationConfig.errorText)
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
};

function hideInputError(formElement, inputElement, validationConfig) {
  inputElement.classList.remove(validationConfig.errorText)
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
}; 


//Блокировка кнопки

function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.submitFromInactive);
    buttonElement.classList.remove(validationConfig.formSubmitActiv);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.submitFromInactive);
    buttonElement.classList.add(validationConfig.formSubmitActiv);
  }
}; 

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//Очистка форм

export function clearValidation(profileForm, validationConfig) {
  const errorInputResetList = profileForm.querySelectorAll(`${validationConfig.input}-error`)
  errorInputResetList.forEach(function(errorInputReset) {
    errorInputReset.textContent = '';
  })

  const InputStyleResetList = profileForm.querySelectorAll(validationConfig.input)
  InputStyleResetList.forEach(function(InputStyleRese) {
    InputStyleRese.classList.remove(validationConfig.errorText)
  })

  const buttonElement = profileForm.querySelector(validationConfig.submitButton);
  buttonElement.classList.add(validationConfig.submitFromInactive);
}