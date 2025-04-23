import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TruncatePipe } from "../../pipes/truncate.pipe";
import { Todo } from "../todo.interface";
import { CreateTodo } from "../../create-todo-form/todo.interface";

@Component({
  selector: "app-todo-card",
  templateUrl: "./todo-card.component.html",
  styleUrl: "./todo-card.component.scss",
  standalone: true,
  imports: [TruncatePipe],
})
export class TodoCardComponent {
  @Input()
  todo: any;
  @Output()
  createTodo = new EventEmitter<CreateTodo>();
  @Output()
  deleteTodo = new EventEmitter<number>();

  onDeleteTodo(todoId: number) {
    this.deleteTodo.emit(todoId);
  }
}
