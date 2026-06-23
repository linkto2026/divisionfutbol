import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '5d2f3ca5781a7ae50abe26ea9b489da2026109e5', queries,  });
export default client;
  