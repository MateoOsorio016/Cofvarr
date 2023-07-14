import { Form, FormField } from "../../components/Form/Form";
import { Button } from "../../components/Button/Button";
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const EmpaquetadoCreate = () => {
    const navigate = useNavigate();
	const [controlErrors, setControlErrors] = useState({});
	const { error, setBodyRequest } = useFetch({url:'https://coff-v-art-api.onrender.com/api/empaquetado', method: 'POST', headers: { 'Content-Type': 'application/json' } });

	function handleRegisterEmpaquetado(e: any) {
		e.preventDefault();
		const insumo= e.target.insumo.value;
		const productoFinal= e.target.productoFinal.value;
		const cantidad= e.target.cantidad.value;
		// const fechaInicio= e.target.fechaInicio.value;
		const estado= e.target.estado.value;

            
		if (insumo === '') {
			setControlErrors({ ...controlErrors, insumo: 'El insumo es requerido' });
			return;
		} else if (productoFinal === '') {
			setControlErrors({
				...controlErrors,
				productoFinal: 'El producto final es requerido',
			});
			return;
		} else if (cantidad === '') {
			setControlErrors({ ...controlErrors, cantidad: 'La cantidad es requerida' });
			return;
		}
        Swal.fire({
			title: 'Confirmar',
			text: '¿Deseas crear el insumo?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Sí',
			cancelButtonText: 'No',
		}).then((result) => {
			if (result.isConfirmed) {
		const empaquetado={
			insumo,
			productoFinal,
			cantidad,
			fechaInicio: new Date(),
			estado
		};
        Swal.fire("Empaquetado creado con éxito!", "", "success");
		setBodyRequest(empaquetado);

		if(!error) {
			navigate('/admin/empaquetados')
		}
    }
		});
	}
    const empaquetadoFields: FormField[] = [
        {
            name: "insumo",
            type: "select",
            label: "Insumo",
            options: [
                { value: 'cafeoscuro', label: 'Café oscuro' },
                { value: 'cafemolido', label: 'Café molido' },
            ],
        },
        {
            name: "productoFinal",
            type: "select",
            label: "Producto Final",
            options: [
                { value: 'cafetostadooscuro250gr', label: 'Café tostado oscuro 250gr' },
                { value: 'cafetostadomolido500gr', label: 'Café tostado molido 500gr' },
            ],
        },
        {
            name: 'cantidad',
            type: 'number',
            label: 'cantidad',
        },
        // {
        //     name: 'fechaInicio',
        //     type: 'date',
        //     label: 'Fecha Inicio',
        // },
        {
            name: 'estado',
            type: 'select',
            label: 'Estado',
            options: [
                { value: 'EnProceso', label: 'En Proceso' },
                { value: 'Finalizado', label: 'Finalizado' },
            ],
        }
    ]

    return (
        <>
            <Form fields={empaquetadoFields}
            title='Crear Empaquetado'
            onSubmit={handleRegisterEmpaquetado}
            button={<Button text={'Registrar Empaquetado'}
            onClick={()=>null}/>} 
            errors={controlErrors}/>
        </>
    )
}
