import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/services/auth/auth.service';
import { UsuarioService } from 'src/services/usuario/usuario.service';
import { RegistroModalComponent } from '../register-modal/register-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.cargarDatosRecordados();
  }

  cargarDatosRecordados(): void {
    const rawData = localStorage.getItem('rememberMe');
    if (rawData) {
      try {
        const data = JSON.parse(rawData);
        if (data?.usuario && data?.password) {
          this.usuario = data.usuario;
          this.password = data.password;
          this.rememberMe = true; // Activar el checkbox si hay datos recordados
        }
      } catch (error) {
        console.error('Error al parsear datos de "rememberMe":', error);
        localStorage.removeItem('rememberMe'); // Limpiar datos corruptos
      }
    }
  }

  async onLogin() {
    if (this.usuario.trim() && this.password.trim()) {
      try {
        const success = await this.authService.login(this.usuario, this.password);
        if (success) {
          this.gestionarRecordatorio(); // Manejar el guardado o eliminación de los datos
          this.router.navigate(['/home']); // Redirigir al usuario
        } else {
          this.alert('Error', 'Usuario o contraseña incorrectos');
        }
      } catch (error) {
        console.error('Error durante la autenticación:', error);
        this.alert('Error', 'Hubo un problema con la autenticación');
      }
    } else {
      this.alert('Error', 'Por favor, llena todos los campos.');
    }
  }

  gestionarRecordatorio(): void {
    if (this.rememberMe) {
      localStorage.setItem(
        'rememberMe',
        JSON.stringify({ usuario: this.usuario, password: this.password })
      );
    } else {
      localStorage.removeItem('rememberMe');
    }
  }

  async abrirModalRegistro() {
    const modal = await this.modalCtrl.create({
      component: RegistroModalComponent,
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        console.log('Usuario registrado:', data.data);
        this.usuarioService.addUsuario(data.data).subscribe({
          next: () => this.alert('Éxito', 'Usuario registrado correctamente'),
          error: (err) => {
            console.error('Error al registrar usuario:', err);
            this.alert('Error', 'No se pudo registrar el usuario');
          },
        });
      }
    });

    return await modal.present();
  }

  async alert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
