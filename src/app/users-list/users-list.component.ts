import { AsyncPipe, NgFor } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CreateUser, User } from "./user.interface";
import { UsersApiService } from "../users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../users.service";
import { CreateUserForm } from "../create-user-form/create-user-form.component";
import { Store } from "@ngrx/store";
import { UsersActions } from "./store/user.actions";
import { selectUsers } from "./store/users.selectors";

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
  private readonly store = inject(Store);
  public readonly users$ = this.store.select(selectUsers);

  constructor() {
    this.usersApiService.getUsers().subscribe((response: any) => {
      this.store.dispatch(UsersActions.set({ users: response }));
    });
  }

  deleteUser(id: number): void {
    this.store.dispatch(UsersActions.delete({ id }));
  }

  editUser(user: EditableUser) {
    this.store.dispatch(UsersActions.edit({ user }));
  }

  public createUser(formData: CreateUser) {
    this.store.dispatch(
      UsersActions.create({
        user: {
          id: new Date().getTime(),
          name: formData.name,
          email: formData.email,
          website: formData.website,
          company: {
            name: formData.company.name,
          },
        },
      })
    );
  }

  createUserDialog(formData: CreateUser) {
    this.store.dispatch(
      UsersActions.create({
        user: {
          id: new Date().getTime(),
          name: formData.name,
          email: formData.email,
          website: formData.website,
          company: {
            name: formData.company.name,
          },
        },
      })
    );
  }
}
