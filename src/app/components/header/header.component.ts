import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @HostListener("window:click")
  clickout(){
      this.showlogout = false;
  }

  showlogout:boolean = false;
  
  constructor(private router: Router) { }

  logout(){
    sessionStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }


  ngOnInit(): void {
  }

}
