/* eslint-disable max-lines-per-function */
/*
INPUT: click
OUTPUT:
  - click on nav links:
    - scroll down to article
    - add class highlight to article
    - remove highlight class of any other article
  - click on an article (or any of its childs):
    - add class highlight to article
    - remove highlight class of any other article
  - click anywhere else on the page
    - add class highlight to main
    - remove highlight class of any other article
*/

/*
ALGO 1:
  - attach a click listener to document
  - query all articles
  - if the event fires:
    - select element with the class highlight
    - remove class highlight from it
    - if target.tagName is 'A':
      - read id of the article stored in href
      - highlight that article
    - if articles.includes(target) || articles.includes(target.parentElement)
      - highlight target.parentElement
    - otherwise:
      - highlight the main element
*/

document.addEventListener('click', event => {
  let highlightedElement = document.querySelector('.highlight');

  if (highlightedElement) {
    highlightedElement.classList.remove('highlight');
  }

  let links = [...document.querySelectorAll('a')];
  let articles = [...document.querySelectorAll('article')];

  if (links.includes(event.target)) {
    let highlightedArticleId = event.target.getAttribute('href');
    let highlightedArticle = document.querySelector(highlightedArticleId);
    highlightedArticle.classList.add('highlight');
  } else if (articles.includes(event.target)) {
    event.target.classList.add('highlight');
  } else if (articles.includes(event.target.parentElement)) {
    event.target.parentElement.classList.add('highlight');
  } else {
    document.querySelector('main').classList.add('highlight');
  }
});

/*
ALGO 2:
  - attach a click listener to document
    if the event fires:
    - select element with the class highlight
    - remove class highlight from it
    - highlight the main element
  - attach a click listener to nav
    if the event fires:
    - if target.tagName is 'A':
      - stop propagation
      - read id of the article stored in href
      - highlight that article
  - attach a click listener to main
    - if target.tagName is 'article'
      - stop propagation
      - highlight that article
    - otherwise:
      - highlight the main element
*/

// function unhighlightElement() {
//   let highlightedElement = document.querySelector('.highlight');

//   if (highlightedElement) {
//     highlightedElement.classList.remove('highlight');
//   }
// }

// document.addEventListener('click', () => {
//   unhighlightElement();
//   document.querySelector('main').classList.add('highlight');
// });

// let links = [...document.querySelectorAll('a')];
// links.forEach(link => link.addEventListener('click', event => {
//   event.stopPropagation();
//   unhighlightElement();
//   let highlightedArticleId = event.target.getAttribute('href');
//   let highlightedArticle = document.querySelector(highlightedArticleId);
//   highlightedArticle.classList.add('highlight');
// }));

// let articles = [...document.querySelectorAll('article')];
// let articlesAndChildrens = articles.map(article => {
//   return [article, [...article.children]];
// });

// articlesAndChildrens.forEach(articleAndChildren => articleAndChildren[0].addEventListener('click', event => {
  
// }))