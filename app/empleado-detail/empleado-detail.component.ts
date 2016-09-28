import { Component, Input } from '@angular/core';

import { Empleado } from '../shared/model/empleado.entity';

@Component({
    selector: 'empleado-detail',
    templateUrl: 'app/empleado-detail/empleado-detail.component.html',
    styleUrls: ['app/empleado-detail/empleado-detail.component.css']
})
class EmpleadoDetailComponent {
    @Input()
    empleado: Empleado;

    constructor() { }
}

export { EmpleadoDetailComponent }