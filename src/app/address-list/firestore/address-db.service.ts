import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction, DocumentReference} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AddressEntry} from '../address-entry';

@Injectable({
  providedIn: 'root'
})
export class AddressDbService {

  constructor(private firestore: AngularFirestore) { }

  getAddresses(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('addresses').snapshotChanges();
  }

  createAddress(address: AddressEntry): Promise<DocumentReference> {
    delete address.id;
    return this.firestore.collection('addresses').add({...address});
  }

  updateAddress(address: AddressEntry): Promise<void> {
    const addressId = address.id;
    delete address.id;
    return this.firestore.collection('addresses').doc(addressId).update(address);
  }

  deleteAddress(addressId: string): Promise<void> {
    return this.firestore.collection('addresses').doc(addressId).delete();
  }
}
