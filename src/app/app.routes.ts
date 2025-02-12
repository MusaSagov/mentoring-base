import { Routes } from "@angular/router";
import { UsersListComponent } from "./users-list/users-list.component";
import { HeaderComponent } from "./component/header/header.component";
import { HomepageComponent } from "./component/homepage/homepage.component";
import { TodosListComponent } from "./todos-list/todos-list.component";

export const routes: Routes = [
  {
    path: "home",
    component: HomepageComponent,
  },
  {
    path: "users",
    component: UsersListComponent,
    pathMatch: "full",
  },
  {
    path: "todos",
    component: TodosListComponent,
  },
];
