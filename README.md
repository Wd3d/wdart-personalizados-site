# WD Art's e Personalizados — Site estático (Netlify)

Personalizado para o Instagram **@wdart_s**. Edite `config.json` para atualizar mídias, produtos e textos.

## Publicar no Netlify (via GitHub)
1. Crie um repositório (ex.: `wdarts-site`).
2. Faça upload de todos os arquivos (inclusive `netlify.toml`).
3. No Netlify: **Add new site → Import an existing project** → selecione o repositório.
4. Pronto: cada *commit* publica automaticamente.

## Dica — Galeria com links do Instagram
Você pode usar objetos na `gallery` assim:
```json
{ "src": "assets/images/gal1.jpg", "href": "https://www.instagram.com/p/XXXX/" }
```
Assim, a imagem abre o post no Instagram.

Atualizado em 2025-09-18.
