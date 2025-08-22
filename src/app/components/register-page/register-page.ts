import {Component, ViewChild} from '@angular/core';
import {FooterComponent} from '../footer/footer.component';
import {FormsModule, NgForm} from '@angular/forms';
import {SessionService} from '../../services/session.service';
import {SpotService} from '../../services/spot.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {IdentityService} from '../../services/identity.service';

@Component({
  selector: 'app-register-page',
  imports: [
    FooterComponent,
    FormsModule
  ],
  templateUrl: './register-page.html'
})
export class RegisterPage {

  @ViewChild('registerForm') registerForm!: NgForm;

  uppercase = /[A-Z]/;
  lowercase = /[a-z]/;
  digit = /\d/;
  specialCharacter = /[^a-zA-Z0-9]/;
  minLength = 6;

  constructor(private identityService: IdentityService, private toastrService: ToastrService, private router: Router) {}

  register() {
    const { email, password } = this.registerForm.value;
    this.identityService.register({ email, password }).subscribe({
      next: () => {
        this.toastrService.success("Inscription réussie.");
        this.router.navigate(['/login']).then();
        },
      error: err => { this.toastrService.error("L'inscription a échoué : " + err.message) }
    });
  }
}
