import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-afr-centre',
  templateUrl: './afr-centre.page.html',
  styleUrls: ['./afr-centre.page.scss'],
  standalone: false,
})
export class AfrCentrePage implements OnInit {
 

  constructor(private router: Router) { }

  ngOnInit() { }

  // Naviguer vers un pays
  ouvrirPays(paysId: string) {
    this.router.navigate(['/pays', paysId]);
  }
}
