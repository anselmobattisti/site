---
titulo: "A engenharia de software é o harness dos seres humanos"
resumo: "Testes, tipos, revisão de código e integração contínua não foram inventados para os agentes de IA: são o harness que montamos, ao longo de quase 60 anos, para que pessoas falíveis escrevessem software de boa qualidade."
data: 2026-11-26
idioma: "pt-BR"
tags: ["engenharia de software", "IA", "agentes", "qualidade"]
---

Em 2026, um termo novo tomou conta das conversas sobre agentes de programação: **harness**. A fórmula que circula é
**Agente = Modelo + Harness**, e harness, nesse sentido, é **tudo o que não é o modelo**: as instruções, as
ferramentas, os testes, os linters, as regras de arquitetura, os ganchos que rodam antes do commit. O modelo gera
código; o harness **orienta** o que ele vai gerar e **confere** o que ele gerou.

Quando li a descrição de um bom harness, tive uma sensação de déjà-vu. A lista é, quase item por item, o índice de um
livro de **engenharia de software**. E a tese deste post é essa: a engenharia de software sempre foi o harness dos
seres humanos. Os agentes só tornaram isso evidente.

## O que é um harness

O texto mais claro que encontrei sobre o assunto é o de Birgitta Böckeler, da Thoughtworks, publicado no site de
Martin Fowler. Ela separa os controles de um harness em dois tipos:

- **Guias** (*feedforward*): agem **antes** do agente escrever, aumentando a chance de ele acertar de primeira.
  Convenções de código num `AGENTS.md`, documentação da arquitetura, instruções de como rodar os testes.
- **Sensores** (*feedback*): agem **depois**, observando o resultado e permitindo que o agente se corrija. Testes,
  linters, verificadores de tipos, testes de arquitetura, revisão de código.

E separa também pela natureza: controles **computacionais** (determinísticos e rápidos, como um teste ou um linter) e
**inferenciais** (análise semântica, revisão feita por outro modelo, mais lentos e menos previsíveis).

Ela observa que só um dos lados não basta. Só com sensores, o agente **repete os mesmos erros**, porque nunca recebe a
regra. Só com guias, ele **segue regras sem nunca saber se funcionaram**.

## Troque "agente" por "pessoa"

Agora releia a seção anterior trocando "agente" por "desenvolvedor recém-contratado". Nada fica estranho.

- **Guia de estilo e convenções de nomes** (guia): para pessoas que leem o código umas das outras.
- **Documento de arquitetura e registros de decisão** (guia): para quem chega depois e não estava na decisão.
- **Tipos estáticos** (sensor computacional): para quem esquece o formato de um dado três arquivos depois.
- **Testes automatizados** (sensor computacional): para quem quebra, sem perceber, o que funcionava ontem.
- **Linter e análise estática** (sensor computacional): para quem repete os mesmos descuidos.
- **Revisão de código** (sensor inferencial, feito por outra pessoa): para quem não enxerga o próprio erro.
- **Integração contínua** (sensor computacional): para equipes em que cada um testa só a sua parte.
- **Controle de versão** (rede de segurança): para quem precisa desfazer uma mudança ruim.

Nenhuma dessas práticas nasceu para a IA. Todas nasceram porque **pessoas erram**: esquecem, se distraem, entendem a
especificação pela metade, trabalham com pressa, saem da empresa levando o contexto na cabeça. A engenharia de
software é o conjunto de **guias e sensores** que fomos montando para que gente falível, em equipe, produzisse
software confiável.

## Um termo que nasceu como exigência

A expressão "software engineering" ficou conhecida com a conferência da OTAN realizada em **Garmisch**, na Alemanha,
em 1968. Brian Randell, que editou o relatório com Peter Naur, conta que o título foi escolhido **de propósito para
provocar**: descrevia "uma exigência, não uma realidade". Os participantes se surpreenderam com o quanto a
preocupação era comum, a ponto de alguns falarem numa **"crise do software"**.

