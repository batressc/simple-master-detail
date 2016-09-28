import { Component } from '@angular/core';
import { Empleado } from '../shared/model/empleado.entity';
import { EMPLEADO_LIST } from '../shared/mocks/data.mock';

@Component({
    selector: 'ba3-empleado-list',
    templateUrl: 'app/empleado-list/empleado-list.component.html',
    styleUrls: ['app/empleado-list/empleado-list.component.css']
})
class EmpleadoListComponent {
    empleados: Array<Empleado>;
    empleado: Empleado;

    constructor() {
        this.empleados = EMPLEADO_LIST;
        this.empleado = null;
    }

    selectEmpleado(empleado: Empleado) {
        this.empleado = empleado;
    }
}

export { EmpleadoListComponent }