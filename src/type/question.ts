export interface Question {
  id?: string;
  hasHealthPlan: boolean | null;
  healPlan: string | null;
  praticeSports: boolean | null;
  whyGoToGym: string[];
  whyGoToGymAnother: string | null;
  howToFindAcademy: string | null;
  howToFindAcademyAnother: string | null;
  userOfAnotherGym: boolean | null;
}
