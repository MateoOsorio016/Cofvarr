import { Form, FormField } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const PedidosEdit = () => {

	const navigate = useNavigate()

	const { id } = useParams<{ id: string }>();

	const [controlErrors, setControlErrors] = useState({});
	const { data, error, setBodyRequest, setMethodState, setUrlState } = useFetch({ url: `https://coffevart.onrender.com/api/pedidos${id}`, method: 'GET', headers: { 'Content-Type': 'application/json' } })

	const pedidos = data.pedidos || data;

	console.log(pedidos)

	function handleRegisterShop(e: any) {
		e.preventDefault();
		const Nit = e.target.Nit.value;
		const Proveedor = e.target.Proveedor.value;
		const Cantidad = e.target.Cantidad.value;
		const Telefono = e.target.Telefono.value;
        const Estado= e.target.Estado.value
        const Categoria= e.target.Categoria.value

		let pedidos = {};

		if (Nit === '') {
			pedidos = {
				_id: id,
                Nit,
                Proveedor,
                Cantidad,
                Telefono,
				Estado,
                Categoria,
			}
		} else if (Proveedor === '') {
			setControlErrors({
				...controlErrors,
				Proveedor: 'El proveedor es requerido',
			});
			return;
		} else if (Cantidad === '') {
			pedidos = {
				_id: id,
				Nit,
                Proveedor,
                Cantidad,
                Telefono,
				Estado,
                Categoria,
			}

		} else if (Telefono === '') {
			setControlErrors({ ...controlErrors, Telefono: 'El telefono es requerido' });
			return;

		} else {
			pedidos = {
				_id: id,
				Nit,
                Proveedor,
                Cantidad,
                Telefono,
				Estado,
                Categoria,
			}

			setUrlState(`https://coffevart.onrender.com/api/pedidos`);
			setMethodState('PUT');
			setBodyRequest(pedidos);

			if (!error) {
				Swal.fire({
					icon: 'success',
					title: 'Éxito',
					text: 'La compra se ha editado con éxito',
					showConfirmButton: false,
					timer: 1500,
					timerProgressBar: true,
				}).then(() => {
					navigate('/admin/compras');
				});
			}

			console.log(error);

			console.log(pedidos);
			console.log(data);

		}

		console.log(data?.ventas)
	}


		const pedidosFields: FormField[] = [
			{
                name: 'Nit',
                type: 'number',
                label: 'Nit',
            },
            {
                name: 'Proveedor',
                type: 'text',
                label: 'Proveedor',
            },
            {
                name: 'Cantidad',
                type: 'number',
                label: 'Cantidad',
            },
            {
                name: 'Telefono',
                type: 'number',
                label: 'Telefono',
            },
            {
                name: 'Categoria',
                type: 'select',
                label: 'Categoria',
                options: [
                    {value: 'Grano', label: 'Grano'},
                    {value: 'Molido', label: 'Molido'},
                ]
            },
            {
                name: 'Estado',
                type: 'select',
                label: 'Estado',
                options: [
                    {value: 'pagado', label: 'Pagado'},
                    {value: 'pendiente', label: 'Pendiente'},
                ]   
            }
		];
		return (
			<>
				<Form
					fields={pedidosFields}
					title='Editar Ventas'
					onSubmit={handleRegisterShop}

					button={<Button text={'Editar Venta'} onClick={() => null} />}
					errors={controlErrors}
					editable={true}
				/>
			</>
		);
};
