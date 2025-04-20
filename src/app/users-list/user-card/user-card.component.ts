import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { DeleteUserDialogComponent } from "../delete-user-dialog/delete-user-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CustomUpperCasePipe } from "../../pipes/upper-case.pipe";
import { RedDirective } from "../../directives/red.directive";
import { HoverShadowDirective } from "../../directives/hover-shadow.directive";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: "app-user-card",
  templateUrl: "./user-card.component.html",
  styleUrl: "./user-card.component.scss",
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    CustomUpperCasePipe,
    RedDirective,
    HoverShadowDirective,
    MatTooltipModule,
  ],
})
export class UserCardComponent {
  @Input()
  user: any;

  @Output()
  deleteUser = new EventEmitter();

  @Output()
  editUser = new EventEmitter();

  readonly dialog = inject(MatDialog);
  readonly snackBar = inject(MatSnackBar);

  openDialog(): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((editResult) => {
      console.log("Модалка закрылась, значение формы: ", editResult);
      if (!editResult) return;
      this.editUser.emit(editResult);
    });
  }

  onDeleteUser(userId: number) {
    this.deleteUser.emit(userId);
  }

  openDelDialog(): void {
    const dialogDelRef = this.dialog.open(DeleteUserDialogComponent, {
      data: { user: this.user },
    });

    dialogDelRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("if сработал", result);
        this.deleteUser.emit(this.user.id);
        this.snackBar.open("Пользователь удален", "Ok", {
          duration: 3000,
        });
      } else {
        console.log("if не сработал", result);
        this.snackBar.open("Отмена удаления", " ", {
          duration: 3000,
        });
      }
    });
  }
}
