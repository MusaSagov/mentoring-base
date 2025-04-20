import { Component } from "@angular/core";
import { RemoveDashesPipe } from "../../pipes/remove-dashes.pipe";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [RemoveDashesPipe],
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.scss",
})
export class FooterComponent {
  phoneNumber = "+ 7 (812) 309-09-34";
}
