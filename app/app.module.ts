import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EmpleadoListComponent } from './empleado-list/empleado-list.component';
import { EmpleadoDetailComponent } from './empleado-detail/empleado-detail.component';

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [AppComponent, EmpleadoListComponent, EmpleadoDetailComponent],
    bootstrap: [AppComponent]
})
class AppModule { }

export { AppModule };
