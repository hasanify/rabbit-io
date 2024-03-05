import Avatar from "boring-avatars";

const Icon = ({url, slug}: {url?: string; slug: string}) => {
  return (
    <div className="duration-75 ease-in-out group-hover:scale-105">
      {url ? (
        <img className="object-cover w-10 h-auto p-1 rounded-full aspect-square" src={url} />
      ) : (
        <Avatar
          size={40}
          name={slug}
          variant="marble"
          colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
        />
      )}
    </div>
  );
};

export default Icon;
