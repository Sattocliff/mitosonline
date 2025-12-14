import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';


// AngularFire imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    // Angular settings
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),

    // 🔥 Firebase settings (AHORA SÍ CORRECTO)
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyAh31UXjpGRD-LtavTzywrDcCApXZXjKWk",
      authDomain: "mitos-online.firebaseapp.com",
      projectId: "mitos-online",
      storageBucket: "mitos-online.firebasestorage.app",
      messagingSenderId: "1058910181056",
      appId: "1:1058910181056:web:7c444d6ac805057909ff25",
      measurementId: "G-C4SYPSRK0M"
    })),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ]
};
