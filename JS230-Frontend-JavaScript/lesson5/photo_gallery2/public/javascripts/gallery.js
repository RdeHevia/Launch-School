/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
/*
backend API:
GET /: main page
GET /photos: return array of photo objects (json)
GET /comments?photo_id=:id. return return array of comments (json)
POST /comments/new . add new comment. return the comment added
POST /photos/like. add a like
POST /photos/favorite. add a favorite
*/

/*
Step 1:
GOALS:
  - Fetch photos data
  - Render photos on page load
HIGH LEVEL STEPS:
  - remove (or comment out dummy data)
  - photosData : fetch GET /photos
  -  use photosData to render handlebars template #photos
  - add the resultant html to div#slides

  - use the data of the first photo to render the handlebars template
    #photo_information
  - write the resultant html to section > header
*/

class MarkupManager {
  constructor() {
    this.templates = {};
    this.compileTemplates();
    this.registerPartialsInHandlebars();
  }

  compileTemplates () {
    let templateElements = [...document.querySelectorAll('[type="text/x-handlebars"]')];
    templateElements.forEach(templateElement => {
      let templateHTML = templateElement.innerHTML;
      this.templates[templateElement.id] = {
        compiled: Handlebars.compile(templateHTML)
      };
    });
  }

  registerPartialsInHandlebars() {
    let partials = [...document.querySelectorAll(`[data-type="partial"]`)];
    partials.forEach(partial => {
      Handlebars.registerPartial(partial.id, partial.innerHTML);
    });
  }

  bindDataToTemplate(id, data) {
    // data must be an object {}
    let template = this.templates[id];
    template.data = data;
  }

  generateHTMLFromTemplate(id) {
    let template = this.templates[id]['compiled'];
    let data = this.templates[id]['data'];
    let html = template(data);
    return html;
  }
}

class PhotoGalleryManager extends MarkupManager {
  constructor() {
    super();
    this.photosData = [];
    this.currentFigureIdx = 0;
    this.currentPhotoComments = [];
  }

  setCurrentPhotoIdx(idx) {
    this.currentFigureIdx = idx;
  }

  async fetchCurrentPhotoComments() {
    let currentPhotoId = this.photosData[this.currentFigureIdx].id;
    if (currentPhotoId === this.currentPhotoComments['photo_id']) return undefined;

    let responseComments = await fetch(`/comments?photo_id=${currentPhotoId}`);
    this.currentPhotoComments = await responseComments.json();

    return undefined;
  }

  async fetchPhotosData() {
    let responsePhotos = await fetch('/photos');
    this.photosData = await responsePhotos.json();
  }

  renderPhotos() {
    this.bindDataToTemplate('photos', {photos: this.photosData});

    let photosHTML = this.generateHTMLFromTemplate('photos');
    document.querySelector('#slides')
      .insertAdjacentHTML('afterbegin', photosHTML);
  }

  renderPhotoInformation() {
    let currentPhotoData = this.photosData[this.currentFigureIdx];
    this.bindDataToTemplate('photo_information', {...currentPhotoData});

    let container = document.querySelector('section > header');
    this.empty(container);

    let photoInfoHTML = this.generateHTMLFromTemplate('photo_information');
    container.insertAdjacentHTML('afterbegin', photoInfoHTML);
  }

  renderPhotoComments() {
    this.bindDataToTemplate('photo_comments', {comments: this.currentPhotoComments});

    let container = document.querySelector('#comments ul');
    this.empty(container);

    let commentsHTML = this.generateHTMLFromTemplate('photo_comments');
    container.insertAdjacentHTML('afterbegin', commentsHTML);
  }

  renderLastCommentAdded() {
    /*
    - for each new comment:
      bindDataToTemplate
      generateHTML
      insert after the last comment in the DOM
    */
    let lastComment =
      this.currentPhotoComments[this.currentPhotoComments.length - 1];
    this.bindDataToTemplate('photo_comment', lastComment);

    let container = document.querySelector('#comments ul');
    let commentHTML = this.generateHTMLFromTemplate('photo_comment');
    container.insertAdjacentHTML('beforeend',commentHTML);
  }

  nextPhoto() {
    let chosenFigureIdx = this._circularArrayNextIdx(
      this.currentFigureIdx,
      this.photosData.length - 1
    );

    this.renderChosenFigureAndComments(chosenFigureIdx);
  }

  previousPhoto() {
    let chosenFigureIdx = this._circularArrayPreviousIdx(
      this.currentFigureIdx,
      this.photosData.length - 1
    );

    this.renderChosenFigureAndComments(chosenFigureIdx);
  }

