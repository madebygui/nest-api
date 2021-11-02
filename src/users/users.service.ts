import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AWS from 'aws-sdk';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    AWS.config.loadFromPath('./s3_config.json');
    const s3Bucket = new AWS.S3();

    const buf = Buffer.from(
      createUserDto.foto.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );

    const filename = Math.random().toString(36).substr(2, 5);
    const data = {
      Key: filename,
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
      Bucket: 'myBucket',
    };
    s3Bucket.putObject(data, function (err, data) {
      if (err) {
        console.log(err);
        console.log('Erro no upload: ', data);
      } else {
        console.log('Upload com sucess!');
      }
    });

    createUserDto.cpf = createUserDto.cpf.replace(/[^0-9 ]/g, '');
    createUserDto.foto = filename;

    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    /**
     * TODO:
     * Apagar a foto no s3 se existir
     * Proteger a rota com JWT
     */

    AWS.config.loadFromPath('./s3_config.json');
    const s3Bucket = new AWS.S3();

    const buf = Buffer.from(
      updateUserDto.foto.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );

    const filename = Math.random().toString(36).substr(2, 5);
    const data = {
      Key: filename,
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
      Bucket: 'myBucket',
    };
    s3Bucket.putObject(data, function (err, data) {
      if (err) {
        console.log(err);
        console.log('Erro no upload: ', data);
      } else {
        console.log('Upload com sucess!');
      }
    });

    updateUserDto.cpf = updateUserDto.cpf.replace(/[^0-9 ]/g, '');
    updateUserDto.foto = filename;

    const user = await this.usersRepository.findOne(id);

    user.cpf = updateUserDto.cpf;
    user.foto = updateUserDto.foto;
    user.nome = updateUserDto.nome;
    user.senha = updateUserDto.senha;

    return this.usersRepository.save(user);
  }

  remove(id: number) {
    /**
     * TODO:
     * Proteger a rota com JWT
     */

    return this.usersRepository.delete(id);
  }
}
