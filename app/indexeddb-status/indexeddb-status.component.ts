import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IndexedDBService, IndexedDBStatus } from '../shared/services/indexeddb.service';

@Component({
    selector: 'indexeddb-status',
    templateUrl: 'app/indexeddb-status/indexeddb-status.component.html',
    styleUrls: ['app/indexeddb-status/indexeddb-status.component.css']
})
class IndexedDBStatusComponent implements OnInit {
    imageUrl: string;
    status: string;
    showRetry: boolean;
    inProcess: boolean;

    constructor(private idbservice: IndexedDBService, private router: Router) {
        this.showRetry = false;
        this.inProcess = false;
        this.imageUrl = 'assets/imgs/idb_initial.png';
        this.status = 'Verificando compatibilidad';
    }

    ngOnInit(): void {
        this.initializeDataStore();
    }

    initializeDataStore() {
        this.inProcess = true;
        this.imageUrl = 'assets/imgs/idb_generating.png';
        this.status = 'Generando';
        this.idbservice.initializeIDB()
            .then(result => {
                switch(result) {
                    case IndexedDBStatus.NOT_SUPPORTED:
                        this.imageUrl = 'assets/imgs/idb_not_enabled.png';
                        this.status = 'DataStore no es soportado por su navegador';
                    case IndexedDBStatus.NOT_STRUCTURED:
                        this.imageUrl = 'assets/imgs/idb_not_created.png';
                        this.status = 'DataStore no implementado';
                    case IndexedDBStatus.BLOCKED:
                        this.imageUrl = 'assets/imgs/idb_blocked.png';
                        this.status = 'DataStore bloqueado para su uso';
                    case IndexedDBStatus.FAIL:
                        this.imageUrl = 'assets/imgs/idb_not_created.png';
                        this.status = 'DataStore no disponible';
                    case IndexedDBStatus.SUCCESS:
                        this.imageUrl = 'assets/imgs/idb_created.png';
                        this.status = 'DataStore listo';
                        this.router.navigate(['/empleados'], { skipLocationChange: true});
                }
                if (result !== IndexedDBStatus.SUCCESS) this.showRetry = true;
                this.inProcess = false;
            })
            .catch(error => {
                this.imageUrl = 'assets/imgs/idb_not_created.png';
                this.status = 'DataStore no disponible';
                this.inProcess = false;
            });
    }
}

export { IndexedDBStatusComponent }