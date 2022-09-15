import { Component, OnInit } from '@angular/core';
import { PendingDish } from '../../models/pending-dish.model';
import { WebsocketService } from '../../services/socket.service';
import { ReadyDish } from '../../models/ready-dish.model';
import { SentSocket } from '../../models/sent-socket.model';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.scss'],
})
export class KitchenComponent implements OnInit {
  public pendingDishes: PendingDish[] = [];
  public readyDishes: ReadyDish[] = [];

  constructor(private webSocketService: WebsocketService) {}

  ngOnInit() {
    this.webSocketService.messages.subscribe((msg: SentSocket) => {
      if (msg.type && msg.type === 'SolicitudDePlatos') {
        this.updateData(msg);
      }
    });
  }

  public onReadyDish(pendingDish: PendingDish): void {
    const currentdate = new Date();
    const tableId = pendingDish.tableId;
    const name = pendingDish.name;
    const units = pendingDish.units;
    const checkIn = pendingDish.checkIn;
    const command = {
      units: units,
      name: name,
      tableId: tableId,
      checkIn: checkIn,
      checkOut:
        currentdate.getHours() +
        ':' +
        currentdate.getMinutes() +
        ':' +
        currentdate.getSeconds(),
    };
    for (let i = 0; i < this.pendingDishes.length; i++) {
      const dish = this.pendingDishes[i];
      if (
        dish.name === name &&
        dish.checkIn === checkIn &&
        dish.tableId === tableId
      ) {
        this.pendingDishes.splice(i, 1);
        break;
      }
    }
    this.readyDishes.push(command);
    const dish = {
      nombre: name,
      unidades: units,
    };

    const message: SentSocket = {
      tipo: 'platoListo',
      id: tableId,
      plato: dish,
    };
    this.webSocketService.messages.next(message);
  }

  private updateData(command: any): void {
    const currentdate = new Date();
    for (const dish of command.platos) {
      const comandaEnviada = {
        units: dish.unidades,
        name: dish.nombre,
        tableId: command.id,
        checkIn:
          currentdate.getHours() +
          ':' +
          currentdate.getMinutes() +
          ':' +
          currentdate.getSeconds(),
      };
      this.pendingDishes.push(comandaEnviada);
    }
  }
}
