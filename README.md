# Brazilin Wordle API

Api usada para recriar o Wordle na lingua portuguesa.
https://brazillian-wordle-api.vercel.app/

## Índice

- [Rotas](#rotas)
- [Exemplos](#exemplos)
- [Banco de dados](#banco)

## rotas

GET https://brazillian-wordle-api.vercel.app/valid/:word - Valida uma palavra.
POST https://brazillian-wordle-api.vercel.app/update-daily-word - Altera a palavra diária.

## Exemplos

### 1-Validar palavra

**Endpoint:** `GET https://brazillian-wordle-api.vercel.app/valid/:word`

**Parâmetros:**
- `word` (obrigatório): Palavra a ser validada.

**Descrição:** 
Valida se a palavra existe no dicionário, se existir checa letra por letra comparando com a palavra diária e retornando o status para cada letra.

**Exemplo de Uso:**
`GET https://brazillian-wordle-api.vercel.app/valid/ASSAD`
- Resposta para palavra não encontrada no dicionário
{
    "error": "Word not found in dictionary"
}
- Resposta para palavra encontrada no dicionário com respectivo status por letra
{
    "results": {
        "0": "wrong",
        "1": "wrong",
        "2": "displaced",
        "3": "wrong",
        "4": "displaced"
    }
}

### 2-Atualizar palavra do dia

**Endpoint:** `PUT https://brazillian-wordle-api.vercel.app/update-daily-word`

**Descrição:** 
Altera a palavra do dia selecionando aleatoriamente uma palavra da tabela random-words.
Esse end-point esta vinculado ao Cron-job para ser executado todo dia as 00:00 horário de Brasilia.

**Exemplo de Uso:**
`PUT https://brazillian-wordle-api.vercel.app/update-daily-word`
- Palavra atualizada
{"newDailyWord":"FALSO"}

## Banco de dados

### words

**Descrição:** 
Tabela dicionário que armazena palavras validas da lingua portuguesa.

**Schema:** 
CREATE TABLE words (
word character(5)
);

### daily-word

**Descrição:** 
Tabela que armazena a palavra diária a ser descoberta.

**Schema:** 
CREATE TABLE daily_word (word character(5));

### random-words

**Descrição:** 
Tabela que armazena palavras comuns da lingua portuguesa que podem ser escolhidas para palavras do dia.

**Schema:** 
CREATE TABLE random_words (
    word  character(5)
);





