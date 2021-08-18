let post = {
  title: 'Lorem ipsum dolor sit amet',
  published: 'April 1, 2015',
  body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
  tags: ['great', 'boring', 'amazing', 'test']
};

post.body = `<p>${post.body}</p>`;

let post2 = {title: 'hey', published: 'yesterday', body: 'cuerpo'};

let posts = [post, post2];

document.addEventListener('DOMContentLoaded', () => {
  let postsTemplateHTML = document.querySelector('#posts').innerHTML;
  let postsTemplate = Handlebars.compile(postsTemplateHTML);

  let tagTemplateHTML = document.querySelector('#tag').innerHTML;
  Handlebars.registerPartial('tag', tagTemplateHTML);

  let postHTML = postsTemplate({posts});
  console.log(postHTML);
  document.body.insertAdjacentHTML('afterbegin', postHTML);
});
