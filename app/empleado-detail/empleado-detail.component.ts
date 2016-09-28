import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Empleado } from '../shared/model/empleado.entity';
import { MockDataService } from '../shared/services/mock-data.service';

@Component({
    selector: 'empleado-detail',
    templateUrl: 'app/empleado-detail/empleado-detail.component.html',
    styleUrls: ['app/empleado-detail/empleado-detail.component.css']
})
class EmpleadoDetailComponent implements OnInit {
    @Input()
    empleado: Empleado;

    constructor(private route: ActivatedRoute, private mockdata: MockDataService) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id: string = params['id'];
            this.empleado = this.mockdata.getEmpleadoById(id);
        });
    }
}

export { EmpleadoDetailComponent }