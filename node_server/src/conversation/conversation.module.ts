import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { HttpModule } from '@nestjs/axios';
import { Conversation } from './entities/Conversation';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation]), HttpModule],
  controllers: [ConversationController],
  providers: [ConversationService],
})
export class ConversationModule {}
