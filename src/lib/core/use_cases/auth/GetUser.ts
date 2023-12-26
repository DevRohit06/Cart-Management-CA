import type { IAuthRepository } from "$lib/core/repositories/IAuthRepository";
import { auth } from "$lib/firebase";
import type { User } from "firebase/auth";

export class GetUser {
    constructor(private repository: IAuthRepository) {}

    async execute(): Promise<User[] | null> {
        if (auth.currentUser){
            return this.repository.getUser();
        } else {
            return null;
        }
    }
}