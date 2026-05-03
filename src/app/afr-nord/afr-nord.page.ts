import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-afr-nord',
  templateUrl: './afr-nord.page.html',
  styleUrls: ['./afr-nord.page.scss'],
  standalone: false,
})
export class AfrNordPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  // Naviguer vers un pays
  ouvrirPays(paysId: string) {
    this.router.navigate(['/pays', paysId]);
  }
}
