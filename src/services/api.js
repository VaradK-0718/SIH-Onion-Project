const configuredApiBase = import.meta.env.VITE_AI_API_URL?.trim() || '';

export const API_BASE_URL = configuredApiBase.replace(/\/+$/, '');
