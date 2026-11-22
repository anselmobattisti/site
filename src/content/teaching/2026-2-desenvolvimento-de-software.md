---
titulo: "Desenvolvimento de Software"
idiomaTitulo: "pt-BR"
semestre: "2026"
data: 2026-08-01
instituicao: "IMPA Tech"
idioma: "pt-BR"
nivel: "Undergraduate"
curso: "Matemática da Tecnologia e Inovação"
horas: 54

bibliografia:
  - "VALENTE, M. T. Engenharia de Software Moderna. Victoria, British Columbia: LeanPub, 2020."
  - "PRESSMAN, R. S.; MAXIM, B. R. Engenharia de Software: Uma abordagem profissional. 9. ed. New York: McGraw-Hill, 2021."
  - "SOMMERVILLE, I. Engenharia de Software. 10. ed. São Paulo: Pearson, 2019."

bibliografiaComplementar:
  - "GAMMA, E.; HELM, R.; JOHNSON, R.; VLISSIDES, J. Design Patterns: Elements of Reusable Object-Oriented Software. Boston: Addison-Wesley Longman Publishing Co., Inc., 1994."
  - "SOMMERVILLE, I. Engineering Software Products. São Paulo: Pearson, 2019."
  - "KENNETH, S., RUBIN, R. Essential Scrum: A Practical Guide to the Most Popular Agile Process. Boston: Addison-Wesley, 2012."
  - "LARMAN, C. Utilizando UML e Padrões: Uma Introdução à análise e ao projeto orientados a objetos e ao desenvolvimento iterativo. 3. ed. Porto Alegre: Bookman, 2007."
  - "PILONE, D.; MILES, R. Head First Software Development. Massachusetts: O’Reilly Media.Kaufmann, 2011."
pastaAulas: "teaching/2026-02/desenvolvimento-de-software"

