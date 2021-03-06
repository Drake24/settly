/**
 * Client model
 */
export default interface ClientModel {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto?: string;
  file?: File | null;
}
