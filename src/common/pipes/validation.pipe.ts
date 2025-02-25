import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToInstance(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            throw new BadRequestException({
                message: 'Validation failed',
                errors: this.formatErrors(errors),
            });
        }
        return object;
    }

    private toValidate(
        metatype: abstract new (...args: any[]) => any,
    ): boolean {
        const types: (abstract new (...args: any[]) => any)[] = [
            String,
            Boolean,
            Number,
            Array,
            Object,
        ];
        return !types.includes(metatype);
    }

    private formatErrors(errors: any[]) {
        return errors.map((error) => ({
            property: error.property,
            constraints: error.constraints,
        }));
    }
}
