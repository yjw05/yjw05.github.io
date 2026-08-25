# Jiawei Yang — Mathematics Homepage

This is the source repository for `https://yjw05.github.io`. The website is hosted directly by GitHub Pages and does not depend on ChatGPT.

## Edit profile information

Edit [`profile.json`](profile.json):

- `name`: page title and author name
- `headlineEnglish`: main homepage heading
- `headlineSubtitle`: subtitle below the heading
- `about`: short biography, one bullet per item
- `email`: contact email

## Upload and list a preprint

1. Upload the PDF to the repository root.
2. Edit [`papers.json`](papers.json).
3. Add the paper to the `preprints` array.
4. Commit the changes and wait for GitHub Pages to update.

Example paper entry:

```json
{
  "title": "Full paper title",
  "authors": "Jiawei Yang, A. Collaborator",
  "year": "2026",
  "venue": "Preprint",
  "pages": "11 pages",
  "pdf": "/my-paper-2026.pdf",
  "url": "https://arxiv.org/abs/xxxx.xxxxx",
  "note": "",
  "abstract": "Paper abstract"
}
```

`venue`, `pages`, `pdf`, `url`, `note`, and `abstract` are optional. Use only letters, numbers, and hyphens in PDF filenames.

The website's [`manage.html`](manage.html) page links directly to the GitHub editors and upload page.
