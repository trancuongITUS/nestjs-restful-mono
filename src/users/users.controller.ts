import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../common/dto/create-user.dto';

@Controller('users') //Example of a controller, in a real application, move it to modules folder
export class UsersController {
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        // In a real application, you would have a service handling the business logic
        return {
            message: 'User created successfully',
            user: createUserDto,
        };
    }
}