  async renderChosenFigureAndComments(chosenFigureIdx) {

    this.fadeOutFigureAtIdx(this.currentFigureIdx);
    this.fadeInFigureAtIdx(chosenFigureIdx);

    this.setCurrentPhotoIdx(chosenFigureIdx);

    await this.fetchCurrentPhotoComments();

    this.renderPhotoInformation();
    this.renderPhotoComments();
  }


  fadeInFigureAtIdx(idx) {
    let figures = document.querySelectorAll('#slides figure');
    figures[idx].classList.remove('hide');
    figures[idx].classList.add('show');
  }

  fadeOutFigureAtIdx(idx) {
    let figures = document.querySelectorAll('#slides figure');
    figures[idx].classList.remove('show');
    figures[idx].classList.add('hide');
  }

  _circularArrayNextIdx(currentIdx, lastIdx) {
    if (currentIdx === lastIdx) {
      return 0;
    } else {
      return currentIdx + 1;
    }
  }

  _circularArrayPreviousIdx(currentIdx, lastIdx) {
    if (currentIdx === 0) {
      return lastIdx;
    } else {
      return currentIdx - 1;
    }
  }

  enableSlideShow() {
    document.querySelector('a.next').addEventListener('click', event => {
      event.preventDefault();
      this.nextPhoto();
    });

    document.querySelector('a.prev').addEventListener('click', event => {
      event.preventDefault();
      this.previousPhoto();
    });
  }

  async postIncrementLikes() {
    let currentPhotoId = this.photosData[this.currentFigureIdx].id;
    let responseLikes = await fetch('/photos/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({photo_id: currentPhotoId})
    });

    let nbrOfLikes = (await responseLikes.json()).total;
    return nbrOfLikes;
  }

  async postIncrementFavorites() {
    let currentPhotoId = this.photosData[this.currentFigureIdx].id;
    let responseFavorites = await fetch('/photos/favorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({photo_id: currentPhotoId})
    });

    let nbrOfFavorites = (await responseFavorites.json()).total;
    return nbrOfFavorites;
  }

  enableLikesAndFavoritesButtons() {
    let container = document.querySelector('section > header');
    container.addEventListener('click', async event => {
      event.preventDefault();
      let likesButton = document.querySelector('.button.like');
      let favoritesButton = document.querySelector('.button.favorite');

      if (event.target === likesButton) {
        let nbrOfLikes = await this.postIncrementLikes();
        this.updateCurrentPhotoData({likes: nbrOfLikes});
        this.renderPhotoInformation();
      } else if (event.target === favoritesButton) {
        let nbrOfFavorties = await this.postIncrementFavorites();
        this.updateCurrentPhotoData({favorites: nbrOfFavorties});
        this.renderPhotoInformation();
      }
    });
  }

  updateCurrentPhotoData(newData) {
    let currentPhotoData = this.photosData[this.currentFigureIdx];
    for (let key in newData) {
      if (currentPhotoData.hasOwnProperty(key)) {
        currentPhotoData[key] = newData[key];
      }
    }
  }


  empty(container) {
    [...container.children].forEach(child => child.remove());
  }

  enableFormSubmission() {
    let form = document.querySelector('form');
    form.addEventListener('submit', async event => {
      event.preventDefault();

      let newCommentData = await this.postComment();
      this.currentPhotoComments.push(newCommentData);
      form.reset();

      this.renderLastCommentAdded();
    });
  }

  async postComment() {
    let formData = new FormData(document.querySelector('form'));
    let queryString = (new URLSearchParams(formData)).toString();
    let options = {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: queryString
    };

    let response = await fetch('/comments/new', options);
    return response.json();
  }

}

async function handleNotOk(fetchResponse, throwError = true) {
  if (!fetchResponse.ok && throwError) {
    throw (new Error(`Status code: ${fetchResponse.status}`));
  } else if (!fetchResponse.ok && !throwError) {
    console.log(await fetchResponse.text());
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  let galleryManager = new PhotoGalleryManager();
  await galleryManager.fetchPhotosData();
  await galleryManager.fetchCurrentPhotoComments();

  galleryManager.renderPhotos();
  galleryManager.renderPhotoInformation();
  galleryManager.renderPhotoComments();

  galleryManager.enableSlideShow();
  galleryManager.enableLikesAndFavoritesButtons();
  galleryManager.enableFormSubmission();
});


