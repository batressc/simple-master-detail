import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadoListComponent } from './empleado-list/empleado-list.component';
import { EmpleadoDetailComponent } from './empleado-detail/empleado-detail.component';

const appRoutes: Routes = [
    { path: '', component: EmpleadoListComponent },
    { path: 'empleados', component: EmpleadoListComponent },
    { path: 'empleado/:id', component: EmpleadoDetailComponent }
];

const appRoutingProviders: any[] = [];
const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

export { appRoutingProviders, routing }