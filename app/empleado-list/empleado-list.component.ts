import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Empleado } from '../shared/model/empleado.entity';
import { EMPLEADO_LIST } from '../shared/mocks/data.mock';
import { MockDataService } from '../shared/services/mock-data.service';

@Component({
    selector: 'ba3-empleado-list',
    templateUrl: 'app/empleado-list/empleado-list.component.html',
    styleUrls: ['app/empleado-list/empleado-list.component.css']
})
class EmpleadoListComponent {
    empleados: Array<Empleado>;
    empleado: Empleado;

    constructor(private mockdata: MockDataService, private router: Router) {
        this.empleados = mockdata.getEmpleados();
        this.empleado = null;
    }

    selectEmpleado(empleado: Empleado) {
        this.router.navigate(['/empleado', empleado.id])
    }
}

export { EmpleadoListComponent }