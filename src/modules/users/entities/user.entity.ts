export class User {
  id: number;
  firstName: string;
  lastName: string;
  avatar?: string;
  role?;
  course?;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
