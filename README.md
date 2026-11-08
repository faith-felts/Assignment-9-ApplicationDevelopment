# NewsReader Starter App

## Demo Login Credentials

Use either of these accounts to try the authentication and role-based features:

| Role | Username | Password |
|---|---|---|
| Regular user | `testuser` | `1234` |
| Admin | `Admin123` | `123` |

These are demo credentials for this application, not production accounts.

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


