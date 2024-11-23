import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-clientes-modal',
  templateUrl: './clientes-modal.component.html',
  styleUrls: ['./clientes-modal.component.scss'],
})
export class ClientesModalComponent implements OnInit {
  @Input() cliente: any;

  nombre: string = '';
  correo: string = '';
  telefono: string = '';
  domicilio: string = '';
  puntos: number = 0;
  isEditing: boolean = false; // Flag para saber si estamos editando

  constructor(private modalCtrl: ModalController, private alertController: AlertController) {}

  ngOnInit() {
    if (this.cliente) {
      // Inicializar para edición si los datos están presentes
      this.nombre = this.cliente.nombre;
      this.correo = this.cliente.correo;
      this.telefono = this.cliente.telefono;
      this.domicilio = this.cliente.domicilio;
      this.puntos = this.cliente.puntos
      this.isEditing = true;
    }
  }


  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  guardarCliente() {
    if (this.nombre !== '' && this.domicilio !== '' && this.telefono !== '' && this.correo !== '') {
      const datosCliente = {
        nombre: this.nombre,
        correo: this.correo,
        telefono: this.telefono,
        domicilio: this.domicilio,
        puntos: this.puntos,
        isEditing: this.isEditing // Indicamos si fue edición o nuevo registro
      };

      // Cerrar el modal y enviar los datos
      this.modalCtrl.dismiss(datosCliente);
    } else {
      this.alert('Error', 'Uno o más campos están vacíos');
    }
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
