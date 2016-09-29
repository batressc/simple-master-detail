import { Injectable } from '@angular/core';


@Injectable()
class IndexedDBService {
    private idb: IDBOpenDBRequest;

    constructor() {
        
    }

    crearIDB() {
        return new Promise<boolean>((resolve, reject) => {
            this.idb = indexedDB.open('test', 1);

            this.idb.onsuccess = (event: Event) => {
                console.log('IndexedDB "test" creada exitosamente');
                resolve(true);
            };

            this.idb.onerror = (event: Event) => {
                console.log('Algo pasó')
                reject(false);
            };
        })
    }
}

export { IndexedDBService }