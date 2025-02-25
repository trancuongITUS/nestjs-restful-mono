import {
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
    Matches,
    IsOptional,
} from 'class-validator';
// Example of DTO, in a real application, move it to exactly module or an global dto folder if it global
export class CreateUserDto {
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {
            message:
                'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
        },
    )
    password: string;

    @IsString()
    @IsOptional()
    @MaxLength(500)
    bio?: string;
}
