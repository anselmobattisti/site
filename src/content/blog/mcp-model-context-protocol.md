---
titulo: "MCP: como ligar um assistente de IA aos seus dados e ferramentas"
resumo: "O que é o Model Context Protocol, como host, cliente e servidor conversam, um servidor de tarefas em Python e os cuidados de segurança antes de ligar um assistente aos seus sistemas."
data: 2026-11-22
idioma: "pt-BR"
tags: ["MCP", "IA", "engenharia de software", "Python"]
---

Este texto acompanha a aula 24 da disciplina [Desenvolvimento de Software](/teaching/2026-2-desenvolvimento-de-software/),
do IMPA Tech. Os slides completos estão no
[PDF da aula](/teaching/2026-02/desenvolvimento-de-software/aula24.pdf), e o código do exemplo, no repositório
[anselmobattisti/exemplo_mcp](https://github.com/anselmobattisti/exemplo_mcp), no GitHub.

## O problema

Um modelo de linguagem, sozinho, lê, resume e escreve texto e código, explica um erro e planeja os passos de uma
tarefa. O que ele não alcança é o seu banco de dados, os seus arquivos e a sua agenda, nem dados mais novos do que o
treinamento. E ele não age: não abre um issue, não roda um teste, não manda um e-mail.

Pergunte "tenho algum boleto vencendo esta semana?". Sozinho, o modelo só pode dar uma resposta genérica, ou inventar
uma. Ligado ao sistema do banco, ele consulta os seus boletos e pode até agendar o pagamento.

A primeira resposta a isso foram as **ferramentas** (*tool use*): a aplicação manda ao modelo a pergunta e uma lista
de funções, o modelo responde "chame `boletos_a_vencer(7)`", a aplicação executa e devolve o resultado, e o modelo
escreve a resposta. Um detalhe que vale guardar: **o modelo não executa nada**. Ele só pede; quem executa é a
aplicação.

O que sobra é um problema de escala. Sem um protocolo, cada sistema precisa de um conector para cada agente: três
sistemas (GitHub, PostgreSQL, agenda) e quatro agentes (Claude, ChatGPT, VS Code, Gemini) dão 12 conectores. Com um
protocolo comum, cada sistema publica **um servidor**, e todo agente que fala o protocolo, inclusive os que ainda vão
surgir, já consegue usá-lo. São N + M integrações em vez de N × M.

## O que é o MCP

O [Model Context Protocol](https://modelcontextprotocol.io) foi lançado pela Anthropic em novembro de 2024, como
[projeto de código aberto](https://www.anthropic.com/news/model-context-protocol). Ele define como uma aplicação de IA
descobre e usa dados, ferramentas e modelos de prompt oferecidos por outro programa.

- É uma **especificação**, como HTTP ou SQL, com SDKs oficiais em Python, TypeScript, Java, C#, Go, Rust e outras
  linguagens.
- **Não depende do modelo**: o mesmo servidor atende Claude, GPT, Gemini ou um modelo local.
- A OpenAI adotou o protocolo em março de 2025. Em dezembro de 2025, ele passou para a Agentic AI Foundation, um fundo
  da Linux Foundation criado por Anthropic, OpenAI e Block, com apoio de Google, Microsoft e AWS. Nenhuma empresa
  decide sozinha o rumo do protocolo.

## Host, cliente e servidor

São três papéis, mais o sistema de verdade:

- **Host**: o agente que a pessoa usa (o Claude Code, por exemplo). Conversa com o modelo e decide o que mostrar.
- **Cliente**: a parte do host que mantém a conexão com um servidor.
- **Servidor MCP**: o programa que traduz o MCP para o sistema. Ele não é o sistema.
- **Sistema**: o serviço ou o banco de verdade, que nem sabe que o MCP existe.

O servidor não conhece o modelo, e o modelo não fala com o servidor: quem intermedeia é o host. É também o host que
pode pedir a confirmação da pessoa antes de uma chamada, o "Permitir?" que aparece no Claude Code e no VS Code.

As mensagens são JSON-RPC, e chegam por um de dois transportes. No **stdio**, o host inicia o servidor na mesma
máquina e conversa pela entrada e saída padrão. No **Streamable HTTP**, o servidor fica numa URL, e o cliente se
autentica com OAuth. A mensagem é a mesma nos dois: dá para começar local e publicar depois, sem reescrever nada.

Um servidor oferece três primitivas:

- **Tools**: funções que o modelo pode chamar, para consultar ou para alterar dados. São as mais usadas: é por elas
  que o assistente age.
- **Resources**: dados para leitura, identificados por URI. Quem decide usá-los é a aplicação.
- **Prompts**: modelos de mensagem prontos, que a pessoa escolhe (um comando "planejar o dia").

Quando alguém pede "adicione a tarefa Estudar MCP" e o modelo decide chamar a tool, é isto que o cliente envia ao
servidor:

```json
{
  "jsonrpc": "2.0",
  "id": 7,
  "method": "tools/call",
  "params": {
    "name": "adicionar_tarefa",
    "arguments": {"titulo": "Estudar MCP"}
  }
}
```

O `id` liga a resposta à requisição. Se a tool falhar, a resposta vem com `isError` verdadeiro.

## Um servidor em Python

O exemplo da aula é um sistema de tarefas com SQLite (`tarefas.py`), que já tinha uma linha de comando para pessoas
(`main.py`). O servidor MCP é só mais uma porta de entrada para o mesmo sistema. O código completo está no
[repositório do exemplo](https://github.com/anselmobattisti/exemplo_mcp); o trecho abaixo é o essencial do servidor:

```python
from mcp.server import MCPServer
import tarefas

mcp = MCPServer("tarefas")

@mcp.tool()
def listar_pendentes() -> list[dict]:
    """Lista as tarefas que ainda não foram feitas."""
    return tarefas.pendentes()

@mcp.tool()
def adicionar_tarefa(titulo: str) -> int:
    """Cria uma tarefa e devolve o id dela."""
    return tarefas.adicionar(titulo)

if __name__ == "__main__":
    mcp.run()
```

Duas coisas acontecem sem você escrever:

- As **anotações de tipo** viram um JSON Schema: o modelo sabe que `titulo` é texto e obrigatório.
- A **docstring não é comentário**: vira a descrição que o modelo lê para decidir quando usar a tool. Nome e
  descrição ruins fazem o modelo errar.

O servidor é uma camada fina, o padrão Adapter: adapta o sistema à interface do protocolo.

Antes de ligar o servidor a um assistente, teste sem modelo nenhum. O MCP Inspector abre no navegador uma interface
que age como cliente, lista as tools e mostra as mensagens trocadas:

```bash
npx @modelcontextprotocol/inspector python servidor.py
```

Se algo falhar depois, no assistente, você já sabe que o problema não está nas tools. Para ligar ao Claude Code:

```bash
claude mcp add tarefas -- python /caminho/servidor.py
```

O servidor é o mesmo com qualquer host. Na aula, ele também roda com um modelo local (Ollama) e com um host próprio
escrito com LangChain; só o host muda.

## Como desenhar boas tools

- **Poucas e com propósito claro**: dezenas de tools parecidas confundem o modelo e gastam contexto.
- **Poucos parâmetros**: `listar_pendentes()` e `listar_concluidas()` em vez de um flag booleano.
- **Pense na tarefa, não na API**: `concluir_tarefa(id)` é melhor do que expor um `executar_sql(sql)` genérico.
- **Erros que ensinam**: "Tarefa 99 não existe" deixa o modelo se corrigir; um stack trace, não.
- **Respostas pequenas**: devolva o necessário, com paginação se a lista for grande.
- **Leitura separada de escrita**: o host pode liberar as leituras e pedir confirmação nas escritas.

## Segurança: dado que vira ordem

Para o modelo, tudo é texto: a pergunta, a descrição da tool e o que ela devolve. Um texto malicioso dentro dos dados
(um e-mail, um issue, uma página) pode ser lido como instrução. É a **injeção de prompt**.

O caso do [servidor MCP do GitHub](https://invariantlabs.ai/blog/mcp-github-vulnerability), de maio de 2025, mostra
como isso acontece:

1. O atacante abre um issue num repositório público, com instruções escondidas.
2. A pessoa pede ao agente: "veja os issues abertos".
3. O agente, com um token que também acessa repositórios privados, obedece ao issue.
4. Ele copia dados privados para um pull request público.

Não havia bug no código do servidor: o problema era a combinação de permissões.

O ataque também pode vir do próprio servidor. No
[envenenamento de tools](https://invariantlabs.ai/blog/mcp-security-notification), as instruções ficam escondidas na
descrição da tool, que o modelo lê e a pessoa não vê; no *rug pull*, a descrição muda depois que o servidor foi
aprovado. E há a cadeia de suprimentos: em setembro de 2025, o pacote npm
[`postmark-mcp`](https://snyk.io/blog/malicious-mcp-server-on-npm-postmark-mcp-harvests-emails) imitava o servidor
oficial da Postmark e, a partir da versão 1.0.16, mandava ao atacante uma cópia oculta de todo e-mail. Um servidor MCP
é um programa com acesso aos seus dados: trate como uma dependência do projeto.

Simon Willison chamou de [trifecta letal](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) a combinação de
três coisas:

- acesso a dados privados;
- contato com conteúdo não confiável;
- capacidade de comunicar para fora.

Com as três juntas, uma injeção de prompt consegue roubar dados. No caso do GitHub, eram o repositório privado, o
issue público e o pull request público. A defesa mais confiável é quebrar uma das pernas. Ao combinar servidores,
vale a pergunta: com eles juntos, o assistente tem as três?

O que fazer na prática:

- **Quem escreve o servidor**: menor privilégio (usuário de banco só de leitura quando bastar), validar argumentos e
  nunca montar SQL concatenando texto, token com escopo mínimo e, no servidor remoto, OAuth em vez de senha no código.
- **Quem usa o servidor**: instalar só de fontes confiáveis e fixar a versão, ler as tools antes de aprovar, pedir
  confirmação nas ações que escrevem ou apagam e rodar em container, com acesso só ao necessário.

## Quando usar, e quando não usar

Vale a pena quando a mesma integração vai servir a vários assistentes, quando você quer que outras pessoas usem o seu
sistema pela IA delas, ou quando já existe um servidor pronto e confiável.

Talvez não valha quando uma aplicação sua chama um modelo com duas funções fixas (o *tool use* da API resolve) ou
quando a ação é crítica e não pode depender da decisão de um modelo.

Como qualquer decisão de arquitetura, um protocolo tem custo: mais um processo e mais superfície de ataque. Só
compensa se o reuso aparecer.

## Fontes

- Slides da aula 24, "Model Context Protocol (MCP): como conectar assistentes de IA a dados e ferramentas", da
  disciplina Desenvolvimento de Software (IMPA Tech, 2026):
  [aula24.pdf](/teaching/2026-02/desenvolvimento-de-software/aula24.pdf). Consultados em 22/11/2026. As referências
  de cada dado citado estão nos últimos slides.
