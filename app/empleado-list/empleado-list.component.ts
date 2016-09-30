import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Empleado } from '../shared/model/empleado.entity';
import { EMPLEADO_LIST } from '../shared/mocks/data.mock';
import { IndexedDBService } from '../shared/services/indexeddb.service';

@Component({
    selector: 'ba3-empleado-list',
    templateUrl: 'app/empleado-list/empleado-list.component.html',
    styleUrls: ['app/empleado-list/empleado-list.component.css']
})
class EmpleadoListComponent implements OnInit {
    empleados: Array<Empleado>;
    empleado: Empleado;

    constructor(private idbService: IndexedDBService, private router: Router) {
        this.empleados = [];
        this.empleado = null;
    }

    ngOnInit(): void {
        this.cargarDatos();
    }

    selectEmpleado(empleado: Empleado) {
        this.router.navigate(['/empleado', empleado.id])
    }

    agregarEmpleado(): void {
        this.router.navigate(['/empleado/nuevo']);
    }

    cargarDatos(): void {
        this.idbService.selectAll()
            .then(result => this.empleados = result)
            .catch(error => {
                console.error(error);
                alert('Error al recuperar los datos de los Empleados');
            })
    }
}

export { EmpleadoListComponent }