import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ description: 'The email of the User', nullable: false })
  email: string;
  @ApiProperty({ description: 'The password of the User', nullable: false })
  password: string;
}
