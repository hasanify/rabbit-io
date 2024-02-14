import {pb} from './db';

export const login = async () => {
  const user = (await pb.collection('users').authWithOAuth2({provider: 'google'})) as User;
  if (user.meta.isNew) {
    await pb.collection('users').update(user.record.id, {
      name: user.meta.name,
      avatar: user.meta.avatarUrl,
    });
  }
  return user;
};
