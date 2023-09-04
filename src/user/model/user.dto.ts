import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'The id of the User', nullable: false })
  email: string;
  @ApiProperty({ description: 'The password of the User', nullable: false })
  password: string;
}
