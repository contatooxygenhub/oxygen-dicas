import { defineCollection, z } from 'astro:content';

const dicas = defineCollection({
  type: 'content',
  schema: z.object({
    titulo: z.string(),
    subtitulo: z.string().optional(),

    // Categoria principal (nível 1)
    categoria: z.enum(['Viagens', 'Content+', 'IRL']),

    // Subcategoria (nível 2) — varia conforme categoria
    subcategoria: z.enum([
      'Passeios', 'Lojas', 'Restaurantes', 'Hospedagem', 'Outros',
      'Podcast', 'Filme', 'Série', 'Documentário', 'Livro',
      'Exposição', 'Evento', 'Festival', 'Palestra'
    ]),

    // Subtag (nível 3) — opcional, refina Content+
    subtag: z.string().optional(),

    // Geografia — pra Viagens e IRL
    pais: z.string().optional(),
    cidade: z.string().optional(),

    tags: z.array(z.string()).default([]),

    info: z.object({
      endereco: z.string().optional(),
      horario: z.string().optional(),
      site: z.string().optional(),
      reservas: z.string().optional(),
      autor: z.string().optional(),
      onde_assistir: z.string().optional(),
      duracao: z.string().optional(),
      temporadas: z.string().optional(),
      plataforma: z.string().optional(),
      frequencia: z.string().optional(),
      data: z.string().optional(),
      ingresso: z.string().optional(),
      local: z.string().optional(),
    }).optional(),

    publicado_em: z.coerce.date(),
    destaque: z.boolean().default(false)
  })
});

export const collections = { dicas };
