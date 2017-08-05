import { NgModule } from '@angular/core';
import { MdDatepickerModule, 
         MdRadioModule, 
         MdChipsModule, 
         MdToolbarModule, 
         MdButtonModule, 
         MdCardModule, 
         MdInputModule, 
         MdSnackBarModule,
         MdMenuModule } from '@angular/material';

@NgModule({
  imports: [MdDatepickerModule, MdRadioModule, MdChipsModule, MdToolbarModule, MdButtonModule, MdCardModule, MdInputModule, MdSnackBarModule, MdMenuModule],
  exports: [MdDatepickerModule, MdRadioModule, MdChipsModule, MdToolbarModule, MdButtonModule, MdCardModule, MdInputModule, MdSnackBarModule, MdMenuModule],
})
export class MaterialComponents { }