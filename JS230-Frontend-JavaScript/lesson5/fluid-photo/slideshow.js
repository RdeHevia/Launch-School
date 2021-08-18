/*
ALGO:
  - EVENT click on a photo:
    - remove class "active" of all the photos
    - add class "active" to that photo
    - read src of the photo
    - change src of the main photo
*/

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.thumbnail ul').addEventListener('click', event => {
    let imgs = document.querySelectorAll('.thumbnail img');
    imgs.forEach(img => img.classList.remove('active'));

    let selectedImg = event.target;
    selectedImg.classList.add('active');
    let selectedImgPath = selectedImg.src;

    let $mainPic = $('.main_pic img');

    $mainPic.fadeOut(500, () => {
      $mainPic[0].src = selectedImgPath;
    });
    $mainPic.fadeIn(500);
  });
});