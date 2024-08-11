import { Paragraph } from "@/components/shared/paragraph";

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
        <Paragraph size="medium" className="mb-3">{description}</Paragraph>
        <div className="border-b gray-300 w-full my-3" />
        <div className="flex justify-between mb-4 text-sm lg:text-base text-gray-100">
          <span className="">
            <span className="font-semibold">Matchup: </span>
              <span className="capitalize">{faction} </span>
               v. 
              <span className="capitalize"> {enemyFaction}</span>
            </span>
            <span>
              <span className="font-semibold">Created: </span> 
              {createdAt}
            </span>
        </div>
        <div className="flex justify-between mb-4 text-sm lg:text-base text-gray-100">
          <span>
            <span className="font-semibold">Game Mode: </span>
            {gameMode}
          </span>
          <span>
            <span className="font-semibold">Updated: </span> 
            {updatedAt}
          </span>
        </div>
        <div className="flex justify-between mb-4 text-sm lg:text-base text-gray-100">
          <span>
            <span className="font-semibold">Creator: </span>
             {username}
          </span>

        </div>
        <div className="mb-4 text-sm lg:text-base space-x-4 flex">
          {youtubeLink !== "" && (
          <a
            href={youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400/90 hover:text-red-400/80 underline"
          >
            Watch YouTube Video
          </a>)}
          {twitchLink !== "" && twitchLink !== "" && (
            <p>{" | "}</p>
          )}
          {twitchLink !== "" && (
            <a
              href={twitchLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-400/80  underline"
            >
              Watch Twitch Clip
            </a>
          )}
        </div>
        {info && (
          <div className="mb-8 text-sm lg:text-base text-gray-100">
            <p className="font-semibold">Notes:</p>
            <p>{info}</p>
          </div>
        )}
      </>
    );
  };
  
  export default BuildDetails;
  