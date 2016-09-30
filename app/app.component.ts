import { Component }  from '@angular/core';

import { Empleado } from './shared/model/empleado.entity';
import { IndexedDBService } from './shared/services/indexeddb.service';

@Component({
    selector: 'simple-master-detail',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'] 
})
class AppComponent { }

export { AppComponent };