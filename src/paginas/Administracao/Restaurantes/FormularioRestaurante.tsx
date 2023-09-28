import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";

const FormularioRestaurante = () => {
	const parametros = useParams();

	useEffect(() => {
		if (parametros.id) {
			http.get<IRestaurante>(`/restaurantes/${parametros.id}/`).then(
				resposta => setNomeRestaurante(resposta.data.nome),
			);
		}
	}, [parametros]);

	const [nomeRestaurante, setNomeRestaurante] = useState("");

	const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault();
		if (parametros.id) {
			http.put(`/restaurantes/${parametros.id}/`, {
				nome: nomeRestaurante,
			}).then(() => {
				alert("Restaurante atualizado com sucesso!");
			});
		} else {
			http.post("/restaurantes/", {
				nome: nomeRestaurante,
			}).then(() => {
				alert("Restaurante cadastrado com sucesso!");
			});
		}
		console.log("preciso enviar dados para api:");
		console.log(nomeRestaurante);
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
				Formulário de Restaurantes
			</Typography>
			<Box
				component="form"
				sx={{ width: "100%" }}
				onSubmit={aoSubmeterForm}
			>
				<TextField
					value={nomeRestaurante}
					onChange={evento => setNomeRestaurante(evento.target.value)}
					label="Nome do Restaurante"
					variant="standard"
					fullWidth
					required
				/>
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

export default FormularioRestaurante;
