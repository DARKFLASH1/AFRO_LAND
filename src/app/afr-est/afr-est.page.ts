import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-afr-est',
  templateUrl: './afr-est.page.html',
  styleUrls: ['./afr-est.page.scss'],
  standalone: false,
})
export class AfrEstPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

    // Naviguer vers un pays
  ouvrirPays(paysId: string) {
    this.router.navigate(['/pays', paysId]);
  }
}