import { ApiProperty } from '@nestjs/swagger';

export class QuoteDto {
  @ApiProperty({ description: 'The id of the Quote', nullable: false })
  id: number;
  @ApiProperty({ description: 'The text of the Quote', nullable: false })
  text: string;
}
