import { AsyncPipe, NgFor } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CreateUser, User } from "./user.interface";
import { UsersApiService } from "../users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../users.service";
import { CreateUserForm } from "../create-user-form/create-user-form.component";

interface EditableUser extends User {
  companyName: string;
}
@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrl: "./users-list.component.scss",
  standalone: true,
  imports: [NgFor, UserCardComponent, AsyncPipe, CreateUserForm],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly usersApiService = inject(UsersApiService);
  readonly usersService = inject(UsersService);

  constructor() {
    this.usersApiService.getUsers().subscribe((response: any) => {
      this.usersService.setUsers(response);
    });

    this.usersService.users$.subscribe((users) => console.log(users));
  }

  deleteUser(id: number): void {
    this.usersService.deleteUser(id);
  }

  editUser(user: EditableUser) {
    this.usersService.editUser({
      ...user,
      company: {
        name: user.companyName,
      },
    });
  }

  public createUser(formData: CreateUser) {
    this.usersService.createUser({
      id: new Date().getTime(),
      name: formData.name,
      email: formData.email,
      website: formData.website,
      company: {
        name: formData.company.name,
      },
    });
  }

  createUserDialog(formData: CreateUser) {
    this.usersService.createUser({
      id: new Date().getTime(),
      name: formData.name,
      email: formData.email,
      website: formData.website,
      company: {
        name: formData.company.name,
      },
    });
  }
}
