import type { User } from 'firebase/auth';
import Cookies from 'js-cookie';
import { AuthRepository } from '../adapters/AuthRepository';
import { userStore } from '../stores/authStore';
import { CheckAuth } from '../use_cases/auth/CheckAuth';
import { CreateUserWithEmail } from '../use_cases/auth/CreateUserWithEmail';
import { GetUser } from '../use_cases/auth/GetUser';
import { LoginWithFacebook } from '../use_cases/auth/LoginUsingFacebook';
import { LoginWithEmail } from '../use_cases/auth/LoginWithEmail';
import { LoginWithGoogle } from '../use_cases/auth/LoginWithGoogle';
import { Logout } from '../use_cases/auth/Logout';

const authRepository = new AuthRepository();
const CreateUserWithEmailUseCase = new CreateUserWithEmail(authRepository);
const LogoutUseCase = new Logout(authRepository);
const LoginUsingGoogleUseCase = new LoginWithGoogle(authRepository);
const LoginUsingFacebookUseCase = new LoginWithFacebook(authRepository);
const LoginWithEmailAndPasswordUseCase = new LoginWithEmail(authRepository);
const CheckAuthUseCase = new CheckAuth(authRepository);
const GetUserUseCase = new GetUser(authRepository);

export const loginWithEmailAndPassword = async (email: string, password: string) => {
	await LoginWithEmailAndPasswordUseCase.execute(email, password);
};

export const logout = async () => {
	await LogoutUseCase.execute();
};

export const registerWithEmailAndPassword = async (
	email: string,
	password: string,
	name: string
) => {
	await CreateUserWithEmailUseCase.execute(email, password, name);
};

export const loginUsingGoogle = async () => {
	await LoginUsingGoogleUseCase.execute();
};

export const loginUsingFacebook = async () => {
	await LoginUsingFacebookUseCase.execute();
};

export const checkAuth = async () => {
	await CheckAuthUseCase.execute();
};

export const refreshUser = async () => {
};
