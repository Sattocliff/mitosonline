import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { Card } from '../../models/card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.less']
})
export class CardsComponent implements OnInit {

  cards: Card[] = [];

  constructor(private cardsService: CardsService) {}

  ngOnInit() {
    this.cardsService.getCards().subscribe(data => {
      this.cards = data;
      console.log('Cargando cartas:', this.cards);
    });
  }
}
