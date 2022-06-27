import {Component, OnInit} from '@angular/core';
import {TokenService} from './components/shared/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Book101-client';
  loadAPI: Promise<any>;
  isLoggedIn = false;
  username?: string;

  ngOnInit(): void {
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
    this.isLoggedIn = !!this.tokenService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.username = user.username;
    }
  }

  constructor(private tokenService: TokenService) {
  }

  logout(): void {
    this.tokenService.signOut();
    window.location.reload();
  }

  public loadScript(): void {
    let isFound = false;
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes('loader')) {
        isFound = true;
      }
    }

    if (!isFound) {
      const dynamicScripts = ['../assets/js/scripts.js'];
      for (const item of dynamicScripts) {
        const node = document.createElement('script');
        node.src = item;
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }

    }
  }
}
