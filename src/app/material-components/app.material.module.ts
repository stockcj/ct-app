import { NgModule } from '@angular/core';
import { MdDatepickerModule, MdRadioModule, MdChipsModule, MdToolbarModule, MdButtonModule, MdCardModule, MdInputModule } from '@angular/material';

@NgModule({
  imports: [MdDatepickerModule, MdRadioModule, MdChipsModule, MdToolbarModule, MdButtonModule, MdCardModule, MdInputModule],
  exports: [MdDatepickerModule, MdRadioModule, MdChipsModule, MdToolbarModule, MdButtonModule, MdCardModule, MdInputModule],
})
export class MaterialComponents { }