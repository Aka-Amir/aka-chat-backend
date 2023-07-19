import { DynamicModule, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

@Module({
  exports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/chat-app')],
})
export class CommonModule {
  static registerForMicroservice(dbDefs?: ModelDefinition[]): DynamicModule {
    return {
      module: CommonModule,
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/chat-app'),
        MongooseModule.forFeature(dbDefs),
      ],
    };
  }
}
