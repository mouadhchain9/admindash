import { UserApp } from "./interfaces";

declare module "next-auth"{

interface Session{
user:UserApp

}

}