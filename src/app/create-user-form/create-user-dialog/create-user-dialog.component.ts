import { Component, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogClose,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

@Component({
  standalone: true,
  selector: "app-create-user-dialog",
  templateUrl: "./create-user-dialog.component.html",
  styleUrl: "./create-user-dialog.component.scss",
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDialogClose,
  ],
})
export class CreateUserDialogComponent {
  readonly data = inject(MAT_DIALOG_DATA);

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

  get userWithUpdatedFields() {
    return {
      ...this.form.value,
      id: this.data.user.id,
    };
  }
}
