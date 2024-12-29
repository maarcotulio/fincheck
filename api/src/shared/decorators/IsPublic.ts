import { SetMetadata } from "@nestjs/common";

const IS_PUBLIC_KEY = "IS_PUBLIC";

export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
