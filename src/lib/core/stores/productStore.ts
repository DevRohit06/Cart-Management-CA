import { writable  } from "svelte/store";
import type { Product } from "../entities/Product";

export const ProductStore = writable<Product[]>([]);