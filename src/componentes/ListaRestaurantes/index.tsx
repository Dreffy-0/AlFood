import { useEffect, useState } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import axios from "axios";
import { IPaginacao } from "../../interfaces/IPaginacao";

interface IParametrosBusca {
	ordering?: string;
	search?: string;
}

const ListaRestaurantes = () => {
	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
	const [proxPagina, setProxPagina] = useState("");
	const [busca, setBusca] = useState("");
	const [ordenador, setOrdenador] = useState("");

	useEffect(() => {
		axios
			.get<IPaginacao<IRestaurante>>(
				"http://localhost:8000/api/v1/restaurantes/",
			)
			.then(resposta => {
				setRestaurantes(resposta.data.results);
				setProxPagina(resposta.data.next);
			})
			.catch(erro => {
				console.log(erro);
			});
	}, []);

	const verMais = () => {
		axios
			.get<IPaginacao<IRestaurante>>(proxPagina)
			.then(resposta => {
				setRestaurantes([...restaurantes, ...resposta.data.results]);
				setProxPagina(resposta.data.next);
			})
			.catch(erro => {
				console.log(erro);
			});
	};

	const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault();
		const opcoes = {
			params: {} as IParametrosBusca,
		};
		if (busca) {
			opcoes.params.search = busca;
		}
		if (ordenador) {
			opcoes.params.ordering = ordenador;
		}
		axios
			.get<IPaginacao<IRestaurante>>(
				"http://localhost:8000/api/v1/restaurantes/",
				opcoes,
			)
			.then(resposta => setRestaurantes(resposta.data.results))
			.catch(erro => console.log(erro));
	};

	return (
		<section className={style.ListaRestaurantes}>
			<div className={style.ListaRestaurantes__header}>
				<h1>
					Os restaurantes mais <em>bacanas</em>!
				</h1>
				<form
					onSubmit={buscar}
					className={style.ListaRestaurantes__filtros}
				>
					<div>
						<input
							type="text"
							value={busca}
							placeholder="Nome do restaurante"
							onChange={evento => setBusca(evento.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="select-ordenacao">Ordenação: </label>
						<select
							name="select-ordenacao"
							id="select-ordenacao"
							value={ordenador}
							onChange={evento =>
								setOrdenador(evento.target.value)
							}
						>
							<option value="">Padrão</option>
							<option value="id">Por ID</option>
							<option value="nome">Por nome</option>
						</select>
					</div>
					<div>
						<button type="submit">Buscar</button>
					</div>
				</form>
			</div>
			{restaurantes?.map(item => (
				<Restaurante restaurante={item} key={item.id} />
			))}
			{proxPagina && <button onClick={verMais}>Ver mais</button>}
		</section>
	);
};

export default ListaRestaurantes;
