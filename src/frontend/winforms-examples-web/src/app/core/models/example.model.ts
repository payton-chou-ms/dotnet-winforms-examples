export interface Example {
  id: number;
  title: string;
  description: string;
  category: string;
  difficultyLevel: string;
  technologies: string[];
  codeSnippet: string;
  imageUrl: string;
  isFavorite: boolean;
  viewCount: number;
  createdAt: Date;
}

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface SplashScreenConfiguration {
  logoUrl: string;
  appTitle: string;
  appVersion: string;
  displayDurationMs: number;
}
