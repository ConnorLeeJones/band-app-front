import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { AuthenticationService } from './services/authentication.service';



@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    isNavbarCollapsed = false;
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.isNavbarCollapsed = false;
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}