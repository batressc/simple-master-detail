import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { EmpleadoListComponent } from './empleado-list/empleado-list.component';
import { EmpleadoDetailComponent } from './empleado-detail/empleado-detail.component';
import { IndexedDBStatusComponent } from './indexeddb-status/indexeddb-status.component';
import { MockDataService } from './shared/services/mock-data.service';
import { IndexedDBService } from './shared/services/indexeddb.service';
import { IndexedDBGuard } from './app.routing.guard';


@NgModule({
    imports: [BrowserModule, FormsModule, routing],
    declarations: [AppComponent, EmpleadoListComponent, EmpleadoDetailComponent, IndexedDBStatusComponent],
    providers: [appRoutingProviders, IndexedDBGuard, MockDataService, IndexedDBService],
    bootstrap: [AppComponent]
})
class AppModule { }

export { AppModule };
