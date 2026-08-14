"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Solution = {
  title: string;
  slug: string;
};

type Category = {
  name: string;
  slug: string;
  solutions: Solution[];
};

type CategoryContextType = {
  categories: Category[];
  loading: boolean;
};

const CategoryContext = createContext<CategoryContextType | null>(null);

export function CategoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();

        setCategories(data.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loading }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error(
      "useCategories must be used inside CategoryProvider",
    );
  }

  return context;
}