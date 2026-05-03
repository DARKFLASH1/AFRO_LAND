import { Component, ViewChild } from '@angular/core';
import {
  Platform,
  IonRouterOutlet,
  NavController,
  AlertController,
  ModalController,
  PopoverController,
  ActionSheetController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { App as CapacitorApp } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet!: IonRouterOutlet;

  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private router: Router,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.platform.ready().then(() => {
      this.registerBackButton();
    });
  }

  registerBackButton() {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      // 1) Fermer overlays si présents (modal, popover, action sheet)
      const topModal = await this.modalCtrl.getTop();
      if (topModal) {
        await topModal.dismiss();
        return;
      }

      const topPopover = await this.popoverCtrl.getTop();
      if (topPopover) {
        await topPopover.dismiss();
        return;
      }

      const topAction = await this.actionSheetCtrl.getTop();
      if (topAction) {
        await topAction.dismiss();
        return;
      }

      // 2) If we're on the Home page -> exit the app immediately
      const currentUrl = this.router?.url ?? '';
      if (currentUrl === '/home' || currentUrl === '/' || currentUrl === '/accueil') {
        try {
          CapacitorApp.exitApp();
        } catch (e) {
          (navigator as any)?.app?.exitApp?.();
        }
        return;
      }

      // 3) Si on est sur une page de niveau 1 (Carte, Quiz, Afrique), retour à Home
      if (currentUrl === '/carte' || currentUrl === '/quiz' || currentUrl === '/afrique') {
        this.navCtrl.navigateRoot('/home');
        return;
      }

      // 3) Si on peut revenir en arrière (historique du navigateur)
      if (window.history.length > 1) {
        this.navCtrl.back();
        return;
      }

      // 4) Sinon, demander confirmation pour quitter
      const alert = await this.alertCtrl.create({
        header: 'Quitter',
        message: 'Voulez-vous quitter l\'application ?',
        buttons: [
          { text: 'Annuler', role: 'cancel' },
          {
            text: 'Quitter',
            handler: () => {
              // Capacitor exit
              try {
                CapacitorApp.exitApp();
              } catch (e) {
                // Cordova fallback
                (navigator as any)?.app?.exitApp?.();
              }
            },
          },
        ],
      });
      await alert.present();
    });
  }
}
