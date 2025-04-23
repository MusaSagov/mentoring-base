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
import { CreateTodo } from "./todo.interface";

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
  createTodo = new EventEmitter<CreateTodo>();

  public form = new FormGroup({
    title: new FormControl<string>(" ", [
      Validators.required,
      Validators.minLength(3),
    ]),
    userId: new FormControl<string>(" ", [Validators.required]),
    completed: new FormControl<string>(" ", [
      Validators.required,
      completedValidator(),
    ]),
  });

  private getCompletedValue(): boolean {
    const value = this.form.get("completed")?.value!.trim().toLowerCase();
    return value === "да" ? true : false;
  }

  public submitForm(): void {
    const todo: CreateTodo = {
      title: this.form.value.title?.trim() ?? "",
      userId: this.form.value.userId?.trim() ?? "",
      completed: this.getCompletedValue(),
    };
    this.createTodo.emit(todo);
    this.form.reset();
  }
}
