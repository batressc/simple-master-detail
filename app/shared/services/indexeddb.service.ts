import { Injectable } from '@angular/core';

import { Empleado } from '../model/empleado.entity';
import 'modernizr';

/** Indica los status controlados de eventos de indexedDB */
enum IndexedDBStatus {
    /** No soportado */
    NOT_SUPPORTED,
    /** No se ha generado la estructura del DataStore */
    NOT_STRUCTURED,
    /** Exito */
    SUCCESS,
    /** DataStore bloqueado */
    BLOCKED,
    /** Error */
    FAIL
}

@Injectable()
class IndexedDBService {
    private idb: IDBOpenDBRequest;
    private db: IDBDatabase;
    private idbName: string;
    private idbVersion: number;

    constructor() { 
        this.idbName = 'ba3-simple-master-detail';
        this.idbVersion = 1;
    }

    /** Crea la estructura del DataStore */
    private generateStructure(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (this.db) {
                let obEmpleado = this.db.createObjectStore('Empleado', { keyPath: 'id' });
                obEmpleado.createIndex('idx_Empleado_dui', 'dui', { unique: true });
                obEmpleado.createIndex('idx_Empleado_name', 'nombre', { unique: false });
                obEmpleado.createIndex('idx_Empleado_apellido', 'apellido', { unique: false });
                resolve(true);

                this.db.onerror = (event: Event) => reject(false);
            } else reject(false);
        });
    }

    /** Verifica si la estructura del DataStore es correcta */
    private validateStructure(): boolean {
        if (this.db) {
            if (this.db.objectStoreNames.contains('Empleado')) return true;
            else return false;
        } else return false;
    }

    /** Permite inicializar el DataStore IndexedDB o indicar que no es soportada */
    initializeIDB(): Promise<IndexedDBStatus> {
        return new Promise<IndexedDBStatus>((resolve, reject) => {
            if (Modernizr.indexeddb) {
                this.idb = indexedDB.open(this.idbName, this.idbVersion);
                
                this.idb.onsuccess = (event: any) => {
                    this.db = <IDBDatabase>event.target.result;
                    if (this.validateStructure()) resolve(IndexedDBStatus.SUCCESS);
                    else reject(IndexedDBStatus.NOT_STRUCTURED);
                };

                this.idb.onerror = (event: ErrorEvent) => reject(IndexedDBStatus.FAIL);

                this.idb.onblocked = (event: Event) => reject(IndexedDBStatus.BLOCKED);

                this.idb.onupgradeneeded = (event: any) => {
                    this.db = <IDBDatabase>event.target.result;
                    this.generateStructure()
                        .then(result => {
                            if (result) resolve(IndexedDBStatus.SUCCESS);
                            else reject(IndexedDBStatus.NOT_STRUCTURED);
                        })
                        .catch(error => reject(IndexedDBStatus.NOT_STRUCTURED));
                };
            } else {
                reject(IndexedDBStatus.NOT_SUPPORTED);
            }
        });
    }

    /** Permite agregar un empleado */
    add(value: Empleado) {
        return new Promise<Empleado>((resolve, reject) => {
            if (this.db) {
                let transaction: IDBTransaction = this.db.transaction('Empleado', 'readwrite');
                let store: IDBObjectStore = transaction.objectStore('Empleado');
                let request: IDBRequest = store.add(value);

                request.onsuccess = (event: Event) => {
                    console.log(event);
                    resolve(value);
                };

                request.onerror = (error: ErrorEvent) => {
                    console.error(error);
                    reject(null);
                }
            } else {
                reject(null);
            }
        });
    }
}

export { IndexedDBStatus, IndexedDBService }