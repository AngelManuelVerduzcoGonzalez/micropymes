import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ProveedorService } from 'src/services/proveedor/proveedor.service';

@Component({
  selector: 'app-productos-modal',
  templateUrl: './productos-modal.component.html',
  styleUrls: ['./productos-modal.component.scss'],
})
export class ProductosModalComponent implements OnInit {
  @Input() producto: any;
  provs: any = [];

  nombre: string = '';
  desc: string = '';
  cant: number = 0;
  costo: number = 0;
  venta: number = 0;
  img: string = '';
  proveedor: string = '';
  isEditing: boolean = false; // Flag para saber si estamos editando

  constructor(private modalCtrl: ModalController, private alertController: AlertController, private provSrvc: ProveedorService) {}

  ngOnInit() {
    this.provSrvc.getProveedores().subscribe((res) =>
      {
        this.provs = res;
      });
    if (this.producto) {
      // Inicializar para edición si los datos están presentes
      this.nombre = this.producto.nombre;
      this.desc = this.producto.descripcion;
      this.cant = this.producto.cantidad;
      this.costo = this.producto.precio_costo;
      this.venta = this.producto.precio_venta;
      this.img = this.producto.url;
      this.proveedor = this.producto.idProveedor;
      this.isEditing = true;
    }
  }


  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  guardar() {
    if (this.nombre !== '' && this.proveedor !== '') {
      const datos = {
        nombre: this.nombre,
        descripcion: this.desc,
        cantidad: this.cant,
        precio_costo: this.costo,
        precio_venta: this.venta,
        url: this.img,
        idProveedor: this.proveedor,
        codigo: 0,
        isEditing: this.isEditing // Indicamos si fue edición o nuevo registro
      };

      // Cerrar el modal y enviar los datos
      this.modalCtrl.dismiss(datos);
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
