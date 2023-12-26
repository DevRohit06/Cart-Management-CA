
import { writable } from "svelte/store";
import type { UserType } from "../entities/User";

export const userData = writable<UserType>();