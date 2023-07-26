import { Subscription } from 'rxjs';
export type SubscriptionRecord = {
  userID: string;
  subscription: Subscription;
};

export type RoomSubscriptionHolder = Record<string, SubscriptionRecord[]>;
