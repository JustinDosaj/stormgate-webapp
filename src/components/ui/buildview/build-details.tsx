// components/build/BuildDetails.tsx
interface BuildDetailsProps {
    description: string;
    faction: string;
    enemyFaction: string;
    gameMode: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    youtubeLink: string;
    twitchLink: string;
    info?: string;
  }
  
  const BuildDetails: React.FC<BuildDetailsProps> = ({
    description,
    faction,
    enemyFaction,
    gameMode,
    username,
    createdAt,
    updatedAt,
    youtubeLink,
    twitchLink,
    info,
  }) => {
    return (
      <>
        <p className="mb-3">{description}</p>
        <div className="border-b gray-300 w-full my-3" />
        <div className="flex justify-between mb-4 text-sm lg:text-base">
          <span className="capitalize">Faction: {faction}</span>
          <span className="capitalize">Enemy Faction: {enemyFaction}</span>
        </div>
        <div className="flex justify-between mb-4 text-sm lg:text-base">
          <span>Game Mode: {gameMode}</span>
          <span>Created by: {username}</span>
        </div>
        <div className="flex justify-between mb-4 text-sm lg:text-base">
          <span>Created At: {createdAt}</span>
          <span>Last Updated: {updatedAt}</span>
        </div>
        <div className="mb-4 text-sm lg:text-base">
          <a
            href={youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            Watch on YouTube
          </a>{" "}
          {" | "}
          <a
            href={twitchLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 underline"
          >
            Watch on Twitch
          </a>
        </div>
        {info && (
          <div className="mb-8 text-sm lg:text-base">
            <p className="font-semibold">Additional Information:</p>
            <p>{info}</p>
          </div>
        )}
      </>
    );
  };
  
  export default BuildDetails;
  