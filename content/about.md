---js
{
  eleventyNavigation: {
    key: "About",
    order: 1
  },
  permalink: "/",
  title: "Anselmo Luiz Éden Battisti",
  description: "Anselmo Luiz Éden Battisti is a Professor at IMPA Tech with a PhD in Computer Science from UFF. Two decades between research labs, the classroom and a software company, working on SFC placement across the edge–cloud continuum."
}
---

<div class="hero">

<p class="eyebrow eyebrow--names">Unioeste · PUCPR · UFF · IMPA Tech</p>

# Anselmo Luiz Éden Battisti

<p class="lede">I completed my PhD and Master’s in Computer Science at <strong>Universidade Federal Fluminense (UFF)</strong>, supervised by <a href="https://lattes.cnpq.br/5386282151810710" target="_blank" rel="noopener">Flávia Coimbra Delicato</a> and <a href="https://lattes.cnpq.br/2448703093928632" target="_blank" rel="noopener">Débora Christina Muchaluat-Saade</a>. I also hold a Master’s in Strategic Business Management (PUCPR), a specialization in Java development, and a Bachelor’s in Computer Science (Unioeste).</p>

<p class="measure">Over two decades as a project manager and professor I have taken part in national and international projects in 5G, smart cities and digital platforms — work that produced scientific publications, patents registered in the United States, and solutions applied in the market. Today I teach at <a href="https://impatech.edu.br/" target="_blank" rel="noopener"><strong>IMPA Tech</strong></a> and run <a href="https://webgenium.com.br/" target="_blank" rel="noopener"><strong>Webgenium</strong></a>, the company I co-founded in 2007.</p>

<div class="hero-actions">
  <a class="btn btn-solid" href="/background/">Academic background</a>
  <a class="btn" href="https://github.com/anselmobattisti/publications/blob/main/docs/2025/Tese/tese.pdf" target="_blank" rel="noopener">PhD thesis (PDF)</a>
  <a class="btn" href="https://lattes.cnpq.br/6937214674204474" target="_blank" rel="noopener">Curriculum Lattes</a>
</div>

</div>

<ul class="stats">
  <li class="stat"><span class="n">{{ collections.publications | length }}</span><span class="l">Publications</span></li>
  <li class="stat"><span class="n">06</span><span class="l">US patents</span></li>
  <li class="stat"><span class="n">10+</span><span class="l">Years teaching</span></li>
</ul>

<section class="section hide-on-mobile">
  <div class="section-head">
    <h2>Research</h2>
    <a class="more" href="/research/">Publications, patents &amp; awards →</a>
  </div>

  <p class="measure">I research the placement of Service Function Chains across the edge–cloud continuum — how to split a chain of virtual network functions over constrained edge nodes without breaking its latency budget. My PhD work, <em>SPEED</em>, solves it as a distributed decision instead of a central one.</p>

