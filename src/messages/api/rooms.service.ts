import { Injectable } from '@nestjs/common';
import { Observer, Subject } from 'rxjs';
import {
  RoomSubscriptionHolder,
  SubscriptionRecord,
  RoomsHolder,
} from '../@types';

@Injectable()
export class RoomsService<MSG_T> {
  private rooms: RoomsHolder<MSG_T> = {};
  private roomsSubscriptions: RoomSubscriptionHolder = {};

  private constructRoom(roomID: string): void {
    if (!this.rooms[roomID]) {
      this.rooms[roomID] = new Subject<MSG_T>();
    }
    if (!this.roomsSubscriptions[roomID]) {
      this.roomsSubscriptions[roomID] = [];
    }
  }

  private destructRoom(roomID: string): void {
    if (!this.roomsSubscriptions[roomID]?.length) {
      this.roomsSubscriptions[roomID].forEach((record) => {
        if (!record.subscription.closed) record.subscription.unsubscribe();
      });
    }
    delete this.rooms[roomID];
  }

  private removeUserFormRoom(
    roomID: string,
    userID: string,
  ): SubscriptionRecord | undefined {
    const subscriptions = this.roomsSubscriptions[roomID];
    const subscriptionIndex = subscriptions.findIndex(
      (user) => user.userID === userID,
    );
    if (subscriptionIndex === -1) return undefined;
    const subscription = subscriptions[subscriptionIndex];
    subscriptions.splice(subscriptionIndex, 1);
    this.roomsSubscriptions[roomID] = subscriptions;
    return subscription;
  }

  public joinToRoom(roomID: string, userID: string) {
    this.constructRoom(roomID);
    return {
      subscribe: (subscriber: Observer<MSG_T>) => {
        const subscription = this.rooms[roomID]
          .asObservable()
          .subscribe(subscriber);
        this.roomsSubscriptions[roomID].push({
          userID,
          subscription,
        });
        subscription.add(() => {
          this.removeUserFormRoom(roomID, userID);
          if (!this.roomsSubscriptions[roomID].length)
            this.destructRoom(roomID);
        });
        return {
          subscription,
          room: this.rooms[roomID].asObservable(),
        };
      },
    };
  }

  public emitMessage(roomID: string, data: MSG_T) {
    this.rooms[roomID].next(data);
  }

  public destroyRoom(roomID: string) {
    this.rooms[roomID].complete();
    return this.destructRoom(roomID);
  }
}
