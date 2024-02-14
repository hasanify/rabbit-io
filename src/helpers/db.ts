import PocketBase from 'pocketbase';
import {AuthSystemFields} from '../types/pocketbase-types';

export const pb = new PocketBase(process.env.REACT_APP_PB_URL);
pb.autoCancellation(false);

if (pb.authStore.model) {
  pb.collection('users').subscribe<AuthSystemFields>(pb.authStore.model.id, e => {
    if (e.action === 'delete') {
      pb.authStore.clear();
      window.location.replace('/');
    } else pb.authStore.save(pb.authStore.token, e.record);
  });
}