<figure class="diagram">
  <svg viewBox="0 0 710 148" role="img" aria-label="A multimedia service function chain: a camera at the device tier, transcode and object-detection VNFs at the edge tier, and analytics in the cloud, connected by 12, 6 and 41 millisecond links.">
    <g font-family="Roboto, sans-serif">
      <text x="78" y="16" font-size="9.5" fill="currentColor" opacity=".55" text-anchor="middle" letter-spacing="1.2">DEVICE</text>
      <text x="262" y="16" font-size="9.5" fill="currentColor" opacity=".55" text-anchor="middle" letter-spacing="1.2">EDGE</text>
      <text x="446" y="16" font-size="9.5" fill="currentColor" opacity=".55" text-anchor="middle" letter-spacing="1.2">EDGE</text>
      <text x="630" y="16" font-size="9.5" fill="currentColor" opacity=".55" text-anchor="middle" letter-spacing="1.2">CLOUD</text>
      <line x1="137" y1="55" x2="197" y2="55" stroke="currentColor" stroke-width="1" opacity=".35"/>
      <path d="M197 55 l-7 -3.2 v6.4 z" fill="currentColor" opacity=".45"/>
      <text x="167" y="47" font-size="9" fill="currentColor" opacity=".6" text-anchor="middle">12 ms</text>
      <line x1="321" y1="55" x2="381" y2="55" stroke="currentColor" stroke-width="1" opacity=".35"/>
      <path d="M381 55 l-7 -3.2 v6.4 z" fill="currentColor" opacity=".45"/>
      <text x="351" y="47" font-size="9" fill="currentColor" opacity=".6" text-anchor="middle">6 ms</text>
      <line x1="505" y1="55" x2="565" y2="55" stroke="currentColor" stroke-width="1" opacity=".35"/>
      <path d="M565 55 l-7 -3.2 v6.4 z" fill="currentColor" opacity=".45"/>
      <text x="535" y="47" font-size="9" fill="currentColor" opacity=".6" text-anchor="middle">41 ms</text>
      <rect x="19" y="32" width="118" height="46" rx="2" fill="none" stroke="currentColor" stroke-width="1" opacity=".45"/>
      <text x="78" y="52" font-size="10.5" fill="currentColor" text-anchor="middle" font-family="Roboto, sans-serif">Camera</text>
      <text x="78" y="67" font-size="9" fill="currentColor" opacity=".6" text-anchor="middle">1080p / 30 fps</text>
      <rect x="203" y="32" width="118" height="46" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/>
      <text x="262" y="52" font-size="10.5" fill="currentColor" text-anchor="middle" font-family="Roboto, sans-serif">Transcode</text>
      <text x="262" y="67" font-size="9" fill="currentColor" opacity=".6" text-anchor="middle">VNF · 2 vCPU</text>
      <rect x="387" y="32" width="118" height="46" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/>
      <text x="446" y="52" font-size="10.5" fill="currentColor" text-anchor="middle" font-family="Roboto, sans-serif">Object detect</text>
      <text x="446" y="67" font-size="9" fill="currentColor" opacity=".6" text-anchor="middle">VNF · GPU</text>
      <rect x="571" y="32" width="118" height="46" rx="2" fill="none" stroke="currentColor" stroke-width="1" opacity=".45"/>
      <text x="630" y="52" font-size="10.5" fill="currentColor" text-anchor="middle" font-family="Roboto, sans-serif">Analytics</text>
      <text x="630" y="67" font-size="9" fill="currentColor" opacity=".6" text-anchor="middle">long-term store</text>
      <path d="M203 96 v8 h302 v-8" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3" opacity=".5"/>
      <text x="354" y="122" font-size="9.5" fill="currentColor" opacity=".75" text-anchor="middle" letter-spacing=".6">SPEED · distributed placement decision</text>
      <text x="354" y="138" font-size="9" fill="currentColor" opacity=".5" text-anchor="middle">end-to-end budget: 59 ms of 80 ms</text>
    </g>
  </svg>
  <figcaption>A multimedia SFC across three tiers — the algorithm places only the two edge VNFs.</figcaption>
</figure>

  <ul class="topics">
    <li>SFC placement</li>
    <li>Edge–cloud continuum</li>
    <li>Virtual Network Functions</li>
    <li>5G &amp; network slicing</li>
    <li>Internet of Media Things</li>
    <li>VNF auto-scaling</li>
    <li>Domain-specific languages</li>
  </ul>
</section>

<section class="section">
  <div class="section-head">
    <h2>Selected publications</h2>
    <a class="more" href="/publication/">All {{ collections.publications | length }} →</a>
  </div>

  {#- Publications carrying `featured: true`. With none flagged, fall back to
      the three most recent so the section is never empty. -#}
  {%- set featured = collections.featuredPublications %}
  {%- set publicationslist = featured if featured | length else collections.publications %}
  {%- if not featured | length %}{% set publicationslistLimit = 3 %}{% endif %}
  {% include "publicationslist.njk" %}
</section>

<div class="award">
  <span class="tag">2026 · Recognition</span>
  <h2>Finalist, Ph.D. Thesis Contest (CTD) — SBRC 2026</h2>
  <p>The Brazilian Symposium on Computer Networks and Distributed Systems selects the outstanding doctoral theses in the field each year. <a href="/awards/">See all awards →</a></p>
</div>

<section class="section">
  <div class="section-head">
    <h2>Currently</h2>
    <a class="more" href="/work/">Full history →</a>
  </div>
  <ul class="cards">
    <li class="card">
      <span class="tl-period">2026 — present</span>
      <h3>Professor · <a href="https://impatech.edu.br/" target="_blank" rel="noopener">IMPA Tech</a></h3>
      <p>Teaching computer science, software engineering and modern software development in IMPA’s first undergraduate program, in Rio de Janeiro.</p>
    </li>
    <li class="card">
      <span class="tl-period">2007 — present</span>
      <h3>Co-founder &amp; CEO · <a href="https://webgenium.com.br/" target="_blank" rel="noopener">Webgenium</a></h3>
      <p>Digital products and transformation projects for businesses, combining hands-on web engineering with a broader view of where technology creates impact.</p>
    </li>
  </ul>
</section>
