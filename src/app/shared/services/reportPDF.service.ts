import { Injectable } from '@angular/core';
import * as printJS from 'print-js'
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class ReportPDFService {

  constructor(private popup: MessagesService) { }

  private rowsTicket(list: any): string {
    let rows = '';
    list.forEach(item => {
      rows += `<tr><th class="ticketCant">${item.amount}</th><th class="description">${item.name}</th><th class="ticketCell">₡${item.total}</th></tr>`
    });
    return rows;
  }

  private cssTicket(): string {
    return `
* {
font-size: 12px;
font-family: 'Times New Roman';
}

td,
th,
tr,
table {
border-top: 1px solid black;
border-collapse: collapse;
}

td.decription,
th.description {
width: 75px;
max-width: 75px;
}

td.ticketCell,
th.ticketCell {
width: 40px;
max-width: 40px;
word-break: break-all;
}

td.ticketCant,
th.ticketCant {
width: 20px;
max-width: 20px;
word-break: break-all;
}

.center {
text-align: center;
align-content: center;
}

.ticket {
width: 170px;
max-width: 170px;
}

img {
max-width: inherit;
width: inherit;
}
`;
  }

  private ticket(data: any): string {
    return `<div class="ticket">
              <p class="center">Ticket ${data.num}
                <br>${data.buyer}
                <br>${data.date}
                <br> ${data.hour}
                <br>${data.total}
              </p>
            <table>
              <thead>
                <tr>
                  <th class="ticketCant">Cant.</th>
                  <th class="description">Descripción</th>
                  <th class="ticketCell">Total</th>
                </tr>
              </thead>
              <tbody>
              ${this.rowsTicket(data.products)}
              </tbody>
            </table>
        <p class="center">¡GRACIAS POR SU COMPRA!</p>
    </div>`
  }

  private rowsPDF(list: any): string {
    let rows = '';
    list.forEach(item => {
      rows += `<tr><th class="center aligned">${item.amount}</th><th>${item.name}</th><th>₡${item.price}</th><th>₡${item.total}</th></tr>`
    });
    return rows;
  }

  private bodyPDF(data: any) {
    return `<table class="ui table blue">
    <thead>
        <tr>
            <th class="center aligned">Cant.</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Monto</th>
        </tr>
    </thead>
    <tbody>
    ${this.rowsPDF(data.products)}
    </tbody>
</table>
<div class="ui grid">
    <div class="ten wide column">
        <p>Detalles de la factura.</p>
    </div>
    <div class="six wide column">
        <br>
        <table class="ui definition table">
            <tbody>
                <tr>
                    <td>
                        Sub Total
                    </td>
                    <td class="right aligned">
                        ₡${data.sub}
                    </td>
                </tr>
                <tr>
                    <td>
                        I.V.
                    </td>
                    <td class="right aligned">
                        ${data.tax}%
                    </td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td class="right aligned">
                        ₡${data.total}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</section>`;
  }  

  private purchaseCreatePDF(data: any): string {
    return `<section>
    <div class="ui grid border">
        <div class="ten wide column">
            <ul>
                <li><b>Administrador:</b> ${data.buyer}</li>
                <li><b>Sucursal:</b> ${data.warehouse}</li>
                <li><b>Proveedor:</b> ${data.provider}</li>
                <li><b>Fecha:</b> ${data.date}</li>
                <li><b>Hora:</b> ${data.hour}</li>
                <li><b>Pedido:</b> ${data.status ? 'Procesado' : 'Pendiente'}</li>
            </ul>
        </div>
        <div class="six wide column center aligned">
            <img src="./assets/img/billLogo.png" width="120px" height="120px">
        </div>
    </div>
    ${this.bodyPDF(data)}`;
  }

  private saleCreatePDF(data: any): string {
    return `<section>
    <div class="ui grid border">
        <div class="ten wide column">
            <ul>
                <li><b>Vendedor:</b> ${data.buyer}</li>
                <li><b>Cliente:</b> ${data.client}</li>
                <li><b>Fecha:</b> ${data.date}</li>
                <li><b>Hora:</b> ${data.hour}</li>
            </ul>
        </div>
        <div class="six wide column center aligned">
            <img src="./assets/img/billLogo.png" width="120px" height="120px">
        </div>
    </div>
    ${this.bodyPDF(data)}`;
  }

  createTicket(data: any) {
    printJS({
      printable: this.ticket(data),
      type: 'raw-html',
      documentTitle: `Ticket N° ${data.num}`,
      style: this.cssTicket(),
      onLoadingStart: () => this.popup.notification('info', '<span class="text-white">Creando ticket</span>', '#289AF4')
    });
  }

  async createPDF(data: any, sale = false) {
    await fetch('./assets/vendor/css/semantic.min.css')
      .then(css => css.text()).then(res => {
        printJS({
          printable: (sale)? this.saleCreatePDF(data) : this.purchaseCreatePDF(data),
          type: 'raw-html',
          documentTitle: `Factura N° ${data.num}`,
          style: res,
          onLoadingStart: () => this.popup.notification('info', '<span class="text-white">Generando PDF</span>', '#289AF4')
        });
      });
  }
}
