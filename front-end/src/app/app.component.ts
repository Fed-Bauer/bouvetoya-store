import { Component } from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "./footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent]
})

export class AppComponent {
  title = 'jwt-frontend-bouvetoya-2';
}
