import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { DeckBuilderComponent } from './deck-builder/deck-builder.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [  DeckBuilderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
}
