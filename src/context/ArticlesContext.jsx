import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const ArticlesContext = createContext(null);

export function ArticlesProvider({ children }) {
  const { user } = useAuth();
  const [savedArticlesByUser, setSavedArticlesByUser] = useState(() => {
    const storedArticles = localStorage.getItem('newsreader-saved-articles');
    if (!storedArticles) {
      return {};
    }

    try {
      const articlesByUser = JSON.parse(storedArticles);
      if (!articlesByUser || typeof articlesByUser !== 'object' || Array.isArray(articlesByUser)) {
        return {};
      }

      return Object.fromEntries(
        Object.entries(articlesByUser).filter(
          ([, articles]) => Array.isArray(articles),
        ),
      );
    } catch {
      return {};
    }
  });
  const username = user?.username;

  useEffect(() => {
    localStorage.setItem(
      'newsreader-saved-articles',
      JSON.stringify(savedArticlesByUser),
    );
  }, [savedArticlesByUser]);

  const getUserSavedArticles = () =>
    username ? savedArticlesByUser[username] ?? [] : [];

  const saveArticle = (article) => {
    if (!username) {
      return;
    }

    setSavedArticlesByUser((previous) => {
      const userArticles = previous[username] ?? [];
      if (userArticles.some((savedArticle) => savedArticle.url === article.url)) {
        return previous;
      }
      return { ...previous, [username]: [...userArticles, article] };
    });
  };

  const removeArticle = (url) => {
    if (!username) {
      return;
    }

    setSavedArticlesByUser((previous) => ({
      ...previous,
      [username]: (previous[username] ?? []).filter((article) => article.url !== url),
    }));
  };

  const isArticleSaved = (url) => {
    return getUserSavedArticles().some((article) => article.url === url);
  };

  const getAllUserArticles = () => savedArticlesByUser;

  return (
    <ArticlesContext.Provider
      value={{
        savedArticlesByUser,
        saveArticle,
        removeArticle,
        isArticleSaved,
        getUserSavedArticles,
        getAllUserArticles,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useArticles must be used within ArticlesProvider');
  }
  return context;
};