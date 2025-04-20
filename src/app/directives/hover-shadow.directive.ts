import { Directive, ElementRef, Renderer2, HostListener } from "@angular/core";

@Directive({
  selector: "[appHoverShadow]",
  standalone: true, // Селектор для применения директивы
})
export class HoverShadowDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // Добавляем тень при наведении мыши
  @HostListener("mouseenter") onMouseEnter() {
    this.renderer.setStyle(
      this.el.nativeElement,
      "box-shadow",
      "0 4px 10px rgba(0, 0, 0, 0.3)"
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      "transition",
      "box-shadow 0.3s ease-in-out"
    );
  }

  // Убираем тень при уходе мыши
  @HostListener("mouseleave") onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, "box-shadow");
  }
}
