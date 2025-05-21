import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }

  getUserInfo(id: number) {
    return this.http.get<User>(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
  }

  createUser(user: User) {
    return this.http.post<User>(
      `https://jsonplaceholder.typicode.com/users`,
      user
    );
  }

  changeUser(user: User, id: number) {
    return this.http.put<User>(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      user
    );
  }

  deleteUser(id: number) {
    return this.http.delete<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
  }
}
