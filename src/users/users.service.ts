import { BadRequestException, Injectable , InternalServerErrorException, PreconditionFailedException} from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor (  
        @InjectRepository(User)
        private userRepository: Repository<User>
        ) {
        
    }


    async create(registerUserDto: RegisterUserDto): Promise<User> {

        try {
            
            const { name, phone, password } = registerUserDto;

            let userExists =await this.userRepository.findOne({ where: { phone } });
            
            if (userExists && userExists.id) {
                throw new BadRequestException("User already exist.");
            }
        
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
        
            const user = new User();
            user.name = name;
            user.phone = phone;
            user.password = hashedPassword;
            user.password = hashedPassword;
        
            return await this.userRepository.save(user);

        } catch (error) {
            // console.error("error creating user.", error); 
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message)
            }else throw new InternalServerErrorException("An error occur, try again.");
            
        }
      }

      async findOne(id: number): Promise<User> {
        return this.userRepository.findOne({ where: { id } });
      }
    
      async findByPhone(phone: string): Promise<User> {
        return this.userRepository.findOne({ where: { phone } });
      }
}
