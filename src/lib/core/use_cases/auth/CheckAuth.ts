import type { IAuthRepository } from "$lib/core/repositories/IAuthRepository";


export class CheckAuth {
    constructor(private AuthRepository: IAuthRepository) { }

    async execute() {
        return this.AuthRepository.checkAuth();
    }
}