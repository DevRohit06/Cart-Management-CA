import type { IAuthRepository } from "$lib/core/repositories/IAuthRepository";

export class LoginWithGoogle {
    constructor(private AuthRepository: IAuthRepository) {}

    async execute() {
        return this.AuthRepository.LoginUsingGoogle();
    }
}