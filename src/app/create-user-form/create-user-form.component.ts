import { NgIf } from "@angular/common";
import { Component, EventEmitter, inject, Output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { CreateUserDialogComponent } from "./create-user-dialog/create-user-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-create-user-for",
  templateUrl: "./create-user-form.html",
  styleUrl: "./create-user-form.scss",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class CreateUserForm {
  @Output()
  createUser = new EventEmitter();

  @Output()
  createUserDialog = new EventEmitter();

  public form = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(2)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    website: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
    ]),
    company: new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(2)]),
    }),
  });

  readonly dialog = inject(MatDialog);
  readonly snackBar = inject(MatSnackBar);
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      data: { form: this.form.value },
    });
    dialogRef.afterClosed().subscribe((createResult) => {
      console.log("Модалка закрыта, значение формы:", createResult);
      this.createUserDialog.emit(createResult);
      this.snackBar.open("Пользователь создан", "Ok", {
        duration: 3000,
      });
    });
  }

  public submitForm(): void {
    this.createUser.emit(this.form.value);
    this.form.reset();
  }

  constructor() {
    this.form.valueChanges.subscribe((formValue) => {
      console.log(formValue);
      console.log(this.form.get("name")?.errors);
    });
  }
}
