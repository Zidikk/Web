import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @ApiProperty({ description: 'The text of the Post', nullable: false })
  text: string;
  @ApiProperty({ description: 'The userID of the Post', nullable: false })
  userID: number;
}
