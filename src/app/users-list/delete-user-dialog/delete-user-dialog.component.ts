import { NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";


@Component({
  standalone: true,
  selector: "./app-delete-user-dialog",
  templateUrl: "./delete-user-dialog.html",
  styleUrl: "./delete-user-dialog.scss",
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDialogClose,
  ],
})
export class DeleteUserDialogComponent {
  readonly data = inject(MAT_DIALOG_DATA);//3 действие -в модалку передает данные
  readonly dialogRef = inject(MatDialogRef<DeleteUserDialogComponent>)
  constructor() {
    console.log('данные которые пришли в диалоговое окно', this.data);
  }




}
