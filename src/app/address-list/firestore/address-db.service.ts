import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction, DocumentReference} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AddressEntry} from '../address-entry';

// db.collection('abooks').doc('_userid').collection('addresses').doc('_addressid')
@Injectable({
  providedIn: 'root'
})
export class AddressDbService {
  // inject authentication service to access authenticated userdid
  constructor(private firestore: AngularFirestore) { }

  getAddresses(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore
      .collection('abooks')
      .doc('user')
      .collection('addresses')
      .snapshotChanges();
  }

  createAddress(address: AddressEntry): Promise<DocumentReference> {
    delete address.id;
    return this.firestore
      .collection('abooks')
      .doc('user')
      .collection('addresses')
      .add({...address});
  }

  updateAddress(address: AddressEntry): Promise<void> {
    const addressId = address.id;
    delete address.id;
    return this.firestore
      .collection('abooks')
      .doc('user')
      .collection('addresses')
      .doc(addressId)
      .update(address);
  }

  deleteAddress(addressId: string): Promise<void> {
    return this.firestore
      .collection('abooks')
      .doc('user')
      .collection('addresses')
      .doc(addressId)
      .delete();
  }
}
