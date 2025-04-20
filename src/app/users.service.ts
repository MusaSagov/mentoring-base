import { Injectable } from "@angular/core";
import { User } from "./users-list/user.interface";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class UsersService {
  private usersSubject$ = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject$.asObservable();
  setUsers(users: User[]) {
    this.usersSubject$.next(users);
  }

  editUser(editedUser: User) {
    this.usersSubject$.next(
      this.usersSubject$.value.map((user) => {
        if (user.id === editedUser.id) {
          return editedUser;
        } else {
          return user;
        }
      })
    );
  }

  createUser(user: User) {
    const userIsExisting = this.usersSubject$.value.find(
      (currentElement) => currentElement.email === user.email
    );

    if (userIsExisting !== undefined) {
      alert("такой email уже есть");
    } else {
      this.usersSubject$.next([...this.usersSubject$.value, user]);
      alert("новый юзер успешно дабавлен");
    }
  }

  deleteUser(id: number) {
    this.usersSubject$.next(
      this.usersSubject$.value.filter((item) => {
        if (id === item.id) {
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
