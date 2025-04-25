import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { TodosApiService } from "./todos-api.service";
import { Todo } from "./todo.interface";
import { TodosService } from "./todos.service";
import { CreateTodoComponent } from "../create-todo-form/create-todo-form.component";
import { TruncatePipe } from "../pipes/truncate.pipe";
import { CreateTodo } from "../create-todo-form/todo.interface";
import { Store } from "@ngrx/store";
import { selectTodos } from "./store/todos.selectors";
import { TodosActions } from "./store/todo.actions";

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
  private readonly store = inject(Store);
  public readonly todos$ = this.store.select(selectTodos);

  constructor() {
    this.todosApiService
      .getTodos()
      .pipe()
      .subscribe((response: Todo[]) => {
        this.store.dispatch(TodosActions.set({ todos: response }));
      });
  }

  deleteTodo(id: number): void {
    this.store.dispatch(TodosActions.delete({ id }));
  }

  public createTodo(formData: CreateTodo): void {
    this.store.dispatch(
      TodosActions.create({
        todo: {
          id: new Date().getTime(),
          title: formData.title,
          userId: Number(formData.userId),
          completed: formData.completed,
        },
      })
    );
  }
}
