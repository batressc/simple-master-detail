import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

import { IndexedDBService } from './shared/services/indexeddb.service';  

@Injectable()
class IndexedDBGuard implements CanActivate {
    constructor(private idbservice: IndexedDBService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.idbservice.isValid()) return true;
        else {
            this.router.navigate(['/datastore'], { skipLocationChange: true });
            return false;
        }
    }
}

export { IndexedDBGuard }