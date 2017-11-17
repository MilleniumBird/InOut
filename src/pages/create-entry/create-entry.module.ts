import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateEntryPage } from './create-entry';

@NgModule({
  declarations: [
    CreateEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateEntryPage),
  ],
})
export class CreateEntryPageModule {}
