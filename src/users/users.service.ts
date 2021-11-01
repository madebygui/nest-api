import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    /**
     * TODO:
     * Armazenar a foto no s3
     * Limpar os caracteres especiais do CPF - OK
     */

    const cpf = createUserDto.cpf.replace(/[^0-9 ]/g, '');

    return createUserDto;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    /**
     * TODO:
     * Apagar a foto no s3 se existir
     * Armazenar a nova foto no s3
     * Limpar os caracteres especiais do CPF - OK
     * Proteger a rota com JWT
     */

    const cpf = updateUserDto.cpf.replace(/[^0-9 ]/g, '');
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    /**
     * TODO:
     * Proteger a rota com JWT
     */
    return `This action removes a #${id} user`;
  }
}
