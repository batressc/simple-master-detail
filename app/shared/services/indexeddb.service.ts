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
            let resStructure = IndexedDBStatus.SUCCESS;
            
            if (Modernizr.indexeddb) {
                this.idb = indexedDB.open(this.idbName, this.idbVersion);
                
                this.idb.onsuccess = (event: any) => {
                    this.db = <IDBDatabase>event.target.result;
                    if (resStructure === IndexedDBStatus.SUCCESS) {
                        if (this.validateStructure()) resolve(IndexedDBStatus.SUCCESS);
                        else reject(IndexedDBStatus.NOT_STRUCTURED);
                    } else reject(IndexedDBStatus.NOT_STRUCTURED);
                };

                this.idb.onerror = (event: ErrorEvent) => reject(IndexedDBStatus.FAIL);

                this.idb.onblocked = (event: Event) => reject(IndexedDBStatus.BLOCKED);

                this.idb.onupgradeneeded = (event: any) => {
                    this.db = <IDBDatabase>event.target.result;
                    this.generateStructure()
                        .then(result => {
                            if (result) resStructure = IndexedDBStatus.SUCCESS;
                            else resStructure = IndexedDBStatus.NOT_STRUCTURED;
                        })
                        .catch(error => reject(IndexedDBStatus.NOT_STRUCTURED));
                };
            } else {
                reject(IndexedDBStatus.NOT_SUPPORTED);
            }
        });
    }

    /** Indica si el DataStore esta listo para usarse */
    isValid(): boolean {
        if (this.db) return true;
        else return false;
    }

    /** Permite agregar un empleado */
    add(value: Empleado): Promise<Empleado> {
        return new Promise<Empleado>((resolve, reject) => {
            let operationResult: boolean = false;

            if (this.db) {
                let transaction: IDBTransaction = this.db.transaction('Empleado', 'readwrite');
                let store: IDBObjectStore = transaction.objectStore('Empleado');
                let request: IDBRequest = store.add(value);

                transaction.onabort = (ev: Event) => reject(null);

                transaction.onerror = (eev: ErrorEvent) => reject(null);

                transaction.oncomplete = (ev: Event) => {
                    if (operationResult) resolve(value);
                    else reject(null);
                };

                request.onsuccess = (event: Event) => {
                    operationResult = true;
                };

                request.onerror = (error: ErrorEvent) => {
                    operationResult = false;
                };
            } else {
                reject(null);
            }
        });
    }

    /** Permite borrar un empleado */
    delete(value: Empleado): Promise<Empleado> {
        return new Promise<Empleado>((resolve, reject) => {
            let operationResult: boolean = false;
            
            if (this.db) {
                let transaction: IDBTransaction = this.db.transaction('Empleado', 'readwrite');
                let store: IDBObjectStore = transaction.objectStore('Empleado');
                let request: IDBRequest = store.delete(value.id);

                transaction.onabort = (ev: Event) => reject(null);

                transaction.onerror = (eev: ErrorEvent) => reject(null);

                transaction.oncomplete = (ev: Event) => {
                    if (operationResult) resolve(value);
                    else reject(null);
                };

                request.onsuccess = (event: Event) => {
                    operationResult = true;
                };

                request.onerror = (error: ErrorEvent) => {
                    operationResult = false;
                };
            } else {
                reject(null);
            }
        });
    }

    /** Recupera un empleado por su ID */
    update(value: Empleado): Promise<Empleado> {
        return new Promise<Empleado>((resolve, reject) => {
            let operationGet: Empleado = null;
            let operationResult: boolean = false;
            
            if (this.db) {
                let transaction: IDBTransaction = this.db.transaction('Empleado', 'readwrite');
                let store: IDBObjectStore = transaction.objectStore('Empleado');
                let request: IDBRequest = store.get(value.id);

                transaction.onabort = (ev: Event) => reject(null);

                transaction.onerror = (eev: ErrorEvent) => reject(null);

                transaction.oncomplete = (ev: Event) => {
                    if (operationResult) resolve(value);
                    else reject(null);
                };

                request.onsuccess = (event: Event) => {
                    operationGet = request.result;
                    if (operationGet) {
                        for (let property in operationGet) {
                            if (operationGet.hasOwnProperty(property) && property != 'id') {
                                operationGet[property] = value[property]; 
                            }   
                        }
                        let requestUpdate: IDBRequest = store.put(operationGet);

                        requestUpdate.onsuccess = (ev: Event) => {
                            operationResult = true;
                        };

                        requestUpdate.onerror = (eev: ErrorEvent) => {
                            operationResult = false;
                        };
                    }
                };

                request.onerror = (error: ErrorEvent) => {
                    operationResult = false;
                };
            } else {
                reject(null);
            }
        });
    }

    /** Recupera un empleado por su ID */
    selectById(id: string): Promise<Empleado> {
        return new Promise<Empleado>((resolve, reject) => {
            let operationResult: Empleado = null;
            
            if (this.db) {
                let transaction: IDBTransaction = this.db.transaction('Empleado', 'readonly');
                let store: IDBObjectStore = transaction.objectStore('Empleado');
                let request: IDBRequest = store.get(id);

                transaction.onabort = (ev: Event) => reject(null);

                transaction.onerror = (eev: ErrorEvent) => reject(null);

                transaction.oncomplete = (ev: Event) => {
                    if (operationResult) resolve(operationResult);
                    else reject(null);
                };

                request.onsuccess = (event: Event) => {
                    operationResult = request.result;
                };

                request.onerror = (error: ErrorEvent) => {
                    operationResult = null;
                };
            } else {
                reject(null);
            }
        });
    }

    /** Recupera todos los elementos del DataStore */
    selectAll(returnPartial: boolean = true): Promise<Array<Empleado>> {
        return new Promise<Array<Empleado>>((resolve, reject) => {
            let operationResult: Array<Empleado> = [];
            
            if (this.db) {
                let transaction: IDBTransaction = this.db.transaction('Empleado', 'readonly');
                let store: IDBObjectStore = transaction.objectStore('Empleado');
                let request: IDBRequest = store.openCursor();

                transaction.onabort = (ev: Event) => reject(null);

                transaction.onerror = (eev: ErrorEvent) => reject(null);

                transaction.oncomplete = (ev: Event) => {
                    if (operationResult) resolve(operationResult);
                    else reject(null);
                };

                request.onsuccess = (event: any) => {
                    let cursor: IDBCursorWithValue = event.target.result;
                    if (cursor) {
                        operationResult.push(cursor.value);
                        cursor.continue();
                    } 
                };

                request.onerror = (error: ErrorEvent) => {
                    if (returnPartial) reject(operationResult)
                    reject(null);
                };
            } else {
                reject(null);
            }
        });
    }
}

export { IndexedDBStatus, IndexedDBService }