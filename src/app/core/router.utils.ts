import { inject } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';

export function getResolverData(name: string) {
  return inject(ActivatedRoute).snapshot.data[name];
}

export function getSnapshotData(name: string): Data {
  return inject(ActivatedRoute).snapshot.data[name];
}

export function getObservableData(): Observable<Data> {
  return inject(ActivatedRoute).data;
}

export function getResolvedData(): Observable<Data> {
  return inject(ActivatedRoute).data;
}
