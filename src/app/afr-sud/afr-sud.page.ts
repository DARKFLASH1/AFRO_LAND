import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-afr-sud',
  templateUrl: './afr-sud.page.html',
  styleUrls: ['./afr-sud.page.scss'],
  standalone: false,
})
export class AfrSudPage implements OnInit {
 

  constructor(private router: Router) { }

  ngOnInit() { }

  
  // Naviguer vers un pays
  ouvrirPays(paysId: string) {
    this.router.navigate(['/pays', paysId]);
  }
}
