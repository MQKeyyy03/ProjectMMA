export interface User {
    id: string;
    fullName: string;
    email: string;
    password: string;
  
   
  }
  
  export const USERS: User[] = [
  ];
  export function addUser(newUser: User) {
    USERS.push(newUser);
  }
  