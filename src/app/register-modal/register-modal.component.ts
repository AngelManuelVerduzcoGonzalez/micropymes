import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegistroModalComponent {
  username: string = '';
  password: string = '';
  confirmarContrasena: string = '';
  email: string = '';

  constructor(private modalCtrl: ModalController, private alertController: AlertController) {}

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  registrarUsuario() {
    if (this.username !== '' && this.password !== '' && this.confirmarContrasena !== '' && this.email !== '') {
      if (this.password !== this.confirmarContrasena) {
        this.alert('Error', 'Las contraseñas no coinciden');
        return;
      }

      const datosUsuario = {
        username: this.username,
        password: this.password,
        email: this.email,
      };

      this.alert('Exito', 'Usuario creado con exito');

      // Cerrar el modal y enviar los datos
      this.modalCtrl.dismiss(datosUsuario);
    } else {
      this.alert('Error', 'Uno o más campos estan vacíos');
    }
  }

  async alert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ["OK"]
    });

    await alert.present();
  }
}
