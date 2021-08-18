// /*
// CHANGES:
//   - h1 (My Site!):
//   - header: move before section#content
//   - img chin_stick: move before figbacption chin stick
//   - img baby_mop: move before figcaption baby mop
// */

// // - header with navigation bar: move before main
// let header = [...document.body.children]
//   .filter(child => child.nodeName === 'HEADER')[0];
let header = document.querySelector('body > header');
// // console.log(header);
let main = document.querySelector('main');
main.insertAdjacentElement('beforebegin', header);
// let sectionContent = document.querySelector('#content');
// sectionContent.insertAdjacentElement('beforebegin', header);
// // h1 (my Site!) inside header;
let h1 = document.querySelector('h1');
header.insertBefore(h1, header.firstElementChild);

// // -images pair with their captions
let figCaptions = document.body.querySelectorAll('figcaption');
let [figCaptionChinStick, figCaptionBabyMop] = figCaptions;
figCaptionBabyMop.id = 'baby_mop';
figCaptionChinStick.setAttribute('id', 'chin_stick');

let imgBabyMop = document.querySelector(`img[alt="The baby mop"]`);
let imgChinStick = document.querySelector(`img[alt="The chin stick"]`);

figCaptionChinStick.insertAdjacentElement("beforebegin",imgChinStick);
figCaptionBabyMop.insertAdjacentElement("beforebegin",imgBabyMop);
// images inside article, lastChilds
let figures = document.querySelectorAll('figure');
let article = document.querySelector('article');

article.appendChild(figures[0]);
article.appendChild(figures[1]);