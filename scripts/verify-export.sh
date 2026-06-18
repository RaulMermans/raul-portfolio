#!/usr/bin/env bash

set -euo pipefail

assert_file() {
  test -f "$1" || {
    echo "Missing exported file: $1"
    exit 1
  }
}

assert_contains() {
  local file="$1"
  local text="$2"

  grep -Fq "$text" "$file" || {
    echo "Expected text not found in $file: $text"
    exit 1
  }
}

assert_absent() {
  local file="$1"
  local text="$2"

  if grep -Fq "$text" "$file"; then
    echo "Prohibited text found in $file: $text"
    exit 1
  fi
}

assert_file out/index.html
assert_file out/en/index.html
assert_file out/case-studies/index.html
assert_file out/en/case-studies/index.html
assert_file out/case-studies/blogagent/index.html
assert_file out/en/case-studies/blogagent/index.html
assert_file out/es/case-studies/blogagent/index.html

assert_file out/en/services/ai-integrations/index.html
assert_file out/en/services/creative-automation/index.html
assert_file out/en/services/brand-systems/index.html
assert_file out/en/services/product-prototypes/index.html

assert_file out/services/integraciones-ia/index.html
assert_file out/services/automatizacion-creativa/index.html
assert_file out/services/sistemas-de-marca/index.html
assert_file out/services/prototipos-producto-ia/index.html

assert_contains out/en/index.html "AI Integrations"
assert_contains out/en/index.html "Discuss an AI Integration"
assert_contains out/en/index.html "Creative infrastructure for AI-assisted execution"
assert_contains out/en/index.html "Start with the creative system"
assert_contains out/en/index.html "Direct contact options"
assert_contains out/en/index.html "Available Q3 2026"
assert_contains out/en/index.html "raulmermans@gmail.com"

assert_contains out/index.html "Integraciones IA"
assert_contains out/index.html "Hablar de una integración IA"
assert_contains out/index.html "Infraestructura creativa para ejecución asistida por IA"
assert_contains out/index.html "Empieza por el sistema creativo"
assert_contains out/index.html "Opciones de contacto directo"
assert_contains out/index.html "Disponible T3 2026"
assert_contains out/index.html "raulmermans@gmail.com"

assert_contains out/en/services/ai-integrations/index.html "AI Integrations for Creative Systems"
assert_contains out/en/services/creative-automation/index.html "Creative Automation"
assert_contains out/en/services/brand-systems/index.html "Brand Intelligence Systems"
assert_contains out/en/services/product-prototypes/index.html "AI Product Prototypes"

assert_contains out/services/integraciones-ia/index.html "Integraciones IA para Sistemas Creativos"
assert_contains out/services/automatizacion-creativa/index.html "Automatización Creativa"
assert_contains out/services/sistemas-de-marca/index.html "Sistemas de Inteligencia de Marca"
assert_contains out/services/prototipos-producto-ia/index.html "Prototipos de Producto IA"

assert_contains out/en/case-studies/index.html "View case study: AI Sports Campaign"
assert_contains out/en/case-studies/index.html "View case study: BlogAgent"
assert_contains out/case-studies/index.html "Ver caso de estudio: Campaña deportiva con IA"
assert_contains out/case-studies/index.html "Ver caso de estudio: BlogAgent"

assert_contains out/en/case-studies/blogagent/index.html "human review before publication"
assert_contains out/case-studies/blogagent/index.html "revisión humana antes de publicar"
assert_contains out/es/case-studies/blogagent/index.html "revisión humana antes de publicar"

assert_absent out/en/case-studies/index.html "Digital identity system that structures AI/product work"
assert_absent out/en/case-studies/index.html "For faster UX, SEO, and conversion diagnostics"

assert_absent out/en/index.html "Request an AI Workflow Audit"
assert_absent out/en/index.html "Marketing + CRM"
assert_absent out/en/index.html "Start with the workflow"
assert_absent out/en/index.html "Send Project Brief"
assert_absent out/en/index.html "Send Creative Systems Brief"
assert_absent out/index.html "Sistemas de IA · Agentes · Automatización"
assert_absent out/index.html "Automatización CRM"
assert_absent out/index.html "Enviar brief de sistema creativo"

node <<'NODE'
const fs = require('node:fs')

function assertOrder(file, labels) {
  const html = fs.readFileSync(file, 'utf8')
  let previousIndex = -1

  for (const label of labels) {
    const index = html.indexOf(label)

    if (index === -1) {
      throw new Error(`Missing archive item in ${file}: ${label}`)
    }

    if (index <= previousIndex) {
      throw new Error(`Incorrect archive order in ${file}: ${label}`)
    }

    previousIndex = index
  }
}

assertOrder('out/en/case-studies/index.html', [
  'AI Sports Campaign',
  'Remoria',
  'Raul Mermans Portfolio',
  'Website Audit Agent',
  'Campaign Sandbox',
  'BlogAgent',
  'TerritoryOps Spain',
  'DataBrief AI',
  'Benchmark Dashboard Template',
])

assertOrder('out/case-studies/index.html', [
  'Campaña deportiva con IA',
  'Remoria',
  'Raul Mermans Portfolio',
  'Website Audit Agent',
  'Campaign Sandbox',
  'BlogAgent',
  'TerritoryOps Spain',
  'DataBrief AI',
  'Benchmark Dashboard Template',
])
NODE

echo "Static export verification passed."
