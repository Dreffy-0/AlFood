import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";
import IPrato from "../../../interfaces/IPrato";
import http from "../../../http";
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";

const FormularioPrato = () => {
	const parametros = useParams();

	const [nomePrato, setNomePrato] = useState("");
	const [descricaoPrato, setDescricaoPrato] = useState("");
	const [tagPrato, setTagPrato] = useState("");
	const [restaurantePrato, setRestaurantePrato] = useState(0);
	const [imagemPrato, setImagemPrato] = useState<File | null>(null);

	const [tags, setTags] = useState<ITag[]>([]);
	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

	useEffect(() => {
		http.get<{ tags: ITag[] }>("tags/").then(resposta =>
			setTags(resposta.data.tags),
		);
		http.get<IRestaurante[]>("restaurantes/").then(resposta =>
			setRestaurantes(resposta.data),
		);
	}, []);

	useEffect(() => {
		if (parametros.id) {
			http.get<IPrato>(`/pratos/${parametros.id}/`).then(resposta => {
				setNomePrato(resposta.data.nome);
				setDescricaoPrato(resposta.data.descricao);
				setTagPrato(resposta.data.tag);
				setRestaurantePrato(resposta.data.restaurante);
			});
		}
	}, [parametros]);

	const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
		if (evento.target.files?.length) {
			setImagemPrato(evento.target.files[0]);
		} else {
			setImagemPrato(null);
		}
	};

	const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault();

		const formData = new FormData();
		formData.append("nome", nomePrato);
		formData.append("descricao", descricaoPrato);
		formData.append("tag", tagPrato);
		formData.append("restaurante", restaurantePrato.toString());
		if (!parametros.id && imagemPrato) {
			formData.append("imagem", imagemPrato);
		}

		const url = parametros.id ? `pratos/${parametros.id}/` : "pratos/";
		const method = parametros.id ? "PUT" : "POST";

		http.request({
			url,
			method,
			headers: {
				"Content-Type": "multipart/form-data",
			},
			data: formData,
		})
			.then(() => {
				if (parametros.id) {
					alert("Prato atualizado com sucesso!");
				} else {
					setNomePrato("");
					setDescricaoPrato("");
					setTagPrato("");
					setRestaurantePrato(0);
					setImagemPrato(null);
					alert("Prato cadastrado com sucesso!");
				}
			})
			.catch(erro => console.log(erro));
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				flexGrow: 1,
			}}
		>
			<Typography component="h1" variant="h6">
				Formulário de Pratos
			</Typography>
			<Box
				component="form"
				sx={{ width: "100%" }}
				onSubmit={aoSubmeterForm}
			>
				<TextField
					value={nomePrato}
					onChange={evento => setNomePrato(evento.target.value)}
					label="Nome do Prato"
					variant="standard"
					fullWidth
					margin="dense"
					required
				/>
				<TextField
					value={descricaoPrato}
					onChange={evento => setDescricaoPrato(evento.target.value)}
					label="Descrição do Prato"
					variant="standard"
					fullWidth
					margin="dense"
					required
				/>
				<FormControl margin="dense" fullWidth>
					<InputLabel id="select-tag">Tag</InputLabel>
					<Select
						labelId="select-tag"
						value={tagPrato}
						onChange={evento => setTagPrato(evento.target.value)}
					>
						{tags.map(tag => (
							<MenuItem key={tag.id} value={tag.value}>
								{tag.value}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl margin="dense" fullWidth>
					<InputLabel id="select-restaurante">Restaurante</InputLabel>
					<Select
						labelId="select-restaurante"
						value={restaurantePrato}
						onChange={evento =>
							setRestaurantePrato(Number(evento.target.value))
						}
						required
					>
						{restaurantes.map(restaurante => (
							<MenuItem
								key={restaurante.id}
								value={restaurante.id}
							>
								{restaurante.nome}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				{!parametros.id && (
					<input type="file" onChange={selecionarArquivo} />
				)}
				<Button
					type="submit"
					variant="outlined"
					sx={{ marginTop: 1 }}
					fullWidth
				>
					Salvar
				</Button>
			</Box>
		</Box>
	);
};

export default FormularioPrato;
