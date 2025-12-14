import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { DeckBuilderComponent } from './deck-builder/deck-builder.component';
import { CardListComponent } from './components/card-list/card-list.component';

export const routes: Routes = [
    {path: '', component: AuthComponent},
    {path: 'deck-builder', component: DeckBuilderComponent},
    {path: 'card-list', component:CardListComponent}
];
