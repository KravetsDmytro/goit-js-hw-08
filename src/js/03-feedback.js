import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[name="email"]'),
  textAreaInput: document.querySelector('textarea[name="message"]'),
};

const LOCALSTORAGE_KEY = 'feedback-form-state';
let formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.email.addEventListener('input', throttle(onInputValue, 500));
refs.textAreaInput.addEventListener('input', throttle(onInputValue, 500));

function onInputValue(evt) {
  formData = { ...formData, [evt.target.name]: evt.target.value };
  const dataJson = JSON.stringify(formData);
  localStorage.setItem(LOCALSTORAGE_KEY, dataJson);
}

populateTetxtarea();

// refs.form.addEventListener('input', e=>{
// formData[e.target.name]=e.target.value;
// console.log(formData)
// });

// function onTextAreaInput(evt) {
//   const message = evt.target.value;
//   localStorage.setItem(LOCALSTORAGE_KEY, message);
// console.log(message)
// }

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log('form otprav');
  evt.currentTarget.reset();
  formData = {};
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

function populateTetxtarea() {
  const savedFormData = localStorage.getItem(LOCALSTORAGE_KEY);
  if (savedFormData) {
    formData = JSON.parse(savedFormData);
    refs.email.value = formData.email || '';
    refs.textAreaInput.value = formData.message || '';
  }
}

// const savedMessage=localStorage.getItem(LOCALSTORAGE_KEY);
// if (savedMessage){
// console.log(savedMessage)
// refs.textAreaInput.value=savedMessage;
// }