# Uma linha por aula. O PDF fica em public/<pastaAulas>/<arquivo>.
aulas:
  - numero: 1
    data: 2026-08-10
    titulo: "Apresentação do plano de ensino e histórico do desenvolvimento de software"
    descricao: "Plano de trabalho, método e avaliação da disciplina. A origem da Engenharia de Software: a conferência da OTAN de 1968, a crise do software e o colapso da rede da AT&T em 1990."
    arquivo: "aula01.pdf"
  - numero: 2
    data: 2026-08-12
    titulo: "Gerência de projetos de software"
    descricao: "Processos e ciclos de vida: do modelo cascata aos modelos iterativos e ao Manifesto Ágil. Product backlog, priorização e estimativa de esforço (homem-hora, Lei de Brooks e Planning Poker)."
    arquivo: "aula02.pdf"
  - numero: 3
    data: 2026-08-17
    titulo: "Métodos ágeis: XP, Scrum e Kanban"
    descricao: "As práticas do Extreme Programming; papéis, artefatos e cerimônias do Scrum; o quadro Kanban, os limites de WIP, a Lei de Little e o diagrama de fluxo cumulativo."
    arquivo: "aula03.pdf"
  - numero: 4
    data: 2026-08-19
    titulo: "Gerência de configuração de software"
    descricao: "Controle de versão com Git: as três áreas, commits, histórico e repositórios remotos. Branches, pull requests e conflitos no GitHub. Ambientes de desenvolvimento, homologação e produção, com venv e Docker."
    arquivo: "aula04.pdf"
  - numero: 5
    data: 2026-08-24
    titulo: "Engenharia de requisitos: conceitos e elicitação"
    descricao: "O que é um requisito e quanto custa errá-lo (Mars Climate Orbiter, CrowdStrike). Requisitos funcionais e não funcionais, e como torná-los mensuráveis. Elicitação por entrevistas, prototipagem e workshops."
    arquivo: "aula05.pdf"
  - numero: 6
    data: 2026-08-26
    titulo: "Engenharia de requisitos: especificação, validação e backlog"
    descricao: "Histórias de usuário (3 Cs e INVEST), critérios de aceite, BDD com Gherkin e casos de uso. Validação, teste A/B e matriz de rastreabilidade. Priorização com MoSCoW e mudanças de escopo."
    arquivo: "aula06.pdf"
  - numero: 8
    data: 2026-09-02
    titulo: "Projeto de software com UML"
    descricao: "Por que modelar software. Diagramas de casos de uso, de atividades, de classes (associação, agregação, composição e herança) e de sequência, e quando usar cada um."
    arquivo: "aula08.pdf"
  - numero: 9
    data: 2026-09-09
    titulo: "Arquitetura de software"
    descricao: "Atributos de qualidade e seus trade-offs (teorema CAP), coesão, acoplamento e SOLID. Padrões arquiteturais: camadas, cliente-servidor, monolito e microsserviços, orientada a eventos e pipes & filters."
    arquivo: "aula09.pdf"
  - numero: 10
    data: 2026-09-14
    titulo: "Empreendedorismo em TI"
    descricao: "Startups, Lean Startup e MVP. Modelos de monetização (SaaS, open core, micro-SaaS), software livre e proprietário, tipos de licença e fontes de financiamento (investidor-anjo, incubadoras e aceleradoras)."
    arquivo: "aula10.pdf"
  - numero: 12
    data: 2026-09-28
    titulo: "Implementação de software: código limpo"
    descricao: "Nomes que revelam a intenção, funções pequenas e focadas, DRY, comentários e formatação (ESLint), tratamento de erros com exceções, code smells e refatoração."
    arquivo: "aula12.pdf"
  - numero: 13
    data: 2026-09-30
    titulo: "Padrões de projeto"
    descricao: "Os padrões do GoF por categoria: Singleton e Factory (criação), Adapter e Facade (estruturais), Strategy e Observer (comportamentais). Padrões de apresentação: MVC, MVP e MVVM."
    arquivo: "aula13.pdf"
  - numero: 14
    data: 2026-10-05
    titulo: "Frameworks de software"
    descricao: "Níveis de reuso, a diferença entre biblioteca e framework, Inversão de Controle (IoC) e Injeção de Dependência (DI), e as vantagens e os riscos de adotar um framework."
    arquivo: "aula14.pdf"
  - numero: 15
    data: 2026-10-07
    titulo: "Testes de software I"
    descricao: "Verificação e validação; defeito, erro e falha; níveis de teste e a pirâmide de testes. Testes unitários em Python com pytest: o padrão AAA, os critérios FIRST e um repositório com SQLite."
    arquivo: "aula15.pdf"
  - numero: 16
    data: 2026-10-14
    titulo: "Testes de software II"
    descricao: "Testes de integração e test doubles (stub, mock e fake), testes de sistema e ponta a ponta (API e Selenium), testes de aceitação e automação da suíte com GitHub Actions."
    arquivo: "aula16.pdf"
  - numero: 17
    data: 2026-10-19
    titulo: "Revisões de software"
    descricao: "Amplificação de defeitos e métricas de revisão, da revisão técnica formal ao code review por pull request, e feedback construtivo. Análise estática com Ruff e mypy, pre-commit e segredos fora do código."
    arquivo: "aula17.pdf"
  - numero: 18
    data: 2026-10-21
    titulo: "Qualidade de software: métricas de código"
    descricao: "Métricas de produto e KPIs. Complexidade ciclomática de McCabe, acoplamento, cobertura de testes (pytest-cov) e índice de manutenibilidade, medidos com o radon."
    arquivo: "aula18.pdf"
  - numero: 19
    data: 2026-10-26
    titulo: "Qualidade de software e maturidade"
    descricao: "Qualidade do produto pela ISO/IEC 25010 e como transformar um atributo em requisito verificável. Maturidade de processos: os níveis do CMMI e do MPS.BR e como funciona uma avaliação."
    arquivo: "aula19.pdf"
  - numero: 20
    data: 2026-10-28
    titulo: "Computação em nuvem e containers"
    descricao: "Modelos de serviço (IaaS, PaaS, SaaS, FaaS) e de implantação, elasticidade e responsabilidade compartilhada. Máquina virtual e container; Docker na prática: imagens, Dockerfile, volumes e Docker Compose."
    arquivo: "aula20.pdf"
  - numero: 21
    data: 2026-11-04
    titulo: "Mensageria, Event Sourcing e CQRS"
    descricao: "Filas e publicação/assinatura com o Apache Kafka, com produtor e consumidor em Python. Event Sourcing e CQRS no exemplo de uma conta bancária, consistência eventual e computação entre a borda e a nuvem."
    arquivo: "aula21.pdf"
  - numero: 22
    data: 2026-11-09
    titulo: "Manutenção e evolução de software"
    descricao: "As leis de Lehman, os quatro tipos de manutenção e a dívida técnica. Sistemas legados, reengenharia, engenharia reversa com IA e o padrão strangler fig. Linhas de produtos de software e variabilidade."
    arquivo: "aula22.pdf"
  - numero: 24
    data: 2026-11-23
    titulo: "Model Context Protocol (MCP)"
    descricao: "Como conectar assistentes de IA a dados e ferramentas: host, cliente e servidor, e as primitivas tools, resources e prompts. Um servidor de tarefas em Python, testes, e segurança (injeção de prompt e a trifecta letal)."
    arquivo: "aula24.pdf"
  - numero: 25
    data: 2026-11-25
    titulo: "Harness de agentes"
    descricao: "Agente = modelo + harness: o loop do agente, a montagem do contexto e a execução de tools. Não determinismo e controles (guias, sensores, limites e humano no loop), avaliação de agentes e o mesmo harness com LangChain."
    arquivo: "aula25.pdf"
---

Engenharia de requisitos: objetivos e métodos. Implementação de software: técnicas
de codificação e estilos de programação. Projeto de software. Princípios de
arquitetura de software. Gerência de projetos: planejamento, execução e controle.
Desenvolvimento de software em equipe. Qualidade de software: critérios de
qualidade, métricas, revisões e testes de software. Manutenção de software:
fundamentos e reengenharia. Frameworks. Apoio automatizado ao desenvolvimento de
software: ambientes e ferramentas CASE. Gerência de configuração de software e
controle de versão. Linha de produtos de software.
