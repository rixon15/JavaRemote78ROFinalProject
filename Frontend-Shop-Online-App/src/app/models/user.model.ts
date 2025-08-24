export class User {
  id: any;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  userRole: string;


  constructor(id: any, name: string, email: string, password: string, phone: string, address: string, userRole: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.address = address;
    this.userRole = userRole;
  }
}

