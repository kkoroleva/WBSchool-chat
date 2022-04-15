import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfilePageService {
  showProfSet: boolean = true;
  
  switchSettings() {
    this.showProfSet = !this.showProfSet
    window.scroll({ 
      top: 250, 
      left: 0, 
      behavior: 'smooth' 
});
  }
}
