import {Arg, FieldResolver, ObjectType, Resolver} from "type-graphql";
import {InjectRepository as Inject} from "typeorm-typedi-extensions";
import {User} from "../entities/User";
import {Repository} from "typeorm";
import {SignInArgs, SignUpArgs} from "./types/input-types";
import JWT from "../services/JWT";
import {AuthPayload} from "./types/object-types";

@ObjectType()
@Resolver((of) => AuthMutation)
export class AuthMutation {
    constructor(
        @Inject(User) private readonly userRepository: Repository<User>,
    ) {
    }

    @FieldResolver((returns) => AuthPayload)
    public async signUp(@Arg("input") input: SignUpArgs): Promise<AuthPayload> {
        const {email} = input;
        let user = await this.userRepository.findOne({where: {email}});

        if (user) {
            throw new Error("User already exists");
        }

        user = await this.userRepository.create(input);
        await this.userRepository.save(user);
        const payload = new AuthPayload();

        payload.token = JWT.sign({id: user.id, email: user.email});

        return payload;
    }

    @FieldResolver((returns) => AuthPayload)
    public async signIn(@Arg("input") input: SignInArgs): Promise<AuthPayload> {
        const {email, password} = input;
        const user = await this.userRepository.findOne({where: {email}});
        const validPassword = await user.comparePassword(password);
        if (!user || !validPassword) {
            // TODO Use correct HTTP statuses
            throw new Error("Invalid credentials");
        }

        return {
            token: JWT.sign({id: user.id, email: user.email}),
        };
    }
}
