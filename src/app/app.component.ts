import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {
      title: 'Kitchen',
      url: '/kitchen',
      icon: 'pizza',
    },
    { title: 'about', url: '/about', icon: 'information' },
  ];
  constructor() {}
}
