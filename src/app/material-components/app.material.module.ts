import { NgModule } from '@angular/core';
import { MdDatepickerModule,
         MdRadioModule,
         MdChipsModule,
         MdToolbarModule,
         MdButtonModule,
         MdCardModule,
         MdInputModule,
         MdSnackBarModule,
         MdMenuModule,
         MdSidenavModule } from '@angular/material';

@NgModule({
  imports: [MdDatepickerModule,
            MdRadioModule,
            MdChipsModule,
            MdToolbarModule,
            MdButtonModule,
            MdCardModule,
            MdInputModule,
            MdSnackBarModule,
            MdMenuModule,
            MdSidenavModule],
  exports: [MdDatepickerModule,
            MdRadioModule,
            MdChipsModule,
            MdToolbarModule,
            MdButtonModule,
            MdCardModule,
            MdInputModule,
            MdSnackBarModule,
            MdMenuModule,
            MdSidenavModule],
})
export class MaterialComponents {}
