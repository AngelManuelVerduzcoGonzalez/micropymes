import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ProductoService } from 'src/services/producto/producto.service';
import { ClienteService } from 'src/services/cliente/cliente.service';

@Component({
  selector: 'app-ventas-modal',
  templateUrl: './ventas-modal.component.html',
  styleUrls: ['./ventas-modal.component.scss'],
})
export class VentaModalComponent implements OnInit {
  @Input() venta: any;
  prods: any[] = [];
  clients: any[] = [];
  producto: any;
  cliente: any;
  cantidad: number = 0;
  precio: number = 0; // Se calcula automáticamente
  costo: number = 0; // Se calcula automáticamente
  isEditing: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private prodSrvc: ProductoService,
    private clientSrvc: ClienteService
  ) {}

  ngOnInit() {
    this.prodSrvc.getProductos().subscribe((res) => {
      this.prods = res;
    });

    this.clientSrvc.getClientes().subscribe((res) => {
      this.clients = res;
    });

    if (this.venta) {
      this.producto = this.venta.Producto.id;
      this.cliente = this.venta.Cliente.id;
      this.cantidad = this.venta.cantidad;
      this.precio = this.venta.precio_venta;
      this.costo = this.venta.costo_total;
      this.isEditing = true;
    }
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  // Actualiza el precio y costo cuando se selecciona un producto o cambia la cantidad
  actualizarPrecioYCosto() {
    if (this.producto) {
      const selectedProduct = this.prods.find((p) => p.id === this.producto);
      if (selectedProduct) {
        this.precio = selectedProduct.precio_venta; // Obtiene el precio del producto
        this.costo = this.precio * this.cantidad; // Calcula el costo total
      }
    }
  }

  guardar() {
    if (this.producto && this.cliente && this.cantidad > 0 && this.costo > 0) {
      const datos = {
        idProducto: this.producto,
        idCliente: this.cliente,
        cantidad: this.cantidad,
        precio_venta: this.precio,
        costo_total: this.costo,
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
