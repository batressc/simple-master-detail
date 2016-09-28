import { Injectable } from '@angular/core';

import { EMPLEADO_LIST } from '../mocks/data.mock';
import { Empleado } from '../model/empleado.entity';

@Injectable()
class MockDataService {
    getEmpleados(): Empleado[] {
        return EMPLEADO_LIST;
    }

    getEmpleadoById(id: string) {
        return EMPLEADO_LIST.find(x => x.id === id);
    }
}

export { MockDataService }
