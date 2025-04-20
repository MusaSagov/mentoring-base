import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "removeDashes",
  standalone: true,
  pure: true,
})
export class RemoveDashesPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value; // Если значение пустое, возвращаем его как есть
    return value.replace(/-/g, ""); // Удаляем все черточки
  }
}
