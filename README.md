# Framework básico para construção de servidores http integrados ao Redis e ao Mongo.

Com este micro framework é possível construir aplicações integradas as bases
redis e mongo sem nenhuna preocupação com relação ao gerenciamento de recursos.

### Estrutura básica

Os fontes da aplicação estarão localizados dentro da pasta app.<br/>
A pasta arch contem diversos arquivos que compõem o core do framework e não é recomendável alterar nada neste diretório.
O diretório se divide em 2 subdiretórios da seguinte forma:

```
config
    |_ * contém o arquivo ds.js que contem os dados de configuração com as bases de dados
src
    |_business
        |_ * contém regras de negocio
        |_ controllers
            |_ * armazea as regras de controle (ficam expostos para a camada rest da aplicação)
        |_ dao
            |_ * armazena as regras de acesso a dados
        |_ entities
            |_ * guarda as entidades da aplicação
    |_extensions
        |_ * permite adicionar extensões a estrutura base do framework (como clientes soap, socket e etc)
    |_rest
        |_ * expoem serviços rest na aplicação.
```

### Instalação e execução do projeto

Para instalar o framework basta clonar o repositório e executar a instalação das dependências:

```
git clone {path_do_projeto_no_git}
cd {diretorio_clone}
npm i
```

Feito isso o framework já estará com todas as suas dependências instaladas.<br/>
Basta agora alterar o arquivo app/config;ds.js e adicionar as configurações de conexão
com o redis e o mongo.
<br/>
* Lembre-se de alteração as configurações do arquivo .env na raiz do projeto.

#### Execução do projeto.

Para inicializar o projeto para executar o arquivo index.js

```
node index.js
```
