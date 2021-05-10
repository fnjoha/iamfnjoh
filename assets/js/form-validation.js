let pristine;

window.onload = function () {
  let form = document.getElementById("contact-form");
  pristine = new Pristine(form);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = pristine.validate();
    // console.log('Form is valid: ' + valid);

    if (valid) {
      $.ajax({
        url: form.action,
        method: form.method,
        data: $(form).serialize(),
        dataType: 'json',
        beforeSend: function() {
          // console.log( $(form).serialize() );
          $(form).find('ul.actions li.sending').removeClass('is-hidden');
        },
        complete: function(data) {
          // console.log( data );
          $(form).find('ul.actions li.sending').remove();
          $(form).find('ul.actions li.sent').removeClass('is-hidden');
          $(form).find('ul.actions li.sent').fadeOut(5000, function() { $(this).remove(); });
          $(form)[0].reset();
        }
      });
    }

  });
};
