import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(private route: Router, private location: Location) { }

  public canActivate(route: ActivatedRouteSnapshot) {
    let user = sessionStorage.getItem('user');
    if((user == 'warehouse' && this.location.path().includes('/login')) || (user == 'warehouse' && this.location.path().includes('/warehouse')) ){
      return true;
    }else if((user == 'shop' && this.location.path().includes('/login')) || (user == 'shop' && this.location.path().includes('/shop'))){
      return true;
    }
    else{
      this.route.navigate(['/login']);
    }
    return false;
    
  }
}
