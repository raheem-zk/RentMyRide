type Env = {
  VITE_CLIENT_ID: string;
  VITE_BACKEND_URL: string;
  VITE_CLIENT_SECRET: string;
};

declare global {
  interface ImportMeta {
    env: Env;
  }
}

export {};
