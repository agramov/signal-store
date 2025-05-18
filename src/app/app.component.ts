import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClarityModule } from "@clr/angular";
import { ClarityIcons, boltIcon, cogIcon, userIcon } from '@cds/core/icon';

ClarityIcons.addIcons(userIcon, boltIcon, cogIcon);

@Component({
  selector: 'app-root',
  imports: [
    ClarityModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  title = 'signal-store';
}
