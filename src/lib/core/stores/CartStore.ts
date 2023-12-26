import { writable } from 'svelte/store';
import type { Product } from '../entities/Product';

export const CartStore = writable<Product[]>();
