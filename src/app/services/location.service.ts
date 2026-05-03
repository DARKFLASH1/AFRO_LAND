import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  async getCurrentPosition() {
    try {
      const permissions = await Geolocation.checkPermissions();
      if (permissions.location !== 'granted') {
        const request = await Geolocation.requestPermissions();
        if (request.location !== 'granted') {
          throw new Error('Permission de localisation refusée');
        }
      }
      return await Geolocation.getCurrentPosition();
    } catch (error) {
      console.error('Erreur de géolocalisation', error);
      throw error;
    }
  }
}
