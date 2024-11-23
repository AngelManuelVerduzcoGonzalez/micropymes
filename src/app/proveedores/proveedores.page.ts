import { Component, OnInit } from '@angular/core';
import { ProveedorService } from 'src/services/proveedor/proveedor.service';
import { ProveedoresModalComponent } from '../proveedores-modal/proveedores-modal.component';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class ProveedoresPage implements OnInit {

  constructor(
    private proveedoresService: ProveedorService,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) { }

  proveedores: any = [];

  ngOnInit() {
    this.cargarProveedores();
  }

  cargarProveedores() {
    this.proveedoresService.getProveedores().subscribe((data: any) => {
      this.proveedores = data;
    });
  }

  async abrirModalProveedores(proveedor?: any) {
    const modal = await this.modalCtrl.create({
      component: ProveedoresModalComponent,
      componentProps: { proveedor }, // Pasar los datos aquí
    });

    await modal.present();

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        if (data.data.isEditing) {
          // Lógica para actualizar
          this.proveedoresService.updateProveedores(proveedor.id, data.data).subscribe({
            next: () => {
              this.alert('Éxito', 'Proveedor actualizado correctamente')
              this.cargarProveedores();
            },
            error: (err) => this.alert('Error', 'No se pudo actualizar el proveedor'),
          });
        } else {
          // Lógica para crear nuevo proveedor
          this.proveedoresService.addProveedores(data.data).subscribe({
            next: () => {
              this.alert('Éxito', 'Proveedor registrado correctamente');
              this.cargarProveedores();
            },
            error: (err) => this.alert('Error', 'No se pudo registrar el proveedor'),
          });
        }
      }
    });
  }
  
  eliminarProveedor(id: number) {
    this.alertConfirm('Confirmar eliminación', '¿Estás seguro de que deseas eliminar este proveedor?', () => {
      this.proveedoresService.deleteProveedores(id).subscribe({
        next: () => {
          this.alert('Éxito', 'Proveedor eliminado correctamente');
          this.cargarProveedores();
        },
        error: (err) => {
          console.error('Error al eliminar proveedor:', err);
          this.alert('Error', 'No se pudo eliminar el proveedor');
        },
      });
    });
  }

  async alert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async alertConfirm(header: string, message: string, onConfirm: () => void) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: onConfirm,
        },
      ],
    });

    await alert.present();
  }

}
