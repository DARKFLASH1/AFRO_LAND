import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-afr-ouest',
  templateUrl: './afr-ouest.page.html',
  styleUrls: ['./afr-ouest.page.scss'],
  standalone:false,
})

export class AfrOuestPage implements OnInit {  
  ngOnInit() {}

  constructor(private router: Router) { }
    //naviguer vers un pays
  ouvrirPays(afrouestId: string){
    this.router.navigate(['/pays', afrouestId]);
  }
}
