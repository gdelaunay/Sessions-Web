import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {IdentityService} from '../../services/identity.service';
import {ToastrService} from 'ngx-toastr';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login-page.html'
})
export class LoginPage {

  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(public identityService: IdentityService, private toastrService: ToastrService, private router: Router) {}

  login() {
    const { email, password, rememberMe } = this.loginForm.value;
    this.identityService.login({ email, password }, rememberMe).subscribe({
      next: () => {
        this.toastrService.success("Connexion réussie.");
        this.router.navigate(['/']).then();
      },
      error: err => { this.toastrService.error("La connexion a échoué : " + err.error.detail) }
    });
  }

  protected readonly alert = alert;
}
