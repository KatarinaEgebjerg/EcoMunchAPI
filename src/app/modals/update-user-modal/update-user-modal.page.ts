import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-update-user-modal',
  templateUrl: './update-user-modal.page.html',
  styleUrls: ['./update-user-modal.page.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate('1000ms ease-in-out')),
    ])
  ],
})

export class UpdateUserModalPage {
  user: any;
  originalUser: any;
  credentials: FormGroup | any;
  public showPassword: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private authService: AuthenticationService,
    private fb: FormBuilder
  ) {
    this.user = this.navParams.get('user');
    this.originalUser = { ...this.user }; // Create a copy of the user data
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async save() {
    const { email, password, name } = this.credentials.value;

    if (email !== this.user.email) {
      await this.authService.updateEmail(email);
    }
    if (password) {
      await this.authService.updatePassword(password);
    }
    if (name !== this.user.name) {
      await this.authService.updateName(name);
    }

    // Then close the modal.
    this.modalCtrl.dismiss(this.credentials.value);
  }

  async onSumbit() {
    if (this.credentials.valid) {
      await this.save();
    } else {
      this.credentials.markAllAsTouched();
    }
  }
  
  ngOnInit() {
    this.validators();
  }

  get name() {
    return this.credentials?.get('name');
  }

  get email() {
    return this.credentials?.get('email');
  }

  get password() {
    return this.credentials?.get('password');
  }

  get rePassword() {
    return this.credentials?.get('rePassword');
  }

  validators() {
    this.credentials = this.fb.group(
      {
        name: [this.user.name, [Validators.required]],
        email: [this.user.email, [Validators.required, Validators.email]],
        password: ['', [Validators.minLength(6)]], // Password is optional
        rePassword: ['', [Validators.minLength(6)]], // Re-entered password is optional
      },
      { validators: this.checkPasswords }
    );
  }

  checkPasswords(control: AbstractControl): ValidationErrors | null {
    let pass = control.get('password')?.value || '';
    let confirmPass = control.get('rePassword')?.value || '';

    return pass === confirmPass ? null : { notSame: true };
  }
}
