import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export const file = '_app/immutable/components/pages/_layout.svelte-595b7eab.js';
export { server };
export const imports = ["_app/immutable/components/pages/_layout.svelte-595b7eab.js","_app/immutable/chunks/singletons-3d7ee568.js","_app/immutable/chunks/Modal-65045314.js","_app/immutable/chunks/stores-e7e2dc20.js","_app/immutable/chunks/env-public-6aa99648.js"];
export const stylesheets = ["_app/immutable/assets/_layout-96152cbe.css","_app/immutable/assets/Modal-c04ca449.css"];
export const fonts = [];
