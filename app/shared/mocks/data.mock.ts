import { Empleado } from '../model/empleado.entity';
import { Sexo } from '../model/sexo.enum';
import { Direccion } from '../model/direccion.entity';
import * as moment from 'moment';

const EMPLEADO_LIST: Array<Empleado> = [
    new Empleado(
        '1', 
        '04087802-9', 
        'Roberto Antonio', 
        'Ruts Rats', 
        moment('19860731', 'YYYYMMDD', true).toDate(),
        Sexo.masculino, 
        new Direccion(
            'Cuidad Gótica',
            'Michigan',
            'USA',
            'Casa del Guasón'
        )
    ),
    new Empleado(
        '2', 
        '313224132-9', 
        'Exax Rutsa', 
        'Ahua', 
        moment('19831023', 'YYYYMMDD', true).toDate(),
        Sexo.masculino, 
        new Direccion(
            'Metro City',
            'Kansas',
            'USA',
            'A la par de superman'
        )
    )
];

export { EMPLEADO_LIST }