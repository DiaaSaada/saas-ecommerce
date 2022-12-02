import { IsEmail , IsNotEmpty, IsOptional, IsString} from "class-validator";

export class EditUser{
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsOptional()
    firstName:  string;

    @IsString()
    @IsOptional()
    lastName:  string;
}