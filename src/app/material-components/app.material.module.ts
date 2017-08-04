import { NgModule } from '@angular/core';
import { MdDatepickerModule, MdRadioModule, MdChipsModule, MdToolbarModule, MdButtonModule, MdCardModule, MdInputModule, MdSnackBarModule } from '@angular/material';

@NgModule({
  imports: [MdDatepickerModule, MdRadioModule, MdChipsModule, MdToolbarModule, MdButtonModule, MdCardModule, MdInputModule, MdSnackBarModule],
  exports: [MdDatepickerModule, MdRadioModule, MdChipsModule, MdToolbarModule, MdButtonModule, MdCardModule, MdInputModule, MdSnackBarModule],
})
export class MaterialComponents { }