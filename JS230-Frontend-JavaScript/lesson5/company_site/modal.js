/* eslint-disable max-lines-per-function */
/*
modal structure:
  img (x)
  img, footer
  p loreimsum
  800x600 px
*/


/*
DATA STRUCTURE:
  - team_bio: {kevin, louis, kasper, chris}
ALGO:
 - add event listeners to the anchors
 - anchor CLICK EVENT:
  - copy profile image
  - copy name
  - read attribute data-team-member
  - retrieve the text 
  - renderModal(profileImg, name, bio)
*/

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#team ul').addEventListener('click', event => {
    event.preventDefault();
    let memberName;
    let bio;
    let imgPath;
    if (event.target.tagName === 'IMG') {
      imgPath = event.target.src;
      memberName = event.target.parentElement.textContent.trim();
      bio = event.target.parentElement.dataset.memberBio;
    } else {
      imgPath = event.target.children[0].src;
      memberName = event.target.textContent.trim();
      bio = event.target.parentElement.dataset.memberBio;
    }
    renderModal(memberName, bio, imgPath);
  });
});

/*
ALGO:
  
*/
function renderModal(memberName, bio, imgPath) {
  if (document.querySelector('#modal')) {
    document.querySelector('#modal').remove();
  }

  let modalTemplate =
    Handlebars.compile(document.querySelector('#modal_template').innerHTML);

  let sectionTitle = document.querySelector('h2');
  sectionTitle.insertAdjacentHTML("afterend",modalTemplate({memberName, bio, imgPath}));

  $('#modal').fadeIn(500);


  document.querySelector('.close_window').addEventListener('click', event => {
    event.preventDefault();
    $('#modal').fadeOut(500);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      document.querySelector('.close_window').click();
    }
  });
}