import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Empleado } from '../shared/model/empleado.entity';
import { IndexedDBService } from '../shared/services/indexeddb.service';
import * as moment from 'moment';

@Component({
    selector: 'empleado-detail',
    templateUrl: 'app/empleado-detail/empleado-detail.component.html',
    styleUrls: ['app/empleado-detail/empleado-detail.component.css']
})
class EmpleadoDetailComponent implements OnInit {
    @Input()
    empleado: Empleado;
    isNew: boolean;

    constructor(private route: ActivatedRoute, private router: Router, private idbservice: IndexedDBService) { 
        this.isNew = false;
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id: string = params['id'];
            if (id === 'nuevo') {
                this.isNew = true;
                this.empleado = new Empleado('', '', '', '', moment(Date.now()).toDate(), 1);
            } else {
                this.idbservice.selectById(id)
                    .then(result => this.empleado = result)
                    .catch(error => {
                        console.log(error);
                        this.empleado = null;
                    });
            }
        });
    }

    private guardarAction(): void {
        this.idbservice.add(this.empleado)
            .then(result => {
                if (result) {
                    this.router.navigate(['/empleados']);
                }
            });
    }

    private modificarAction(): void {
        this.idbservice.update(this.empleado)
            .then(result => {
                if (result) {
                    this.router.navigate(['/empleados']);
                }
            });
    }

    guardar(): void {
        if (this.isNew) this.guardarAction();
        else this.modificarAction();
    }

    eliminar(): void {
        this.idbservice.delete(this.empleado)
            .then(result => {
                if (result) {
                    this.router.navigate(['/empleados']);
                }
            });
    }
}

export { EmpleadoDetailComponent }