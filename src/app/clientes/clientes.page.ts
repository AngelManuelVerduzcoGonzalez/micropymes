import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/services/cliente/cliente.service';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ClientesModalComponent } from '../clientes-modal/clientes-modal.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  constructor(
    private clienteService: ClienteService,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) { }

  clientes: any = [];

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.getClientes().subscribe((data: any) => {
      this.clientes = data;
    });
  }

  async abrirModalClientes(cliente?: any) {
    const modal = await this.modalCtrl.create({
      component: ClientesModalComponent,
      componentProps: { cliente }, // Pasar los datos aquí
    });

    await modal.present();

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        console.log(data.data)
        if (data.data.isEditing) {
          // Lógica para actualizar
          this.clienteService.updateCliente(cliente.id, data.data).subscribe({
            next: () => {
              this.alert('Éxito', 'Cliente actualizado correctamente')
              this.cargarClientes();
            },
            error: (err) => this.alert('Error', 'No se pudo actualizar el cliente'),
          });
        } else {
          // Lógica para crear nuevo proveedor
          this.clienteService.addCliente(data.data).subscribe({
            next: () => {
              this.alert('Éxito', 'Cliente registrado correctamente');
              this.cargarClientes();
            },
            error: (err) => this.alert('Error', 'No se pudo registrar el cliente: ' + err.message),
          });
        }
      }
    });
  }

  eliminarCliente(id: number) {
    this.alertConfirm('Confirmar eliminación', '¿Estás seguro de que deseas eliminar este cliente?', () => {
      this.clienteService.deleteCliente(id).subscribe({
        next: () => {
          this.alert('Éxito', 'Cliente eliminado correctamente');
          this.cargarClientes();
        },
        error: (err) => {
          console.error('Error al eliminar al cliente:', err);
          this.alert('Error', 'No se pudo eliminar al cliente');
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
