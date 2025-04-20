import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { TodosApiService } from "./todos-api.service";
import { Todo } from "./todo.interface";
import { TodosService } from "./todos.service";
import { CreateTodoComponent } from "../create-todo-form/create-todo-form.component";
import { TruncatePipe } from "../pipes/truncate.pipe";

@Component({
  selector: "app-todos-list",
  templateUrl: "./todos-list.component.html",
  styleUrl: "./todos-list.component.scss",
  standalone: true,
  imports: [NgFor, TodoCardComponent, AsyncPipe, CreateTodoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent {
  readonly todosApiService = inject(TodosApiService);
  readonly todosService = inject(TodosService);

  constructor() {
    this.todosApiService
      .getTodos()
      .pipe()
      .subscribe((response: any) => {
        this.todosService.setTodos(response);
      });

    this.todosService.todos$.subscribe((todos) => console.log(todos));
  }

  public createTodo(formData: any) {
    this.todosService.createTodo({
      id: new Date().getTime(),
      title: formData.title,
      userId: formData.userId,
      completed: formData.completed,
    });
    console.log("Данные формы: ", event);
  }
  deleteTodo(id: number) {
    this.todosService.deleteTodo(id);
  }
}
