
  export interface Role {
    roleName: string;
  }
  export interface User{
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    roles: Role[];
    id: number;
    token: string;
  }