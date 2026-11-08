# NewsReader Starter App

## Vercel Link
<https://assignment-9-application-developmen.vercel.app/>

## Demo Login
Enter any non-empty username and password, then choose Regular User or Admin.
This is mock authentication for demonstration; it does not verify credentials
against a backend.

## Project Structure

```
news-reader-starter/
├── src/
│   ├── components/
│   │   ├── ArticleCard.jsx
│   │   ├── Layout.jsx
│   │   ├── Login.css
│   │   ├── Login.jsx
│   │   └── Navigation.jsx
│   ├── context/
│   │   └── ArticlesContext.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── SearchPage.jsx
│   │   └── SavedArticlesPage.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Features (Current)

- Browse NY Times top stories
- Search for articles by keyword
- Bookmark articles (shared by all users - this needs to be fixed!)
- Responsive design

