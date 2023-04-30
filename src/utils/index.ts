export const validateEmail = (email: string) => {
	const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return pattern.test(String(email).toLowerCase());
}