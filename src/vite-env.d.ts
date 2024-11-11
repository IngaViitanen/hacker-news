/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASEURL: string;
    readonly VITE_API_SEARCH_QUERY_BASE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}