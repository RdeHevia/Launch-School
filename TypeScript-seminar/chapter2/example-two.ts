export type Article = {
  title: string,
  price: number,
  vat: number
  stock?: number,
  description?: string
}

type ShopItem = {
  title: string,
  price: number,
  vat: number
  stock: number,
  description: string,
  rating: number
}

const shopitem = {
  title: 'Helvetica',
  price: 6.66,
  vat: 0.19,
  stock: 1000,
  description: '90 minutes of gushing about Helvetica',
  rating: 5
}

const movie: Article = {
  title: 'Helvetica',
  price: 6.66, 
  vat: 0.19,
  stock: 1000,
  description: '90 minutes of gushing about Helvetica',
  rating: 5
}

const missingProperties = {
  title: 'Helvetica',
  price: 6.66
}
 
const anotherMovie: Article = missingProperties
 