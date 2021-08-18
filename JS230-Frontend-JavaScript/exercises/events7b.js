/*
REQUIREMENTS:
- click on nav link:
  - scroll down to the article
  - remove .highlight of any element that has it
  - add .highlight to the article
- click on an article (or its children)
  - remove .highlight of any element that has it
  - add .highlight to the article
- click anywhere else on the page:
  - remove .highlight of any element that has it
  - add .highlight to the main
SELECTORS:
- links: 
  - container: header ul
  - element: href=#article1...
- articles:
  - container: main
  - element: #article1
*/

/*
ALGO
- click EVENT attached to 'header ul' listening for anchor elements
  - prevent default
  - read article id from href
  - remove .highlight class from all articles **resetHighlight()**
  - add .highlight to the article with the id read **highlight(id)**
  - scroll down to the article with the id

- click EVENT attach to main
  - stop propagation
  - determine the article that contains the element clicked **getParentArticleId(element)** use closest
  - remove .highlight class from all articles **resetHighlight()**
  - add .highlight to the article with the id read **highlight(id)**

- click EVENT attached to document
  - **resetHighlight()**
  - highlight main
*/

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('header ul').addEventListener('click', handlerHighlightArticleByLink);
  document.querySelector('main').addEventListener('click', handlerHighlightArticleClicked);
  document.addEventListener('click', handlerHighlightMain);
});

function handlerHighlightArticleByLink(event) {
  event.stopPropagation();
  event.preventDefault();

  let idSelector = event.target.getAttribute('href');
  resetHighlight();
  highlightByCSSSelector(idSelector);
  scrollIntoByCSSSelector(idSelector);
}

function handlerHighlightArticleClicked(event) {
  if (!event.target.closest('article')) return;

  event.stopPropagation();

  let articleId = event.target.closest('article').id;
  resetHighlight();
  highlightByCSSSelector(`#${articleId}`);
}

function handlerHighlightMain() {
  resetHighlight();
  highlightByCSSSelector('main');
}

function resetHighlight() {
  let highLightedElements = document.querySelectorAll('.highlight');
  highLightedElements.forEach(element => element.classList.remove('highlight'));
}

function highlightByCSSSelector(selector) {
  let element = document.querySelector(selector);
  element.classList.add('highlight');
}

function scrollIntoByCSSSelector(selector) {
  let element = document.querySelector(selector);
  element.scrollIntoView();
}
