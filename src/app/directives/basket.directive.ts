import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: "[yellow]",
  standalone: true,
})
export class YellowDirective {
  // Используем HostBinding для привязки стиля background-color
  @HostBinding("style.backgroundColor") backgroundColor: string = "";

  @HostListener("mouseenter")
  onMouseEnter() {
    this.backgroundColor = "yellow"; // Меняем цвет фона на желтый
    console.log("Mouse entered: yellow");
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    this.backgroundColor = ""; // Возвращаем исходный цвет фона
    console.log("Mouse left: reset color");
  }
}
