export const motos = [
    {
        id: 1,
        marca: 'Kawasaki',
        modelo: 'Z900 A2',
        anio: 2023,
        matricula: '4821 MKL',
        kmActuales: 12400,
        aceiteRecomendado: 'Motul 7100 10W-40 (JASO MA2)',
        seguimiento: 'Cálculo estimado',
        estado: 'Al día'
    },
    {
        id: 2,
        marca: 'Yamaha',
        modelo: 'MT-125',
        anio: 2022,
        matricula: '9104 LVR',
        kmActuales: 18500,
        aceiteRecomendado: 'Yamalube 10W-40 Full Synthetic',
        seguimiento: 'Sensor OBD Bluetooth',
        estado: 'Revisión próxima'
    },
    {
        id: 3,
        marca: 'Honda',
        modelo: 'CB125R',
        anio: 2021,
        matricula: '3312 LJP',
        kmActuales: 9200,
        aceiteRecomendado: 'Honda Pro GN4 10W-30',
        seguimiento: 'Cálculo estimado',
        estado: 'Al día'
    },
    {
        id: 4,
        marca: 'KTM',
        modelo: 'Duke 125',
        anio: 2024,
        matricula: '7745 MNP',
        kmActuales: 4100,
        aceiteRecomendado: 'Motorex Formula 4T 15W-50',
        seguimiento: 'Sensor OBD Bluetooth',
        estado: 'Al día'
    },
    {
        id: 5,
        marca: 'Aprilia',
        modelo: 'RS 125',
        anio: 2020,
        matricula: '1589 KZX',
        kmActuales: 23800,
        aceiteRecomendado: 'Castrol Power1 Racing 10W-40',
        seguimiento: 'Cálculo estimado',
        estado: 'Alerta urgente'
    },
    {
        id: 6,
        marca: 'Suzuki',
        modelo: 'GSX-S125',
        anio: 2022,
        matricula: '6012 LVB',
        kmActuales: 11300,
        aceiteRecomendado: 'Ecstar R9000 10W-40',
        seguimiento: 'Cálculo estimado',
        estado: 'Al día'
    },
    {
        id: 7,
        marca: 'Zontes',
        modelo: 'U1-125',
        anio: 2023,
        matricula: '8834 MGT',
        kmActuales: 7600,
        aceiteRecomendado: 'Motul 5100 10W-40',
        seguimiento: 'Sensor OBD Bluetooth',
        estado: 'Al día'
    },
    {
        id: 8,
        marca: 'Benelli',
        modelo: 'BN 125',
        anio: 2021,
        matricula: '2190 LCK',
        kmActuales: 15400,
        aceiteRecomendado: 'Castrol Power1 10W-50',
        seguimiento: 'Cálculo estimado',
        estado: 'Revisión próxima'
    },
    {
        id: 9,
        marca: 'Kawasaki',
        modelo: 'Z125',
        anio: 2023,
        matricula: '5471 MJD',
        kmActuales: 6200,
        aceiteRecomendado: 'Elf Moto 4 Tech 10W-50',
        seguimiento: 'Sensor OBD Bluetooth',
        estado: 'Al día'
    },
    {
        id: 10,
        marca: 'Yamaha',
        modelo: 'YZF-R125',
        anio: 2020,
        matricula: '3908 KWR',
        kmActuales: 21900,
        aceiteRecomendado: 'Yamalube 10W-40 Full Synthetic',
        seguimiento: 'Cálculo estimado',
        estado: 'Alerta urgente'
    },
    {
        id: 11,
        marca: 'Ducati',
        modelo: 'Monster 125',
        anio: 2024,
        matricula: '9920 MKD',
        kmActuales: 54365,
        aceiteRecomendado: 'Shell Advance 15W-50',
        seguimiento: 'Cálculo estimado',
        estado: 'Al día'
    }
];

export const mantenimientos = [
    {
        id: 101,
        motoId: 1,
        titulo: 'Cambio de aceite y filtro',
        fecha: '2026-09-15',
        km: 12000,
        modalidad: 'DIY en casa',
        coste: 52,
        estado: 'Completado',
        notas: 'Aceite Motul 10W-40 + filtro Hiflofiltro HF303.'
    },
    {
        id: 102,
        motoId: 1,
        titulo: 'Tensión y engrase de cadena',
        fecha: '2026-11-10',
        km: 12350,
        modalidad: 'DIY en casa',
        coste: 12,
        estado: 'Completado',
        notas: 'Limpieza con queroseno y grasa de teflón.'
    },
    {
        id: 103,
        motoId: 1,
        titulo: 'Revisión pastillas de freno delanteras',
        fecha: '2026-12-01',
        km: 13000,
        modalidad: 'Taller',
        coste: 85,
        estado: 'Pendiente',
        notas: 'Comprobar desgaste antes del próximo viaje.'
    },
    {
        id: 104,
        motoId: 2,
        titulo: 'Cambio de kit de arrastre',
        fecha: '2026-11-25',
        km: 19000,
        modalidad: 'Taller',
        coste: 165,
        estado: 'Pendiente',
        notas: 'Piñón, corona y cadena reforzada DID.'
    },
    {
        id: 105,
        motoId: 2,
        titulo: 'Cambio de aceite motor',
        fecha: '2026-06-10',
        km: 15000,
        modalidad: 'DIY en casa',
        coste: 38,
        estado: 'Completado',
        notas: 'Sustituida arandela del tornillo de vaciado.'
    },
    {
        id: 106,
        motoId: 3,
        titulo: 'Revisión presión neumáticos y niveles',
        fecha: '2026-10-20',
        km: 9000,
        modalidad: 'DIY en casa',
        coste: 0,
        estado: 'Completado',
        notas: '2.0 bar delante, 2.25 bar detrás.'
    },
    {
        id: 107,
        motoId: 3,
        titulo: 'Cambio de líquido de frenos',
        fecha: '2027-01-15',
        km: 11000,
        modalidad: 'Taller',
        coste: 45,
        estado: 'Pendiente',
        notas: 'Usar DOT 4.'
    },
    {
        id: 108,
        motoId: 4,
        titulo: 'Primera revisión oficial (1.000 km)',
        fecha: '2026-05-03',
        km: 1020,
        modalidad: 'Taller',
        coste: 130,
        estado: 'Completado',
        notas: 'Sellado de garantía en concesionario oficial.'
    },
    {
        id: 109,
        motoId: 5,
        titulo: 'Cambio de bujía y filtro de aire',
        fecha: '2026-11-18',
        km: 23800,
        modalidad: 'DIY en casa',
        coste: 34,
        estado: 'Pendiente',
        notas: 'Alerta urgente por tirones en bajas revoluciones.'
    },
    {
        id: 110,
        motoId: 5,
        titulo: 'Sustitución neumático trasero',
        fecha: '2026-08-12',
        km: 21500,
        modalidad: 'Taller',
        coste: 140,
        estado: 'Completado',
        notas: 'Montado Pirelli Diablo Rosso III.'
    },
    {
        id: 111,
        motoId: 8,
        titulo: 'Revisión de reglaje de válvulas y aceite',
        fecha: '2026-12-05',
        km: 16000,
        modalidad: 'Taller',
        coste: 145,
        estado: 'Pendiente',
        notas: 'Toca revisión de los 16.000 km según manual.'
    },
    {
        id: 112,
        motoId: 10,
        titulo: 'Cambio urgente de pastillas y líquido de frenos',
        fecha: '2026-11-22',
        km: 22000,
        modalidad: 'Taller',
        coste: 95,
        estado: 'Pendiente',
        notas: 'Desgaste al límite en disco delantero.'
    }
];