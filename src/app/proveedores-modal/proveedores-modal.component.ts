import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-proveedores-modal',
  templateUrl: './proveedores-modal.component.html',
  styleUrls: ['./proveedores-modal.component.scss'],
})
export class ProveedoresModalComponent implements OnInit {
  @Input() proveedor: any;

  nombre: string = '';
  telefono: string = '';
  domicilio: string = '';
  isEditing: boolean = false; // Flag para saber si estamos editando

  constructor(private modalCtrl: ModalController, private alertController: AlertController) {}

  ngOnInit() {
    if (this.proveedor) {
      // Inicializar para edición si los datos están presentes
      this.nombre = this.proveedor.nombre;
      this.telefono = this.proveedor.telefono;
      this.domicilio = this.proveedor.domicilio;
      this.isEditing = true;
    }
  }


  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  guardarProveedor() {
    if (this.nombre !== '' && this.domicilio !== '' && this.telefono !== '') {
      const datosProveedor = {
        nombre: this.nombre,
        telefono: this.telefono,
        domicilio: this.domicilio,
        isEditing: this.isEditing // Indicamos si fue edición o nuevo registro
      };

      // Cerrar el modal y enviar los datos
      this.modalCtrl.dismiss(datosProveedor);
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
