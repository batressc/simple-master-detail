import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Empleado } from '../shared/model/empleado.entity';
import { IndexedDBService } from '../shared/services/indexeddb.service';


@Component({
    selector: 'empleado-detail',
    templateUrl: 'app/empleado-detail/empleado-detail.component.html',
    styleUrls: ['app/empleado-detail/empleado-detail.component.css']
})
class EmpleadoDetailComponent implements OnInit {
    @Input()
    empleado: Empleado;

    constructor(private route: ActivatedRoute, private idbservice: IndexedDBService) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id: string = params['id'];
            this.idbservice.selectById(id)
                .then(result => this.empleado = result)
                .catch(error => {
                    console.log(error);
                    this.empleado = null;
                })
        });
    }
}

export { EmpleadoDetailComponent }