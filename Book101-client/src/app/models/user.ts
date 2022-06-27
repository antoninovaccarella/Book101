export class User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;

  constructor(
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    address: string
  ) {
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.address = address;
  }
}
