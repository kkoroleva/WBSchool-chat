export interface IPasswordEditData {
	email: string;
	password: string;
	newPassword: string;
}

export interface IUserDeleteData {
	id: string;
	password: string;
}

export interface IFormData {
	oldPsw: string,
	newPsw: string
}

export interface IPasswordOnly {
	body: {
		password: string
	}
}