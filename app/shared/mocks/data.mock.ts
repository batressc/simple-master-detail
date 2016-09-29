import { Empleado } from '../model/empleado.entity';
import * as moment from 'moment';

const EMPLEADO_LIST: Array<Empleado> = [
    new Empleado('1', '04087802-9', 'Roberto Antonio', 'Ruts Rats', moment('19860731', 'YYYYMMDD', true).toDate(), 1),
    new Empleado('2', '313224132-9', 'Exax Rutsa', 'Ahua', moment('19831023', 'YYYYMMDD', true).toDate(), 0)
];

export { EMPLEADO_LIST }