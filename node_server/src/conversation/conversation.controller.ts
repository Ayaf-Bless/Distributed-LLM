import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get()
  getConversations() {
    return this.conversationService.getConversations();
  }

  @Post('query')
  // I will create a DTO here, to define how the body should look like
  sendQuery(@Body() data: { model: string; question: string }) {
    return this.conversationService.sendQuery(data.model, data.question);
  }

  @Post('select_model')
  selectModel(@Body() data: { model: string }) {
    return this.conversationService.selectModel(data.model);
  }

  @Get(':id')
  getConversationDetail(@Param('id', ParseIntPipe) id: number) {
    return this.conversationService.getConversationDetail(id);
  }
}
