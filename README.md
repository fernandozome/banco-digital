# Projeto API Banco Digital

Este é um repositório baseado em um desafio de programação back-end para desenvolver  
um sistema de banco, com diversas transações bancárias.
Rodando num servidor Express, as requisições são feitas por meio de cliente HTTP  
enviando um objeto JSON no body. No momento, não há persistência de dados.

## Como rodar
Após fazer o Fork e clonar este repositório, utilize o comando `npm run dev` .  

No seu cliente HTTP, adicione a senha do banco para o endpoint de listagem de contas, e número da conta e senha do usuário para os demais  
sempre como *quey params*

Aqui uso o Insomnia para exemplificar:

### Listar todas as contas  
Para listar as contas, com overbo "GET", entre a senha do banco na URL do seu host local, como `http://localhost:3000/contas?senha_banco=Cubos123Bank`
  
![listar contas](https://github.com/fernandozome/banco-digital/assets/140116853/8dff6628-7fab-4369-aa4b-0f396c7c36b2)

### Criar conta
No *body* envie informações obrigatórias como **nome, CPF, email e uma nova senha** num objeto JSON. Esta é uma rota "POST".
  
![criar conta](https://github.com/fernandozome/banco-digital/assets/140116853/8f949511-a54e-45cc-8c8d-06e059c8af50)

### Editar conta
O Objeto JSON do *body* deve conter **email, CPF e senha idênticos** aos da conta a ser modificada.  Esta é uma rota "PUT".

![editar conta](https://github.com/fernandozome/banco-digital/assets/140116853/fc2b2896-0b92-4f9e-9c6c-bdfc26d23368)

### Excluir conta
Na *query params* digite o número da conta e a respsctiva senha. Esta é uma rota "DELETE".

![excluir conta](https://github.com/fernandozome/banco-digital/assets/140116853/f0134a4b-09c5-42da-bfe7-542684daa411)

### Consultar saldo
Na rota do tipo "GET" em `/contas/saldo` digite nos *query params* o número da conta e a respectiva senha.

![Saldo de conta](https://github.com/fernandozome/banco-digital/assets/140116853/e6076f38-653c-49b4-99f4-a0c76192f0f0)

### Consultar extrato
Em `/contas/extrato`digite nos *query params* o número da conta e a respectiva senha. Esta é uma rota "GET".

![extrato de conta](https://github.com/fernandozome/banco-digital/assets/140116853/276119d1-9929-4d2d-a330-f6582ec4219e)

## Sacar de uma conta
Em `/transacoes/sacar`envie no *body* um objeto JSON com o número da conta, o valor a sacar e a senha da conta. Esta é uma rota "POST".

![Sacar de contas](https://github.com/fernandozome/banco-digital/assets/140116853/af9dd847-a2f9-4952-a8bf-8e38befb4072)

## Transferir entre contas
Em `/transacoes/transferir` envie no *body* um obejto JSON com número da conta de origem, número da conta de destino, valor e a senha da conta de origem. Esta é uma rota "POST".

![transferir de contas](https://github.com/fernandozome/banco-digital/assets/140116853/f26a9278-4aee-4a9a-854b-77ce2d8e336e)

## Depositar em uma conta
Em `/transacoes/depositar` envie no *body* um obejto JSON com número da conta e o valor a ser depositado. Esta é uma rota "POST".

![depositar em contas](https://github.com/fernandozome/banco-digital/assets/140116853/d79a792a-8a81-4b50-b89c-7884f18a2b3b)


Leia mais sobre mim em  
[![github logo](https://img.shields.io/badge/GitHub-303030?style=for-the-badge&logo=github&logoColor=white)](https://github.com/fernandozome)
