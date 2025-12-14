import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class DeckService {

  private firestore = inject(Firestore);

  // ✅ Guardar un NUEVO mazo
  async saveDeck(userId: string, deck: any) {
    const decksRef = collection(this.firestore, `users/${userId}/decks`);

    await addDoc(decksRef, {
      deck,
      createdAt: new Date()
    });
  }

  // ✅ Obtener TODOS los mazos del usuario
  async getUserDecks(userId: string): Promise<any[]> {
    const decksRef = collection(this.firestore, `users/${userId}/decks`);
    const snap = await getDocs(decksRef);

    return snap.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));
  }
}
