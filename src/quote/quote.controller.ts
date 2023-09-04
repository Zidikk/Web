import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuoteService } from './quote.service';
import { QuoteDto } from './model/quote.dto';

@ApiTags('Quote')
@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}
  @ApiOperation({
    summary: 'creation new quote',
  })
  @ApiResponse({
    status: 201,
    description: 'Quote was successfully created',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden create new quote',
  })
  @Post()
  createQuote(@Body() dto: QuoteDto) {
    return this.quoteService.createQuote(dto);
  }

  @ApiOperation({
    summary: 'getting all quotes',
  })
  @ApiResponse({
    status: 200,
    description: 'Quotes was successfully get',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden get quotes',
  })
  @Get()
  getQuotes() {
    return this.quoteService.getQuotes();
  }

  @ApiOperation({
    summary: 'deletion quote',
  })
  @ApiResponse({
    status: 202,
    description: 'Quote was successfully deleted',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden deletion quote',
  })
  @Delete(':id')
  deleteQuote(@Param('id') id: number) {
    this.quoteService.deleteQuote(id);
  }

  @ApiOperation({
    summary: 'update quote',
  })
  @ApiResponse({
    status: 202,
    description: 'Quote was successfully updated',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden update quote',
  })
  @Put(':id')
  updateQuote(@Param('id') id: number, @Body() dto: QuoteDto) {
    this.quoteService.updateQuote(id, dto);
  }
}
