export default ({ app }, inject) => {
  inject('formValidate', data => {
    let errors = [];
    if (!data.name) {
      errors.push({
        field: 'name',
        text: 'Укажите Имя'
      });
    }
    if (!data.phone) {
      errors.push({
        field: 'phone',
        text: 'Укажите телефон'
      });
    }
    if (data.email !== '' && !validEmail(data.email)) {
      errors.push({
        field: 'email',
        text: 'Укажите корректный адрес электронной почты'
      });
    } 
    return errors;
  })

  function validEmail (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}