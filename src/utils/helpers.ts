export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\+/g, '-plus')
    .replace(/\s+&\s+/g, '-e-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function categoriaSlug(cat: string): string {
  if (cat === 'Viagens') return 'viagens';
  if (cat === 'Content+') return 'content-plus';
  if (cat === 'IRL') return 'irl';
  if (cat === 'Gerais') return 'gerais';
  return slugify(cat);
}

export function metaDoCard(dica: any): string {
  const d = dica.data;
  const info = d.info || {};

  // O eyebrow (textinho acima do título) tem um significado FIXO por categoria,
  // pra que o leitor sempre saiba o que esperar daquele slot. Nunca mostra o
  // autor (já está no título) nem o indicado_por (esse vai só na página de
  // detalhe). Cada categoria tem sua hierarquia e SEMPRE termina na
  // subcategoria, então o eyebrow nunca fica vazio nem mostra uma pessoa solta.

  switch (d.categoria) {
    // VIAGENS → onde fica no mundo: País → Cidade → Região
    case 'Viagens':
      return d.pais || d.cidade || d.regiao || d.subcategoria;

    // CONTENT+ → onde consumir / o que é. Livro não tem origem única
    // (varia muito: livraria, Amazon, Kindle...), então marca o tipo.
    case 'Content+':
      if (d.subcategoria === 'Livro') return 'Livro';
      return info.onde_assistir || info.plataforma || info.onde_ler || d.subcategoria;

    // GERAIS → que tipo de serviço: especialidade → tipo (subcategoria)
    case 'Gerais':
      return info.especialidade || d.subcategoria;

    // IRL → quando/onde acontece: Local · Data → Local → Data → subcategoria
    case 'IRL':
      if (info.local && info.data) return `${info.local} · ${info.data}`;
      return info.local || info.data || d.subcategoria;

    default:
      return d.subcategoria;
  }
}
