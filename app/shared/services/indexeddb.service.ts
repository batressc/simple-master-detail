import { Injectable } from '@angular/core';

import 'modernizr';

/** Indica los status controlados de eventos de indexedDB */
enum IndexedDBStatus {
    /** No soportado */
    NOT_SUPPORTED,
    /** Exito */
    SUCCESS,
    /** Error */
    FAIL
}

@Injectable()
class IndexedDBService {
    private idb: IDBOpenDBRequest;
    private db: IDBDatabase;
    private idbName: string;

    constructor() { 
        this.idbName = 'ba3-simple-master-detail';
    }

    /** Permite inicializar la base de datos IndexedDB o indicar que no es soportada */
    initializeIDB(): Promise<IndexedDBStatus> {
        return new Promise<IndexedDBStatus>((resolve, reject) => {
            if (Modernizr.indexeddb) {
                this.idb = indexedDB.open(this.idbName);
                
                this.idb.onsuccess = (event: any) => {
                    this.db = <IDBDatabase>event.target.result;
                    console.log(`DataStore "${this.db.name}" creado exitosamente`);
                };

                this.idb.onerror = (event: Event) => {
                    if (!this.idb) console.error('No se puedo acceder a la base de datos');
                    else console.error('No se pudo generar la base de datos');
                    reject(IndexedDBStatus.FAIL);
                };

                this.idb.onblocked = (event: Event) => {
                    console.log('bloqueada');
                    console.log(event);
                };

                this.idb.onupgradeneeded = (event: Event) => {
                    this.generateStructure()
                        .then(result => {
                            if (result) {
                                console.log(`Estructura del DataStore "${this.db.name}" generada exitosamente`);
                                resolve(IndexedDBStatus.SUCCESS);
                            } else {
                                console.error(`No se pudo generar la estructura del DataStore "${this.db.name}". Favor borrarla de forma manual`);
                                reject(IndexedDBStatus.FAIL);
                            }
                        })
                };
            } else {
                console.log('IndexedDB no es soportado en el navegador');
                reject(IndexedDBStatus.NOT_SUPPORTED);
            }
        });
    }

    /** Crea la estructura de datos de la base de datos */
    private generateStructure(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            debugger;
            if (this.db) {
                let obEmpleado = this.db.createObjectStore('Empleado', { keyPath: 'id' });
                obEmpleado.createIndex('idx_Empleado_dui', 'dui', { unique: true });
                obEmpleado.createIndex('idx_Empleado_name', 'name', { unique: false });
                obEmpleado.createIndex('idx_Empleado_apellido', 'apellido', { unique: false });
                resolve(true);

                this.db.onerror = (event: Event) => {
                    debugger;
                    reject(false);
                };
            } else {
                console.error(`No hay un DataStore disponible para generar su estructura`);
                reject(false);
            }
        });
    }

    /** Verifica si la estructura de la base de datos es correcta (cuando solo se abre la base) */
    private validateStructure(): Promise<boolean> {
        return Promise.resolve(true);
    }
}

export { IndexedDBStatus, IndexedDBService }