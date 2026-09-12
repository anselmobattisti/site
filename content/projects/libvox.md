---
title: "LibVox"
mermaid: true
date: 2026-09-08
period: "2026 — present"
status: "active"
summary: "An open-source, AI-powered conversational layer for libraries."
institution: "IMPA Tech"
students_note: "Undergraduate students at IMPA Tech."
# Private while the project is being finalised — uncomment when it goes public.
# repo_link: "https://github.com/anselmobattisti/libvox"
repo_note: "Private while the project is being finalised."
students:
  - "Vinícius Flesch Kern"
  - "Matheus Mota de Godoy"
  - "Jonathas David de Lima Santos"
  - "Gabriel Souza Vieira"
abstract: "LibVox is an open-source, AI-powered conversational layer designed specifically for libraries. By leveraging Large Language Models (LLMs) and the Model Context Protocol (MCP), LibVox acts as an intelligent, conversational bridge that simplifies public access to complex library collections managed by open-source Integrated Library Systems (ILS) such as Koha and FOLIO."
---

Developed as an applied research initiative, LibVox does not seek to modify or
replace existing ILS deployments. Instead, it provides a scalable, multi-tenant
SaaS middleware that translates natural language questions into structured API
queries, serving heavy metadata from a locally indexed copy while retrieving
real-time availability from the ILS itself.

```mermaid
flowchart LR
    classDef ui fill:#e1f5fe,stroke:#03a9f4,stroke-width:2px,color:#000
    classDef core fill:#fff3e0,stroke:#ff9800,stroke-width:2px,color:#000
    classDef ai fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px,color:#000
    classDef db fill:#eceff1,stroke:#607d8b,stroke-width:2px,color:#000
    classDef integration fill:#e8f5e9,stroke:#4caf50,stroke-width:2px,color:#000
    classDef legacy fill:#ffebee,stroke:#f44336,stroke-width:2px,color:#000
    classDef planned fill:#fafafa,stroke:#9e9e9e,stroke-width:2px,stroke-dasharray:5 4,color:#616161

    %% Components
    subgraph Channels ["1. Channels"]
        Web["💬 Web widget adapter"]:::ui
        Zap["📱 WhatsApp adapter"]:::planned
        Tg["✈️ Telegram adapter"]:::planned
        Mail["✉️ Email adapter"]:::planned
    end
    Admin["👔 Library Admin"]:::ui

    subgraph Hub ["2. Middleware and Event Hub"]
        Core["🔀 /libvox-core<br/>Agent · Gateway<br/>Router"]:::core
        Sync["🔄 /libvox-sync"]:::core
        Portal["🖥️ /libvox-portal"]:::core
    end

    subgraph Brain ["3. Cognitive Engine"]
        LLM["🧠 LLM Engine"]:::ai
        MCP["⚙️ /libvox-mcp"]:::ai
        Embed["🧮 Embedding model"]:::ai
        LLM ~~~ MCP
    end

    subgraph Storage ["4. Data Storage (/libvox-db, one server)"]
        DiscoveryIdx[("🔎 Discovery Index<br/>PostgreSQL + pgvector<br/>text and vector, fused")]:::db
        TenantDB[("🗄️ Tenant DB<br/>and conversation log")]:::db
    end

    subgraph Drivers ["5. ILS Drivers"]
        KohaDrv["☁️ Koha Driver"]:::integration
        FolioDrv["☁️ FOLIO Driver"]:::planned
    end

    KohaAPI["🏛️ Koha ILS"]:::legacy

    %% Channels to Hub
    %% --
    %% The three that are not built have no edge of their own -- only the widget
    %% reaches the Core today. `~~~` is an invisible link, and it is the only
    %% thing that lays the four out in a row: dagre ranks nodes along the flow
    %% axis, so four adapters with nothing between them all land on rank 0 and
    %% stack. `direction` on the subgraph does not help, because Mermaid ignores
    %% it wherever an edge crosses the boundary -- which the widget's does.
    Web ~~~ Zap ~~~ Tg ~~~ Mail
    Web <-->|"Session events"| Core

    Admin -->|HTTPS| Portal

    %% Hub internals
    %% --
    %% A storage link is a plain line, and every one of them is declared from
    %% the database outward. Both facts are one decision: rank follows edge
    %% direction, so arrows pointing at the databases put them downstream of
    %% everything, on the right, where a reader does not look for them. Turned
    %% around they sit on the left and the arrowheads would then be lying about
    %% who writes.
    %% --
    %% So the arrowhead goes and the label says the actor -- "Portal
    %% configures" carries what "Portal -->|Configures|" carried, in the half
    %% of the notation that is not load-bearing for layout. A datastore is a
    %% dependency rather than a flow, which is the honest shape for it anyway.
    TenantDB ---|"Portal configures"| Portal
    TenantDB ---|"Core reads config"| Core
    DiscoveryIdx ---|"Core searches: text + vector"| Core
    DiscoveryIdx ---|"Sync populates"| Sync
    Portal -.->|"Outbox: TenantUpdated,<br/>SyncRequested"| Sync

    %% Hub to Brain
    Core <-->|Prompt / Tool Intent| LLM
    Core <-->|MCP tools/call| MCP
    Core -->|Embeds the question| Embed
    Sync -->|Embeds each record| Embed

    %% Hub to Drivers
    Core <-->|Real-Time Check| KohaDrv
    Sync -.->|Bulk Fetch| KohaDrv

    %% Drivers to ILS
    KohaDrv <--> KohaAPI
```

<p class="diagram-caption">The LibVox architecture: channels, middleware and event hub, cognitive engine, data storage and ILS drivers.</p>
