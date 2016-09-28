import { Sexo } from './sexo.enum';
import { Direccion } from './direccion.entity';

class Empleado {
    constructor(public id: string, public dui: string, public nombre: string, public apellido: string, public fechaNacimiento: Date, public sexo: Sexo, public residencia: Direccion) { }
}

export { Empleado }