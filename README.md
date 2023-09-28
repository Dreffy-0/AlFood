# Alfood

O Alfood é um site que lista restaurantes e pratos do menu.
É um MVP que tá só começando e ainda tem muitas funcionalidades novas para serem desenvolvidas.

<img src="screencapture.png" alt="Imagem do Alfood" width="50%">

## 🔨 Funcionalidades do projeto

O Alfood começa com uma listagem estática de seu conteúdo e é esse o problema que queremos resolver.
No decorrer do curso, foi implementado a listagem dos pratos e dos restaurantes utilizando uma API, além de uma área administrativa para gerenciar o conteudo do site.

## ✔️ Técnicas e tecnologias utilizadas

Se liga nessa lista de tudo que usaremos nesse treinamento:

- `React`
- `React Hooks`
- `TypeScript`
- `axios`

## 🛠️ Abrir e rodar o projeto

Para abrir e rodar o projeto, execute ```npm i``` para instalar as dependências e ```npm start``` para inicar o projeto. Lembre de separar o projeto e a API antes de iniciar o projeto.

Depois, acesse <a href="http://localhost:3000/">http://localhost:3000/</a> no seu navegador.

Tambem será preciso executar a API. Para fazer isso, será preciso o docker instalado no seu computador e a pasta onde vai estar a API vai estar disponivel em uma pasta dentro do projeto com o nome de API.

Caso não tenha o docker instalado, acesse o site clicando <a href="https://www.docker.com">aqui</a>.

Com o docker instalado no seu dispositvo, execute o ```docker-compose build``` para ele baixar as imagens nescessárias e configurar todo o container e ```docker-compose up``` para iniciar a api.

Para visualizar a parte administrativa do projeto, acesse <a href="http://localhost:3000/admin">http://localhost:3000/admin</a> no seu navegador.

<!--? Listagem dos restaurantes com paginação

interface IParametrosBusca {
	ordering?: string
	search?: string
}

const ListaRestaurantes = () => {
	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
	const [proxPagina, setProxPagina] = useState("");
	const [paginaAnterior, setPaginaAnterior] = useState("");
	const [busca, setBusca] = useState("");
	const [ordenacao, setOrdenacao] = useState('');

	const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
		axios
			.get<IPaginacao<IRestaurante>>(url, opcoes)
			.then(resposta => {
				setRestaurantes(resposta.data.results);
				setProxPagina(resposta.data.next);
				setPaginaAnterior(resposta.data.previous);
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
		if (ordenacao) {
      		opcoes.params.ordering = ordenacao
    	}
		carregarDados("http://localhost:8000/api/v1/restaurantes/", opcoes);
	};

	useEffect(() => {
		carregarDados("http://localhost:8000/api/v1/restaurantes/");
	}, []);

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
			{
				<button
					onClick={() => carregarDados(paginaAnterior)}
					disabled={!paginaAnterior}
				>
					Página anterior
				</button>
			}
			{proxPagina && (
				<button
					onClick={() => carregarDados(proxPagina)}
					disabled={!proxPagina}
				>
					Proxima página
				</button>
			)}
		</section>
	);
};

export default ListaRestaurantes;
 -->
