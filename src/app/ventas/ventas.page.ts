import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/services/venta/venta.service';
import { VentaModalComponent } from '../ventas-modal/ventas-modal.component';
import { AlertController, ModalController } from '@ionic/angular';
import { ClienteService } from 'src/services/cliente/cliente.service';
import { ProductoService } from 'src/services/producto/producto.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})
export class VentasPage implements OnInit {
  sales: any[] = [];

  constructor(
    private ventas: VentaService,
    private clientes: ClienteService,
    private productos: ProductoService,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.ventas.getVentas().subscribe((sales: any) => {
      this.sales = sales;
    });
  }

  eliminar(id: number) {
    this.alertConfirm('Confirmar eliminación', '¿Estás seguro de que deseas eliminar esta venta?', () => {
      this.ventas.deleteVenta(id).subscribe({
        next: () => {
          this.alert('Éxito', 'Venta eliminada correctamente');
          this.load();
        },
        error: (err) => {
          console.error('Error al eliminar venta:', err);
          this.alert('Error', 'No se pudo eliminar la venta');
        },
      });
    });
  }

  async abrirModal(venta?: any) {
    const modal = await this.modalCtrl.create({
      component: VentaModalComponent,
      componentProps: { venta },
    });

    await modal.present();

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.productos.getProductoId(data.data.idProducto).subscribe((producto: any) => {
          if (producto.cantidad >= data.data.cantidad) {
            if (data.data.isEditing) {
              // Lógica para actualizar
              this.ventas.updateVenta(venta.id, data.data).subscribe(() => {
                this.alert('Éxito', 'Venta actualizada correctamente');
                this.load();
              });
            } else {
              // Lógica para nueva venta
              this.ventas.addVenta(data.data).subscribe(() => {
                producto.cantidad -= data.data.cantidad;
                this.productos.updateProducto(producto.id, producto).subscribe(() => {
                  // Actualizar puntos del cliente
                  this.actualizarPuntosCliente(data.data.idCliente, data.data.costo_total);

                  this.alert('Éxito', 'Venta registrada correctamente');
                  this.load();
                });
              });
            }
          } else {
            this.alert('Error', 'Cantidad insuficiente en inventario');
          }
        });
      }
    });
  }

  async actualizarPuntosCliente(clienteId: number, costoTotal: number) {
    try {
      this.clientes.getClienteId(clienteId).subscribe((cliente: any) => {
        cliente.puntos += Math.floor(costoTotal * 0.05); // 5% del costo total como puntos
        this.clientes.updateCliente(clienteId, cliente).subscribe(() => {
          console.log(`Puntos actualizados para el cliente ${clienteId}: ${cliente.puntos}`);
        });
      });
    } catch (error) {
      this.alert('Error', 'No se pudieron actualizar los puntos del cliente');
      console.error(error);
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
