import { NgIf } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

export function completedValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.trim().toLowerCase();
    if (value === "да" || value === "нет") {
      return null;
    }
    return { invalidComleted: true };
  };
}

@Component({
  selector: "app-create-todo-form",
  templateUrl: "./create-todo-form.html",
  styleUrl: "./create-todo-form.scss",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
})
export class CreateTodoComponent {
  @Output()
  createTodo = new EventEmitter();

  public form = new FormGroup({
    title: new FormControl(" ", [Validators.required, Validators.minLength(3)]),
    userId: new FormControl(" ", [Validators.required]),
    completed: new FormControl(" ", [
      Validators.required,
      completedValidator(),
    ]),
  });

  private getCompletedValue(): boolean {
    const value = this.form.get("completed")?.value!.trim().toLowerCase();
    if (value === "да") return true;
    else return false;
  }

  public submitForm() {
    this.createTodo.emit({
      ...this.form.value,
      completed: this.getCompletedValue(),
    });
    this.form.reset();
  }
}
