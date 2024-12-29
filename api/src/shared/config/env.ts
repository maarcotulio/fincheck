import { IsNotEmpty, IsString, NotEquals, validateSync } from "class-validator";
import { plainToInstance } from "class-transformer";

class Env {
  @IsString()
  @IsNotEmpty()
  @NotEquals("unsecure_jwt_secret")
  jwtSecret: string;

  @IsString()
  @IsNotEmpty()
  dbURL: string;
}

export const env: Env = plainToInstance(Env, {
  dbURL: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
});

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}
