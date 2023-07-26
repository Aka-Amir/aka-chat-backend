import { Subject } from 'rxjs';

export type RoomsHolder<T> = Record<string, Subject<T>>;
