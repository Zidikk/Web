import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty({ description: 'The quoteID of the Comment', nullable: false })
  quoteID: number;
  @ApiProperty({ description: 'The text of the Comment', nullable: false })
  text: string;
}
