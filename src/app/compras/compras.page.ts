import { Component, OnInit } from '@angular/core';
import { CompraService } from 'src/services/compra/compra.service';
import { CompraModalComponent } from '../compras-modal/compras-modal.component';
import { AlertController, ModalController } from '@ionic/angular';
import { ProductoService } from 'src/services/producto/producto.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {
  purchase: any[] = [];

  constructor(
    private compras: CompraService,
    private productos: ProductoService,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.compras.getCompras().subscribe((sales: any) => {
      this.purchase = sales;
    });
  }

  eliminar(id: number) {
    this.alertConfirm('Confirmar eliminación', '¿Estás seguro de que deseas eliminar esta compra?', () => {
      this.compras.deleteCompra(id).subscribe({
        next: () => {
          this.alert('Éxito', 'Compra eliminada correctamente');
          this.load();
        },
        error: (err) => {
          console.error('Error al eliminar compra:', err);
          this.alert('Error', 'No se pudo eliminar la compra');
        },
      });
    });
  }

  async abrirModal(compra?: any) {
    const modal = await this.modalCtrl.create({
      component: CompraModalComponent,
      componentProps: { compra },
    });

    await modal.present();

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        if (data.data.isEditing) {
          this.compras.updateCompra(compra.id, data.data).subscribe(() => {
            this.alert('Éxito', 'Compra actualizada correctamente');
            this.load();
          });
        } else {
          this.compras.addCompra(data.data).subscribe(() => {
            this.productos.getProductoId(data.data.idProducto).subscribe((producto: any) => {
              producto.cantidad += data.data.cantidad;
              this.productos.updateProducto(producto.id, producto).subscribe();
            });
            this.alert('Éxito', 'Compra registrada correctamente');
            this.load();
          });
        }
      }
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
