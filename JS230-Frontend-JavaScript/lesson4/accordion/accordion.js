/*
  - EVENT submit:
    - read character entered in to the text input (input#key)
    - bind EVENT keypress to the document
*/

$(() => {
  $('form').on('submit', event => {
    event.preventDefault();
    let key = $('#key').val();

    $(document).off('keypress').on('keypress', event => {
      if (event.key !== key) return;
      $('a').trigger('click');
    });
  });

  $('a').click(event => {
    $("#accordion").slideToggle();
    event.preventDefault();
  });
});