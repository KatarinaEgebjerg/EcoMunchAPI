import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  LoadingController,
  ModalController,
  NavParams,
  ToastController,
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-update-user-modal',
  templateUrl: './update-user-modal.page.html',
  styleUrls: ['./update-user-modal.page.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate('1000ms ease-in-out')),
    ]),
  ],
})
export class UpdateUserModalPage {
  user: any;
  originalUser: any;
  credentials: FormGroup | any;
  public showPassword: boolean = false;
  isSubmitted = false;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private authService: AuthService,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.user = this.navParams.get('user');
    this.originalUser = { ...this.user }; // Create a copy of the user data
  }

  ngOnInit() {
    this.validators();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async save() {
    const loading = await this.loadingCtrl.create({
      message: 'Updating...',
    });
    await loading.present();
  
    const { email, password, name } = this.credentials.value;
  
    try {
      if (email !== this.user.email) {
        await this.authService.updateEmail(email);
      }
      if (password) {
        await this.authService.updatePassword(password);
      }
      if (name !== this.user.name) {
        await this.authService.updateName(name);
      }
  
      // Dismiss the loading indicator
      await loading.dismiss();
  
      // Show a success toast
      const toast = await this.toastCtrl.create({
        message: 'User data updated successfully',
        duration: 2000,
        position: 'top',
        color: 'success',
      });
      toast.present();
    } catch (err) {
      console.error(err);
  
      // Dismiss the loading indicator
      await loading.dismiss();
  
      // Show an error toast
      const toast = await this.toastCtrl.create({
        message: 'An error occurred while updating user data',
        duration: 2000,
        position: 'top',
        color: 'danger',
      });
      toast.present();
    } finally {
      this.modalCtrl.dismiss(this.credentials.value);
    }
  }
  

  async onSumbit() {
    if (this.credentials.valid) {
      await this.save();
    } else {
      this.isSubmitted = true;
    }
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
        password: ['', [Validators.minLength(6)]],
        rePassword: ['', [Validators.minLength(6)]],
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
