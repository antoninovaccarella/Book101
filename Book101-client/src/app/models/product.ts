export class Product {
  id?: number;
  name?: string;
  price?: number;
  salePrice?: number;
  discount?: number;
  picture?: string;
  small?: Array<string>;
  shortDetails?: string;
  description?: string;
  stock?: number;
  state?: string;
  category?: string;

  constructor(
    id?: number,
    name?: string,
    price?: number,
    picture?: string,
    small?: Array<string>,
    shortDetails?: string,
    description?: string,
    stock?: number,
    state?: string,
    category?: string
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.picture = picture;
    this.shortDetails = shortDetails;
    this.description = description;
    this.stock = stock;
    this.state = state;
    this.category = category;
    this.small = small;
  }
}
