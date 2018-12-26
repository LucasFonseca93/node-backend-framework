# Framework básico para construção de servidores http integrados ao Redis e ao Mongo.

Com este micro framework é possível construir aplicações integradas as bases
redis e mongo sem nenhuna preocupação com relação ao gerenciamento de recursos.

### Estrutura básica

Dentro da pasta app estão localizados os fontes da aplicação.<br/>
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

Feito isso

### Services

#### Upload

method: POST <br/>
url: https://sisar.policiamilitar.mg.gov.br/backend/file/store
headers:
```
Authorization: "your sso token"
Content-Type: application/json
```
body:
```
{
    type: "file extension",
    content: "file base64",
    app: "application id on SISAR",
    dir: "directory to output file",
    name: "name alias for render file",
    public: false // <- boolean thats define file has public or not
}
```
response:
```
The response outputs a document generated like:
{
    "_id": "59886836e4f06e0001a0062a",
    "_name": "Biblioteca.jpg",
    "_path": "/opt/arquivos/lite/13:16:38_GMT+0000_(UTC).jpg",
    "_app": "lite",
    "_dir": "/opt/arquivos/lite/",
    "_hash": "f9c3f2a16f7da6e6135001e8f8a095af",
    "_user": "1445022",
    "_type": ".jpg",
    "_mime": "image/jpeg"
}
```

#### Info

method: GET <br/>
url: https://sisar.policiamilitar.mg.gov.br/backend/file/info/{fileId} <br/>
response: responses like the same of upload

#### Make file public

method: GET <br/>
url: https://sisar.policiamilitar.mg.gov.br/backend/file/makePublic/{fileId} <br/>
headers:
```
Authorization: "your sso token"
```
response:
```
The response outputs only a basic json like:
{
    "message": "ok"
}
```

#### Make file private

method: GET <br/>
url: https://sisar.policiamilitar.mg.gov.br/backend/file/makePrivate/{fileId} <br/>
headers:
```
Authorization: "your sso token"
```
response:
```
The response outputs only a basic json like:
{
    "message": "ok"
}
```

#### Download private files

method: GET <br/>
url: https://sisar.policiamilitar.mg.gov.br/backend/file/get/{fileId} <br/>
headers:
```
Authorization: "your sso token"
```
response:
```
The response is a file stream in case of media files and conventional download
for other files type
```

#### Download public files

method: GET <br/>
url: https://sisar.policiamilitar.mg.gov.br/backend/file/stream/{fileId} <br/>
response:
```
The response is a file stream in case of media files and conventional download
for other files type
```

### Author

* **Lucas Fonseca** 
