import { Component }  from '@angular/core';

import { Empleado } from './shared/model/empleado.entity';
import { IndexedDBService } from './shared/services/indexeddb.service';

@Component({
    selector: 'simple-master-detail',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'] 
})
class AppComponent { 
    constructor(private idbservice: IndexedDBService) { }

    initializeIDB(): void {
        this.idbservice.initializeIDB().then(
            result => {
                console.log(result); 
                alert('finalizado'); 
            }
        )
        .catch(
            error => {
                console.log(error); 
                alert('error'); 
            }
        );
    }

    agregarEmpleados(): void {
        this.idbservice.add(new Empleado('10', '04087802-9', 'Luis Gustavo', 'Fernández Batres', new Date(Date.now()), 1))
            .then(result => {
                if (result) console.log('exito add');
                else console.error('no exito add'); 
            })
            .catch(error => {
                console.log(error);
                console.log('error add');
            });
    }
}

export { AppComponent };