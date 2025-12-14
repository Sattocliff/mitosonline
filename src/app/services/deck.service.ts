import { Injectable, inject } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  private firestore = inject(Firestore);

  async saveDeck(userId: string, deck: any) {
    const ref = doc(this.firestore, `decks/${userId}`);
    await setDoc(ref, { deck }, { merge: true }); // merge = no borra otros campos
  }

  async loadDeck(userId: string): Promise<any | null> {
    const ref = doc(this.firestore, `decks/${userId}`);
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    return snap.data()['deck'];
  }
}
