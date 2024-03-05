import PocketBase from "pocketbase";

export const pb = new PocketBase(import.meta.env.VITE_PB_URL);
pb.autoCancellation(false);

export const login = async () => {
  const user = (await pb.collection("users").authWithOAuth2({provider: "google"})) as User;
  if (user.meta.isNew) {
    await pb.collection("users").update(user.record.id, {
      name: user.meta.name,
      avatar: user.meta.avatarUrl,
    });
  }
  return user;
};

export const logout = () => {
  pb.authStore.clear();
  window.location.replace("/");
};
