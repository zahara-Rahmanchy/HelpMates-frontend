export interface IOpportunityData {
  id: string;
  name: string;
  image: string[];
  title: string;
  description: string;
  location: string;
  organization: String;
  skillsRequired: string[]; // List of skills required for the opportunity
  duration: number; // Duration of the volunteer work
  startDate: Date;
  endDate: Date;
  status: string;
  createdAt: string;
  updatedAt: string;
  volunteerApplications?: string[];
}

export interface IOpportunityDataInput {
  image: string[];
  title: String;
  description: String;
  location: String;
  organization: String;
  benefit: string;
  status: string;
  skillsRequired: String[];
  startDate: Date;
  endDate: Date;
}
export interface IPetDataInsert {
  name: string;
  image: string[];
  species: string;
  breed: string;
  age: number;
  size: string;
  specialNeeds: string[];
  gender: string;
  location: string;
  description: string;
  temperament: string;

  healthStatus: string;
  adoptionRequirements: string;
}
export interface IApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IOpportunityData;
}
