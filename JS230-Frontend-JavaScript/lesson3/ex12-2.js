
function createProduct(productData) {
  let json = JSON.stringify(productData);

  let request = new XMLHttpRequest();
  request.open('POST', 'https://ls-230-web-store-demo.herokuapp.com/v1/products');
  request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  request.setRequestHeader('Authorization', 'token AUTH_TOKEN');

  request.addEventListener('load', event => {
    console.log(event.target.status);
    console.log('This product was added:');
    console.log(event.target.response);
  });

  request.send(json);
}


// let obj1 = {
//   name: 'Boli verde',
//   sku: 'bol200',
//   price: '234'
// };

let obj2 = {
  name: 'HB pencil',
  sku: 'hbp100',
  price: '50'
};

createProduct(obj2);