import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/services/producto/producto.service';
import { ProductosModalComponent } from '../productos-modal/productos-modal.component';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  prods: any[] = [];
  filteredProds: any[] = [];
  searchText: string = '';

  constructor(
    private productos: ProductoService,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.productos.getProductos().subscribe((prods: any) => {
      this.prods = prods;
      this.filteredProds = prods; // Inicialmente, muestra todos los productos

      // Verificar el stock bajo después de que los productos se carguen
      for (let prod of this.prods) {
        if (prod.cantidad <= 10) {
          this.alert("STOCK BAJO", `Hay 10 o menos ${prod.nombre}, es momento de reabastecer`);
        }
      }
    });
  }


  onSearchChange(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredProds = this.prods.filter((prod) =>
      prod.nombre.toLowerCase().includes(query) || 
      prod.descripcion.toLowerCase().includes(query)
    );
  }

  async abrirModal(producto?: any) {
    const modal = await this.modalCtrl.create({
      component: ProductosModalComponent,
      componentProps: { producto },
    });

    await modal.present();

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        if (data.data.isEditing) {
          this.productos.updateProducto(producto.id, data.data).subscribe({
            next: () => {
              this.alert('Éxito', 'Producto actualizado correctamente');
              this.load();
            },
            error: (err) => this.alert('Error', 'No se pudo actualizar el producto'),
          });
        } else {
          this.productos.addProducto(data.data).subscribe({
            next: () => {
              this.alert('Éxito', 'Producto registrado correctamente');
              this.load();
            },
            error: (err) => this.alert('Error', 'No se pudo registrar el producto'),
          });
        }
      }
    });
  }

  eliminar(id: number) {
    this.alertConfirm('Confirmar eliminación', '¿Estás seguro de que deseas eliminar este proveedor?', () => {
      this.productos.deleteProducto(id).subscribe({
        next: () => {
          this.alert('Éxito', 'Proveedor eliminado correctamente');
          this.load();
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
