var residuos_data = [
    {
        categoria:1,
        nombre:'Aprovechable',
        descripcion:'',
        basuras:[
            {
                id:1,
                nombre:'Sobres/bolsas de papel',
                descripcion:'Este material es aprovechable, se puede reciclar',
                img:'sobres_bolsa_papel'
            },
            {
                id:2,
                nombre:'Hojas/cuadernos',
                descripcion:'Todo el papel se puede reciclar, recuerda no arrugarlo ni contaminarlo con alimentos',
                img:'hojas_cuadernos'
            },
            {
                id:3,
                nombre:'Metales o Chatarra',
                descripcion:'Los metales vuelven a la cadena productiva, incluso aquellos que se encuentran oxidados',
                img:'metales_chatarra'
            },
            {
                id:4,
                nombre:'Lata de aluminio',
                descripcion:'Para que sea aprovechable recuerda sacarle todo el líquido interno',
                img:'latas_aluminion'
            },
            {
                id:5,
                nombre:'Tetra pack',
                descripcion:'Para que sea aprovechable recuerda sacarle todo el líquido interno',
                img:'tetra_pack'
            },
            {
                id:6,
                nombre:'Bolsa de plástico',
                descripcion:'Las bolsas son materiales reciclables si están limpias, si es plástico que no cruje como la bolsa de leche es reciclable, solo debes retirar todo el líquido antes de depositarlo en la caneca',
                img:'bolsa_plastico'
            },
            {
                id:7,
                nombre:'Caja cartón',
                descripcion:'Este material es aprovechable, se puede reciclar',
                img:'caja_carton'
            },
            {
                id:8,
                nombre:'Botella plástica',
                descripcion:'Para que sea aprovechable recuerda sacarle todo el líquido interno',
                img:'botella_plastico'
            },
            {
                id:9,
                nombre:'Botella de vidrio',
                descripcion:'Para que sea aprovechable recuerda sacarle todo el líquido interno',
                img:'botella_vidrio'
            },
            {
                id:10,
                nombre:'Cubetas de huevos',
                descripcion:'Se pueden reutilizar o aprovecharlos como materia prima para hacer otras canastas',
                img:'cubetas_huevos'
            },
            {
                id:11,
                nombre:'Tapas metálicas o plásticas',
                descripcion:'Este material es aprovechable, se puede reciclar',
                img:'tapas_metalicas_plasticas'
            },
            {
                id:12,
                nombre:'Revistas',
                descripcion:'Las revistas y periódicos son materiales reciclables',
                img:'revistas'
            },
            {
                id:13,
                nombre:'Ganchos de cosedora',
                descripcion:'Para cuidar la salud de otras personas debes depositarlos en un pequeño contenedor con tapa en tu puesto de trabajo, una vez lo llenes se puede entregar como metálico',
                img:'ganchos_cosedora'
            },
            {
                id:14,
                nombre:'Envases de yogourt',
                descripcion:'Para que sea aprovechable recuerda sacarle todo el líquido interno',
                img:'envases_yogourt'
            }
        ]
    },
    {
        categoria:2,
        nombre:'No Aprovechable',
        descripcion:'',
        basuras:[
            {
                id:1,
                nombre:'Lápiceros/Marcadores',
                descripcion:'La gran mayoría son fabricados de elementos no reciclables, utiliza lapiceros que no sean desechables y marcadores recargables, así reduces los residuos que van al relleno sanitario',
                img:'lapiceros_marcadores'
            },
            {
                id:2,
                nombre:'CD´S',
                descripcion:'Es un residuo que no se recicla, ni se reusa, debe ir a un relleno sanitario, te recomendamos reducir o eliminar su uso',
                img:'cds'
            },
            {
                id:3,
                nombre:'Cristal plano de ventanas o cuadros, espejos',
                descripcion:'',
                img:'cristal_espejos'
            },
            {
                id:4,
                nombre:'Pitillos o mezcladores plásticos',
                descripcion:'Es un residuo que no se recicla, ni se reusa, debe ir a un relleno sanitario, te recomendamos reducir o eliminar su uso',
                img:'pitillos_mezcladores_plastico'
            },
            {
                id:5,
                nombre:'Tapones de corcho',
                descripcion:'Es un residuo que no se recicla, algunas personas las utilizan como artesanías',
                img:'tapones_corcho'
            },
            {
                id:6,
                nombre:'Arena de gato',
                descripcion:'',
                img:'arena_gato'
            },
            {
                id:7,
                nombre:'Papel higiénico',
                descripcion:'',
                img:'papel_higienico'
            },
            {
                id:8,
                nombre:'Envoltura de mecatos',
                descripcion:'Es un residio que no se recicla, algunas personas las utilizan como artesanías o para llenar el ladrillo ecológico',
                img:'envoltura_mecatos'
            },
            {
                id:9,
                nombre:'Papel fotográfico',
                descripcion:'Es un residuo que no se recicla, algunas personas las utilizan como artesanías o para llenar el ladrillo ecológico',
                img:'papel_fotografico'
            },
            {
                id:10,
                nombre:'Cintas de video',
                descripcion:'Es un residuo que no se recicla, ni se reusa, debe ir a un relleno sanitario, te recomendamos reducir o eliminar su uso',
                img:'cintas_video'
            }
        ]
    },
    {
        categoria:3,
        nombre:'Orgánico',
        descripcion:'',
        basuras:[
            {
                id:1,
                nombre:'Cáscaras de frutas y verduras',
                descripcion:'Es un residuo orgánico que se aprovecha para fabricar abono orgánico',
                img:'cascaras_frutas_verduras'
            },
            {
                id:2,
                nombre:'Sobras de alimentos',
                descripcion:'Es un residuo orgánico que se aprovecha para fabricar abono orgánico',
                img:'sobras_frutas'
            },
            {
                id:3,
                nombre:'Servilletas',
                descripcion:'Es un residuo orgánico que se aprovecha para fabricar abono orgánico',
                img:'servilletas'
            },
            {
                id:4,
                nombre:'Poda de plantas',
                descripcion:'Es un residuo orgánico que se aprovecha para fabricar abono orgánico',
                img:'plantas'
            },
            {
                id:5,
                nombre:'Bolsas de aromáticas y té',
                descripcion:'Es un residuo orgánico que se aprovecha para fabricar abono orgánico',
                img:'bolsas_aromaticas_te'
            }
        ]
    },
    {
        categoria:4,
        nombre:'Peligroso',
        descripcion:'',
        basuras:[
            {
                id:1,
                nombre:'Envases de desinfectantes',
                descripcion:'Todos los envases que contuvieron sustancias químicas peligrosas, también se consideran peligrosos. Los desinfectantes pueden ser inflamables, corrosivos, no se pueden mezclar entre sí y contaminantes del agua y del suelo',
                img:'envases_desinfectantes'
            },
            {
                id:2,
                nombre:'Envases de disolventes de pinturas',
                descripcion:'Todos los envases que contuvieron sustancias químicas peligrosas, también se consideran peligrosos. Los disolventes son inflamables y contaminantes del agua y del suelo',
                img:'envases_disolventes_pintura'
            },
            {
                id:3,
                nombre:'Bateria de celular',
                descripcion:'Contienen tintas altamente contaminantes del agua, además contienen elementos electrónicos que pueden ser aprovechados. Debes entregarlo en el punto de recolección más cercano a tu hogar',
                img:'bateria_celular'
            },
            {
                id:4,
                nombre:'Pilas AA - AAA',
                descripcion:'Contienen tintas altamente contaminantes del agua, además contienen elementos electrónicos que pueden ser aprovechados. Debes entregarlo en el punto de recolección más cercano a tu hogar',
                img:'pilas_aa_aaa'
            },
            {
                id:5,
                nombre:'Aceites o lubricantes de equipos',
                descripcion:'Al verterlo al agua contamina los ríos y quebradas. Debes entregarlo en el punto de recolección más cercano a tu hogar',
                img:'aceites_lubricantes_equipos'
            },
            {
                id:6,
                nombre:'Empaque de pintura',
                descripcion:'Todos los envases que contuvieron sustancias químicas peligrosas, también se consideran peligrosos. Las pinturas (base de aceite) son altamente contaminantes del agua y del suelo, y las pinturas a base de agua tienen varios colorantes que afectan el agua.',
                img:'empaque_pintura'
            },
            {
                id:7,
                nombre:'Envases de cosméticos para el cabello',
                descripcion:'Todos los envases que contuvieron sustancias químicas peligrosas, también se consideran peligrosos. Los cosméticos son contaminantes del agua y del suelo',
                img:'envases_cosmeticos_cabellos'
            },
            {
                id:8,
                nombre:'Envases de antipulgas, garrapatas',
                descripcion:'Todos los envases que contuvieron sustancias químicas peligrosas, también se consideran peligrosos. Los antipulgas y garrapatas contienen venenos o elementos tóxicos',
                img:'envases_antipulgas_garrapatas'
            },
            {
                id:9,
                nombre:'Llantas',
                descripcion:'Contienen químicos altamente contaminantes del agua, además contienen elementos electrónicos que pueden ser aprovechados. Debes entregarlo en el punto de recolección más cercano a tu hogar',
                img:'llantas'
            },
            {
                id:10,
                nombre:'Medicamentos vencidos',
                descripcion:'Al perder su vigencia se convierte en una sustancia peligrosa. Debes entregarlo en el punto de recolección más cercano a tu hogar',
                img:'medicamentos_vencidos'
            },
            {
                id:11,
                nombre:'Jeringas',
                descripcion:'Al estar contaminado con sangre se convierte en un residuo biológico. Debes entregarlo en el punto de recolección más cercano a tu hogar',
                img:'jeringas'
            },
            {
                id:12,
                nombre:'Electrodomésticos',
                descripcion:'Al perder su vida útil y si no se encuentra repuesto, los componentes electrónicos pueden aprovecharse. Debes entregarlo en el punto de recolección más cercano a tu hogar',
                img:'electrodomesticos'
            },
            {
                id:13,
                nombre:'Cartuchos de impresoras',
                descripcion:'Contienen tintas altamente contaminantes del agua, además contienen elementos electrónicos que pueden ser aprovechados. Debes entregarlo en el punto de recolección más cercano a tu hogar',
                img:'cartuchos_impresoras'
            },
            {
                id:14,
                nombre:'Bombillas / Luminarias',
                descripcion:'Contienen químicos altamente contaminantes del agua, además contienen elementos electrónicos que pueden ser aprovechados. Debes entregarlo en el punto de recolección más cercano a tu hogar',
                img:'bombillas_luminarias'
            },
            {
                id:15,
                nombre:'Aceite de Cocina',
                descripcion:'Al verterlo al agua contamina los ríos y quebradas. Debes entregarlo en el punto de recolección más cercano a tu hogar',
                img:'aceite_cocina'
            }
        ]
    }
]