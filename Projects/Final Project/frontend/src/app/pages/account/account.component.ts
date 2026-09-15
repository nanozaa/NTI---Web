import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({ selector: 'app-account', standalone: true, imports: [RouterLink, RouterLinkActive, RouterOutlet], templateUrl: './account.component.html' })
export class AccountComponent {}
