const formState = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const formData = { email: '', message: '' };
const localState = JSON.parse(localStorage.getItem(formState));

if (localState) {
  Object.assign(formData, localState);
  for (const key in formData) {
    document.querySelector(`[name="${key}"]`).value = formData[key];
  }
}

form.addEventListener('input', onInputSaveToLocalStorage);
form.addEventListener('submit', onSubmitForm);

function onInputSaveToLocalStorage(event) {
  const key = event.target.name;
  
  formData[key] = event.target.value.trim();

  localStorage.setItem(formState, JSON.stringify(formData));
}

function onSubmitForm(event) {
  event.preventDefault();

  if (validateFormFields(formData)) {

    console.log('submit', formData);
    Object.keys(formData).forEach(key => (formData[key] = ''));
    localStorage.removeItem(formState);
    event.target.reset();
  }
}

function validateFormFields(formDataObj) {
  let isValid = true;
  for (const key in formDataObj) {
    if (!formDataObj[key]) {
      addBorderInputError(document.querySelector(`[name="${key}"]`));
      isValid = false;
    } else {
      removeBorderInputError(document.querySelector(`[name="${key}"]`));
    }
  }

  return isValid;
}

function addBorderInputError(input) {
  input.classList.add('error');
}

function removeBorderInputError(input) {
  input.classList.remove('error');
}
