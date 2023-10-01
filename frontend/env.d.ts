type Env = {
  VITE_CLIENT_ID: string;
  VITE_BACKEND_URL: string;
  VITE_CLIENT_SECRET: string;
  VITE_BACKEND_ADMIN_API_URL: string;
  VITE_BACKEND_CAR_OWNER_API_URL: string;
};

declare global {
  interface ImportMeta {
    env: Env;
  }
}

export {};
