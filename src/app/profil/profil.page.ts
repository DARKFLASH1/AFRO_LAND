import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: false,
})
export class ProfilPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  ouvrirPays(afrouestId: string){
    this.router.navigate(['/pays', afrouestId]);
  }
}
