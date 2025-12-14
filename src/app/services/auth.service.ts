import { Injectable } from '@angular/core';
import { Auth, User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: User | null = null;

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, user => {
      this.currentUser = user;
    });
  }

  // Registrar usuario
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Iniciar sesión
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Cerrar sesión
  logout() {
    return signOut(this.auth);
  }

  // 🔥 **ESTE ES EL MÉTODO QUE TE FALTABA**
  getUserId(): string | null {
    return this.currentUser ? this.currentUser.uid : null;
  }
}
