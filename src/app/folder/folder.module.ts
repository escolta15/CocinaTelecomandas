import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { AboutComponent } from './about/about.component';
import { KitchenComponent } from './kitchen/kitchen.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FolderPageRoutingModule],
  declarations: [FolderPage, AboutComponent, KitchenComponent],
})
export class FolderPageModule {}
