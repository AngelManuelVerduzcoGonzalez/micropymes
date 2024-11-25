import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistroModalComponent } from './register-modal/register-modal.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProveedoresModalComponent } from './proveedores-modal/proveedores-modal.component';
import { ProductosModalComponent } from './productos-modal/productos-modal.component';
import { ClientesModalComponent } from './clientes-modal/clientes-modal.component';
import { VentaModalComponent } from './ventas-modal/ventas-modal.component';
import { CompraModalComponent } from './compras-modal/compras-modal.component';
import { TicketModalComponent } from './ticket-modal/ticket-modal.component';

@NgModule({
  declarations: [AppComponent, RegistroModalComponent, ProveedoresModalComponent, ProductosModalComponent, ClientesModalComponent, VentaModalComponent, CompraModalComponent, TicketModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
