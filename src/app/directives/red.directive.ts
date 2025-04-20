import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
} from "@angular/core";

@Directive({
  selector: "[red]",
  standalone: true,
})
export class RedDirective {
  //private readonly elementRef = inject(ElementRef);
  color = "red";
  textTransform = "lowercase";

  @HostBinding("style.backgroundColor")
  get backgroundColor() {
    return this.color;
  }

  @HostBinding("style.textTransform")
  get textTransformGetter() {
    return this.textTransform;
  }
  // backgroundColor = this.color;

  @HostListener("click")
  click() {
    this.color = "blue";
    console.log("blue");
  }

  @HostListener("mouseenter")
  enter() {
    this.color = "red";
    this.textTransform = "uppercase";
    console.log("red");
  }

  @HostListener("mouseleave")
  leave() {
    this.color = "white";
    this.textTransform = "lowercase";
    console.log("white");
  }
  // constructor() {
  //   this.elementRef.nativeElement.style.backgroundColor = "red";
  // }
}
