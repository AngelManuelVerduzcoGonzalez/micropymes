import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ProductoService } from 'src/services/producto/producto.service';
import { ProveedorService } from 'src/services/proveedor/proveedor.service';

@Component({
  selector: 'app-compras-modal',
  templateUrl: './compras-modal.component.html',
  styleUrls: ['./compras-modal.component.scss'],
})
export class CompraModalComponent implements OnInit {
  @Input() compra: any;
  prods: any[] = [];
  provs: any[] = [];
  producto: any;
  proveedor: any;
  cantidad: number = 0;
  precio_costo: number = 0; // Calculado automáticamente
  costo_total: number = 0; // Calculado automáticamente
  isEditing: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private prodSrvc: ProductoService,
    private provSrvc: ProveedorService
  ) {}

  ngOnInit() {
    this.prodSrvc.getProductos().subscribe((res) => {
      this.prods = res;
    });

    this.provSrvc.getProveedores().subscribe((res) => {
      this.provs = res;
    });

    if (this.compra) {
      this.producto = this.compra.Producto.id;
      this.proveedor = this.compra.Proveedor.id;
      this.cantidad = this.compra.cantidad;
      this.precio_costo = this.compra.precio_costo;
      this.costo_total = this.compra.costo_total;
      this.isEditing = true;
    }
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  // Calcula automáticamente el precio y costo total
  actualizarPrecioYCosto() {
    if (this.producto) {
      const selectedProduct = this.prods.find((p) => p.id === this.producto);
      if (selectedProduct) {
        this.precio_costo = selectedProduct.precio_costo; // Obtiene el precio del producto
        this.costo_total = this.precio_costo * this.cantidad; // Calcula el costo total
      }
    }
  }

  guardar() {
    if (this.producto && this.proveedor && this.cantidad > 0 && this.costo_total > 0) {
      const datos = {
        idProducto: this.producto,
        idProveedor: this.proveedor,
        cantidad: this.cantidad,
        precio_costo: this.precio_costo,
        costo_total: this.costo_total,
        isEditing: this.isEditing,
      };

      this.modalCtrl.dismiss(datos);
    } else {
      this.alert('Error', 'Uno o más campos están vacíos o no son válidos');
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
