import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { User } from "../../users/users.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "email",
    });
  }
  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.getAuthenticatedUser(email, password);
    return user;
  }
}