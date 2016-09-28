import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { EmpleadoListComponent } from './empleado-list/empleado-list.component';
import { EmpleadoDetailComponent } from './empleado-detail/empleado-detail.component';
import { MockDataService } from './shared/services/mock-data.service';


@NgModule({
    imports: [BrowserModule, FormsModule, routing],
    declarations: [AppComponent, EmpleadoListComponent, EmpleadoDetailComponent],
    providers: [appRoutingProviders, MockDataService],
    bootstrap: [AppComponent]
})
class AppModule { }

export { AppModule };
