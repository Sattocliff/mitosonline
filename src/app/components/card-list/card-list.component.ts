import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../models/card';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.less']
})
export class CardListComponent implements OnInit {

  cards: Card[] = [];

  constructor(private cardsService: CardsService) {}

  ngOnInit(): void {
    this.cardsService.getCards().subscribe(data => {
      console.log("CARTAS CARGADAS:", data);
      this.cards = data;
    });
  }

  trackById(index: number, card: Card) {
    return card.id;
  }
}
