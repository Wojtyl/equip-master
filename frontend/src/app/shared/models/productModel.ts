export interface Product {
  _id: string,
  attributes: ProductAttributes,
  category: string[],
  createdAt: Date,
  productIndex: string,
  supplierId: string,
  imageUrl: string,
  name: string
}

interface ProductAttributes {
  size: string[],
  colour: string
}
