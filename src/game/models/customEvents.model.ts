import { Person } from "../Person";

export interface PersonEventDetail {
  whoId: Person["id"];
}
export interface PersonEventProps {
  detail: PersonEventDetail;
}
