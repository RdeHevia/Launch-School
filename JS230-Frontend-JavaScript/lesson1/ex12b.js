let h2s = [...document.querySelectorAll('h2')];
// let wordCount = h2s.map(h2 => h2.textContent.split(' ').length);


// document.querySelector('#toc');
// document.getElementById('toc');
// document.getElementsByClassName('toc')[0];

// [...document.querySelectorAll('#toc a')].forEach((anchor, idx) => {
//   if (idx % 2 !== 0) anchor.style.color = 'green';
// });


// [...document.querySelectorAll('.thumbcaption')].map(thumbcaption => thumbcaption.textContent.trim());


let taxonomicRanks = ['kingdom', 'phylum', 'class', 'order', 'family', 'genus', 'species'];

let rows = [...document.querySelectorAll('.infobox.biota tr')].filter(row => {
  let td = row.querySelector('td');
  if (!td) return false;
  // console.log(td.textContent);
  return taxonomicRanks.includes(td.textContent.toLocaleLowerCase().replace(':',''));
});

let classification = rows.reduce((data, row) => {
  let rank = row.children[0].textContent.toLocaleLowerCase().replace(':','');
  let group = row.children[1].textContent.trim();
  data[rank] = group;
  return data;
}, {});