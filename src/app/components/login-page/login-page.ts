import {Component, ViewChild} from '@angular/core';
import {FooterComponent} from '../footer/footer.component';
import {FormsModule, NgForm} from '@angular/forms';
import {IdentityService} from '../../services/identity.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    FooterComponent,
    FormsModule
  ],
  templateUrl: './login-page.html'
})
export class LoginPage {

  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(public identityService: IdentityService, private toastrService: ToastrService, private router: Router) {}

  login() {
    const { email, password } = this.loginForm.value;
    this.identityService.login({ email, password }).subscribe({
      next: () => {
        this.toastrService.success("Connexion réussie.");
        this.router.navigate(['/home']).then();
      },
      error: err => { console.log(err); this.toastrService.error("La connexion a échoué : " + err.error.detail) }
    });
  }


  logout() {
    this.identityService.logout({}).subscribe({
      next: () => {
        this.toastrService.success("Déconnexion réussie.");
      },
      error: err => { console.log(err); this.toastrService.error("La déconnexion a échoué : " + err.message) }
    });
  }
}
