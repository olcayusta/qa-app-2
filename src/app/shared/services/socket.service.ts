import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, retry } from 'rxjs';
import { environment } from '@environments/environment';
import { filter } from 'rxjs/operators';

interface SocketData {
  event: string;
  payload: object;
}

/*enum socketEvent {
  newAnswer = 'new answer',
  message = 'message'
}*/

export interface SubjectData {
  event: string;
  payload: object;
}

type eventType =
  | 'new answer'
  | 'message'
  | 'hello'
  | 'sport news'
  | 'chat'
  | 'new question';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  subject: WebSocketSubject<SubjectData> = webSocket({
    url: environment.WS_URL,
    protocol: <string>localStorage.getItem('token')
  });

  constructor() {}

  reconnect() {
    this.subject.pipe(
      retry({
        delay: 1000
      })
    );
    /*  .subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });*/
  }

  watch(event: string, subscribe: string): Observable<SubjectData> {
    return this.subject.multiplex(
      () => ({ event: 'watch', subscribe: subscribe }),
      () => ({ event: 'watch', unsubscribe: subscribe }),
      (message) => message.event === subscribe
    );
  }

  sendMessage(message: string) {
    this.subject.subscribe();
    this.subject.next({
      event: 'hello',
      payload: {
        content: message
      }
    });
  }

  /**
   * @description
   * @param event Custom event type (new answer, message, etc.)
   * @returns {Observable<SocketData>} Return an observable that emits the event
   */
  on(event: eventType): Observable<SocketData> {
    return new Observable((subscriber) => {
      this.subject
        .pipe(
          filter((value) => value.event === event),
          retry({
            delay: 2000
          })
        )
        .subscribe((data) => {
          subscriber.next(data);
        });
    });
  }

  /**
   * Connect to the websocket
   */
  connect(): void {
    this.subject.subscribe();
  }

  /**
   * Disconnect from the server
   */
  disconnect(): void {
    this.subject.unsubscribe();
  }
}
