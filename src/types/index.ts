export type Allergy = {
	id: number;
	name: string
};

export type Gender = "MALE" | "FEMALE";

export type BabyInfo = {
	babyAge: string;
	babyName: string;
	babyBirthDate: string;
	parentName: string;
	gender: string;
	selectedAllergies: boolean[];
};
