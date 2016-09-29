import { Component }  from '@angular/core';

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
}

export { AppComponent };