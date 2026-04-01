import './style.css'

export default function CreateForm(options = {}) {

  let { target, fields = [] } = options;
  let createNewForm = document.querySelector(target);

  if (!createNewForm) {
    console.error("Target element not found");
    return;
  }

  let form = document.createElement('form');
  form.className = 'registerForm-pack';
  createNewForm.appendChild(form);

  fields.forEach(field => {
    let fieldDiv = document.createElement('div');
    if (field.type == 'phone') {
      fieldDiv.className = 'phone-number';
      let options = field.options.map(option => `<option value="${option}" ${field.default == option ? "selected" : ''} >${option}</option>`);
      fieldDiv.innerHTML = `
        <label for="${field.name}">${field.name}:</label>
        <span class="prefix-value">${field.prefix}</span>
        <select id="prefix-${field.name}" class="selected">
          ${options}
        </select>
        <input type="text" name="${field.name}" id="${field.name}" placeholder="000000000"/>
        <span class="${field.name}-error error-validate"></span>
      `;
    } else {
      fieldDiv.innerHTML = `
        <label for="${field.name}">${field.name}:</label>
        <input type="text" name="${field.name}" id="${field.name}" placeholder="Please enter ${field.name} . . ."/>
        <span class="${field.name}-error error-validate"></span>
      `;
    }
    form.appendChild(fieldDiv);
  });
  let submitDiv = document.createElement('div');
  submitDiv.className = 'submit-div';
  submitDiv.innerHTML = ` 
    <input type="submit" value="Submit" id="registerForm-submit">
  `;
  form.appendChild(submitDiv);


  fields.forEach(field => {
    if (field.type === 'phone') {
      let phoneValue = form.querySelector(`#${field.name}`);
      phoneValue.dataset.number = '';

      if (phoneValue) {
        phoneValue.addEventListener('input', () => {
          let digits = phoneValue.value.replace(/\D/g, '').substring(0, 7);
          let formatted = '';

          if (digits.length <= 3) {
            formatted = digits;
          } else if (digits.length <= 5) {
            formatted = digits.replace(/(\d{3})(\d{1,2})/, '$1-$2');
          } else {
            formatted = digits.replace(/(\d{3})(\d{2})(\d{1,2})/, '$1-$2-$3');
          }

          phoneValue.value = formatted;
          phoneValue.dataset.number = digits;
        });
      }
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isAllValid = true;

    fields.forEach(field => {
      if (!validateField(field)) isAllValid = false;
    });

    let formData = {};
    fields.forEach(field => {
      let value = form.querySelector(`#${field.name}`);
      if (field.type === 'phone') {
        let operator = form.querySelector(`#prefix-${field.name}`).value;
        let digits = value.dataset.number || '';
        formData[field.name] = field.prefix + operator + digits;
      } else {
        formData[field.name] = value.value.trim();
      }
    });

    if (options.success) {
      options.success(formData);
    }
  });

  function validateField(field) {
    let errorSpan = form.querySelector(`.${field.name}-error`);
    errorSpan.innerHTML = '';
    let input = form.querySelector(`#${field.name}`);
    let value = input.value.trim();

    if (field.type === 'phone') {
      let digits = form.querySelector(`#${field.name}`).dataset.number || '';
      if (digits === '' || digits.length != 7) {
        errorSpan.innerHTML = `*please enter correct phone number`;
        return false;
      }
    }

    if (field.type === 'email') {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) {
        errorSpan.innerHTML = `*please enter valid ${field.name}`;
        return false;
      }
    }

    if (field.type === 'text') {
      if (value === '' || value.length < 4) {
        errorSpan.innerHTML = `*please enter correct ${field.name}`;
        return false;
      }
    }
    return true;
  };

};
