import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardsService } from '../services/cards.service';
import { Card } from '../models/card';
import { DeckService } from '../services/deck.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-deck-builder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './deck-builder.component.html',
  styleUrls: ['./deck-builder.component.less']
})
export class DeckBuilderComponent implements OnInit {

  cards: Card[] = [];
  filteredCards: Card[] = [];

  deck: Card[] = [];
  groupedDeck: any[] = [];

  // Filtros
  filterName = '';
  filterTipo = '';
  filterRaza = '';

  tipos: string[] = ['Aliado', 'Oro', 'Tótem', 'Arma', 'Talismán'];
  razas: string[] = ['Faerie', 'Guerrero', 'Sombra', 'Caballero','Heroe', 'Dragon', 'Bestia','Eterno'];

  constructor(private cardsService: CardsService, private deckService: DeckService, private authService: AuthService) {}

  ngOnInit() {
    this.cardsService.getCards().subscribe(data => {
      this.cards = data;
      this.filteredCards = data;
    });
  }

  // Aplicar filtros
  applyFilters() {
    this.filteredCards = this.cards.filter(c => {
      return (
        c.nombre.toLowerCase().includes(this.filterName.toLowerCase()) &&
        (this.filterTipo === '' || c.tipo === this.filterTipo) &&
        (this.filterRaza === '' || c.raza === this.filterRaza)
      );
    });
  }

  // Agregar cartas al mazo
  addToDeck(card: Card) {
    if (this.deck.length >= 50) {
      alert('El mazo no puede tener más de 50 cartas');
      return;
    }
    this.deck.push(card);
    this.updateGroupedDeck();
  }

  // Quitar cartas
  removeFromDeck(card: Card) {
    const index = this.deck.findIndex(c => c.id === card.id);
    if (index !== -1) {
      this.deck.splice(index, 1);
      this.updateGroupedDeck();
    }
  }


  saveDeckToFirebase() {
  const uid = this.authService.getUserId();
  if (!uid) {
    alert("Debes iniciar sesión para guardar tu mazo");
    return;
  }

  this.deckService.saveDeck(uid, this.deck)
    .then(() => alert("Mazo guardado 🎉"))
    .catch(err => console.error(err));
}


loadDeckFromFirebase() {
  const uid = this.authService.getUserId();
  if (!uid) {
    alert("Debes iniciar sesión para cargar tu mazo");
    return;
  }

  this.deckService.loadDeck(uid)
    .then(deck => {
      if (deck) {
        this.deck = deck;
        this.updateGroupedDeck();
      }
    })
    .catch(err => console.error(err));
}


  // Agrupar cartas iguales
  updateGroupedDeck() {
    const map = new Map<string, { card: Card; count: number }>();

    this.deck.forEach(card => {
      if (!map.has(card.nombre)) {
        map.set(card.nombre, { card, count: 1 });
      } else {
        map.get(card.nombre)!.count++;
      }
    });

    this.groupedDeck = Array.from(map.values()).map(g => ({
      card: g.card,
      count: g.count,
      countArray: Array(g.count).fill(0)
    }));
  }
}
