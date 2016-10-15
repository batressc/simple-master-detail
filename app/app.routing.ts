import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadoListComponent } from './empleado-list/empleado-list.component';
import { EmpleadoDetailComponent } from './empleado-detail/empleado-detail.component';
import { IndexedDBStatusComponent } from './indexeddb-status/indexeddb-status.component';
import { IndexedDBGuard } from './app.routing.guard';

const appRoutes: Routes = [
    { path: '', redirectTo: 'empleados', pathMatch: 'full' },
    { path: 'empleados', component: EmpleadoListComponent, canActivate: [IndexedDBGuard] },
    { path: 'empleado/:id', component: EmpleadoDetailComponent, canActivate: [IndexedDBGuard] },
    { path: 'datastore', component: IndexedDBStatusComponent},
    { path: 'empleado/nuevo', component: EmpleadoDetailComponent, canActivate: [IndexedDBGuard] }
];

const appRoutingProviders: any[] = [];
const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

export { appRoutingProviders, routing }