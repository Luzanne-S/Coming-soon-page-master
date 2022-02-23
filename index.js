const validationMessage = {
  'empty': 'Whoops! It looks like you forgot to add your email',
  'email': 'Please provide a valid email address',

}

function capitalize(string) {
  return string.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
}

function isEmail(email) {
  return email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)
}

function reset(form) {
  const errorFields = form.getElementsByClassName('has-error')
  
  for (let i = 0; i < errorFields.length; i++) {
      const errorTexts = errorFields[i].getElementsByClassName('error-text');

      for (let index = 0; index < errorTexts.length; index++) {
          errorTexts[index].remove();
      }
  }
}

function isValid(form) {
  let inputFields = form.getElementsByTagName('input')

  for (let index = 0; index < inputFields.length; index++) {
      const input = {
          name: capitalize((inputFields[index].name).split('_').join(' ')),
          type: inputFields[index].getAttribute('type'),
          value: inputFields[index].value,
          validation: {
              isValid: true,
              message: null
          },
          parent: inputFields[index].parentElement
      } 

      input.parent.classList.remove('has-error')

      if(input.value === '' || input.value === null) {
          input.validation.isValid = false
          input.validation.message = validationMessage.empty.replace(':attribute', input.name)
      }

      if(input.type === 'email' && !isEmail(input.value)) {
          input.validation.isValid = false
          input.validation.message = validationMessage.email
      }

      if(!input.validation.isValid) {
          const errorText = document.createElement("div")
          errorText.classList.add('error-text')
          errorText.innerText = input.validation.message

          input.parent.classList.add('has-error')
          input.parent.append(errorText)
      }
  }

  return false;
}

window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form')
  
  form.addEventListener('submit', function(event) {
      reset(form)

      if (isValid(form)) {
          form.classList.add('success')
      }
  
      event.preventDefault()
  })
})




















/*const submitBtn = document.querySelector(".notify")
const email = document.querySelector("#email")
const message = document.querySelector("#error-text")

submitBtn.addEventListener("click", verifyEmail)

function verifyEmail() {
  const emailRegex = /\S+@\S+\.\S+/

  console.log(email.value)

  // email.value === "" && warningMsg("Please complete the field")

  if (email.value === "") {
    warningMsg("Please complete the field")
  } else {
    if (!emailRegex.test(email.value)) {
      warningMsg("Please provide a valid email address")
    }
  }
  // emailRegex.test(email.value) && warningMsg("Please provide a valid email address") 
}

function warningMsg(msg) {
  message.textContent = msg
  email.classList.add("warning")
  console.log(msg)

  setTimeout(() => {
    message.textContent = ""  
    email.classList.remove("warning")
  }, 2000)
}

/*function verifyEmail(email) {

   const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email)) {
        errorMsg.classList.remove('show');
        inputEmail.classList.remove('show');
        return;
    }

    errorMsg.innerText = 'Please provide a valid email address';
    errorMsg.classList.add('show');
    inputEmail.classList.add('show');
}

const form = document.querySelector('#form');
const inputEmail = document.querySelector('#email');
const errorMsg = document.querySelector('.error-text');
const btnSubmit = document.querySelector('.notify');

btnSubmit.addEventListener('submit',verifyEmail)*/
