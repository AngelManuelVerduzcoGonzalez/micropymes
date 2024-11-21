import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  goToInventario() {
    this.router.navigate(['/productos']);
  }
  goToVentas() {
    this.router.navigate(['/ventas']);
  }
  goToClientes() {
    this.router.navigate(['/clientes']);
  }
  goToReportes() {
    this.router.navigate(['/reportes']);
  }
  goToCompras() {
    this.router.navigate(['/compras']);
  }
  goToProveedores() {
    this.router.navigate(['/proveedores']);
  }
  goToAjustes() {
    this.router.navigate(['/ajustes']);
  }
  logout() {
    this.authService.logout();
  }
}