Ou seja: a engenharia de software não começou como a descrição de algo que já funcionava. Começou como o
reconhecimento de que **programar bem, sozinho e de cabeça, não escalava**. Programas grandes, feitos por muitas
pessoas e mantidos por anos, precisavam de mais do que talento individual.

Randell cita uma definição curta, atribuída a ele por David Parnas (Randell diz não se lembrar de tê-la cunhado):
engenharia de software é **"o desenvolvimento, por várias pessoas, de programas com várias versões"**. É exatamente o
cenário em que um harness faz falta: muita gente mexendo, ao longo do tempo, em algo que ninguém consegue manter
inteiro na cabeça.

## O harness invisível da experiência

Böckeler faz uma observação que vai na direção contrária e que vale a pena levar a sério. Para ela, nós, humanos,
**levamos a experiência como um harness implícito** para todo código em que trabalhamos: o incômodo com uma função de
300 linhas, o fato de o nosso nome estar no commit, o conhecimento do que "bom" significa naquela equipe. O agente não
tem nada disso, e por isso o harness dele precisa tornar explícito o que, em nós, é tácito.

Concordo, com uma ressalva: **essa experiência foi formada pelo harness**. Ninguém nasce desconfiando de uma função de
300 linhas. Aprende-se isso com revisões de código, com testes que quebraram, com o colega que pediu para separar a
função em três. O gosto do desenvolvedor experiente é, em boa parte, o harness da engenharia de software
**internalizado**. E mesmo o desenvolvedor mais experiente continua precisando da parte externa: ele também esquece
um caso de borda, também quebra um teste que não rodou, também se beneficia de um segundo par de olhos.

## O que isso muda na prática

Se a engenharia de software é o harness dos humanos, algumas consequências aparecem:

- **Projetos bem engenhados são os mais fáceis para os agentes.** Testes rápidos, tipos, linter, uma arquitetura
  documentada e um build que roda com um comando são o mesmo harness, servindo a pessoas e a modelos. Böckeler chama
  isso de *harnessability*: o quanto o ambiente é legível e navegável. O código legado sem testes é ruim para os dois.
- **Pular as práticas "porque agora a IA escreve" é andar para trás.** O agente escreve mais rápido do que qualquer
  pessoa consegue revisar. Sem sensores automáticos, o volume de código cresce e a confiança nele diminui. É a crise
  de 1968 em velocidade maior.
- **O papel da pessoa sobe de nível.** Em vez de escrever cada linha, ela passa a **cuidar do harness**: quando um erro
  se repete, a resposta não é corrigir à mão de novo, é acrescentar uma regra, um teste ou uma verificação que impeça
  a próxima ocorrência. Isso é o que bons engenheiros sempre fizeram depois de um incidente.
- **Ensinar engenharia de software continua essencial.** Talvez mais do que antes. Quem não sabe o que um bom teste
  verifica não sabe montar o harness que vai conferir o trabalho do agente.

## O limite de qualquer harness

Há uma frase do texto de Böckeler que serve igualmente para pessoas e para agentes: a correção **está fora do alcance
de qualquer sensor** se ninguém especificou com clareza o que queria. Testes conferem que o programa faz o que os
testes dizem; não conferem que os testes dizem a coisa certa.

Nenhum harness substitui **entender o problema**. Ele só garante que, entendido o problema, o caminho até um software
de boa qualidade seja menos dependente de sorte, de memória e de atenção, recursos que os humanos têm em quantidade
limitada. Foi para isso que inventamos a engenharia de software. Os agentes, no fim das contas, só chegaram para usar
o harness que já estava pronto.

## Fontes

- Birgitta Böckeler, "Harness engineering for coding agent users", martinfowler.com, 02/04/2026:
  [martinfowler.com/articles/harness-engineering.html](https://martinfowler.com/articles/harness-engineering.html).
  Consultado em 26/11/2026.
- Brian Randell, "Fifty Years of Software Engineering, or The View from Garmisch", ICSE 2018:
  [arxiv.org/abs/1805.02742](https://arxiv.org/abs/1805.02742). Consultado em 26/11/2026.
