import { AsyncPipe, DatePipe, NgFor, NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { YellowDirective } from "../../directives/basket.directive";
import { MatDialog } from "@angular/material/dialog";
import { AuthComponent } from "../../auth/auth.component";
import { UserService } from "../../user.service";

const menuItems = [
  "Каталог",
  "Стройматериалы",
  "Инструменты",
  "Электрика",
  "Интерьер и одежда",
];

const upperCaseMenuItems = menuItems.map((item) => {
  return item.toUpperCase();
});

const nameItems = (name: string) => {
  return name;
};
const nameAboutItems = nameItems("О компании");

const newPages = [5, 4, 3, 2, 1];
const upperPagesItems = newPages.map((item) => {
  return item;
});

@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterLink,
    DatePipe,
    YellowDirective,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  title = "mentoring-first-project";

  isShowCatalog = false;
  isShowBackground = true;

  currentDate: Date = new Date();
  private readonly dialog = inject(MatDialog);
  public readonly userService = inject(UserService);

  readonly headerItem1 = "Главная";
  readonly headerItem2 = "О компании";
  readonly headerItem3 = "Каталог";

  readonly headerBottomItem1 = "Каталог";
  readonly headerBottomItem2 = "Стройматериалы";
  readonly headerBottomItem3 = "Инструменты";
  readonly headerBottomItem4 = "Электрика";
  readonly headerBottomItem5 = "Интерьер и одежда";

  menuItems = upperCaseMenuItems;
  aboutCompany = nameAboutItems;

  readonly newPages = newPages;

  isUpperCase = true;

  changeMenuText() {
    this.menuItems = upperCaseMenuItems.map((item) =>
      this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
    );
    this.isUpperCase = !this.isUpperCase;
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: "400px",
      height: "200px",
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log("результат подписки после диалог.окна --", result);
      if (result === "admin") {
        this.userService.loginAsAdmin;
      } else if (result === "user") {
        this.userService.loginAsUser;
      } else return undefined;
    });
  }

  public logout() {
    if (confirm("Вы точно хотите выйти?")) {
      console.log("совершили logout");
      return this.userService.logout();
    } else return false;
  }
}
