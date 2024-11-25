import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-ticket-modal',
  templateUrl: './ticket-modal.component.html',
  styleUrls: ['./ticket-modal.component.scss'],
})
export class TicketModalComponent {
  @Input() venta: any;

  constructor(private modalCtrl: ModalController) {}

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  generarPDF() {
    const doc = new jsPDF();

    // Encabezado del ticket
    doc.setFontSize(18);
    doc.text('Ticket de Venta', 10, 10);
    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date(this.venta.createdAt).toLocaleDateString()}`, 10, 20);

    // Detalles de la venta
    doc.setFontSize(14);
    doc.text('Detalles de la Venta:', 10, 30);
    doc.setFontSize(12);
    doc.text(`Producto: ${this.venta.Producto.nombre}`, 10, 40);
    doc.text(`Cantidad: ${this.venta.cantidad}`, 10, 50);
    doc.text(`Precio Unitario: $${this.venta.precio_venta}`, 10, 60);
    doc.text(`Total: $${this.venta.costo_total}`, 10, 70);
    doc.text(`Cliente: ${this.venta.Cliente.nombre}`, 10, 80);

    // Guardar y abrir el PDF
    doc.save(`ticket-${this.venta.id}.pdf`);
  }
}
