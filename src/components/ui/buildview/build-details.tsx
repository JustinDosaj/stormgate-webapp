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
        <div className="border-b border-gray-700 mt-4"></div>
        <h2 className="text-2xl font-semibold mt-4 mb-4">Build Details</h2>
        <div className="border border-gray-700 rounded-md p-4 bg-gray-800">
          <div className="flex justify-between mb-4 text-sm lg:text-base text-gray-100 border-b border-gray-700">
     
                <span className="">
                  <span className="font-semibold">Description: </span>
                  <Paragraph size="medium" className="mb-3">{description}</Paragraph>
                </span>
          
          </div>
          <div className="flex justify-between mb-4 text-sm lg:text-base text-gray-100">
              <span className="">
                <span className="font-semibold">Matchup: </span>
                <span className="capitalize">{faction} </span>
                  v. 
                <span className="capitalize"> {enemyFaction}</span>
              </span>
          </div>
          <div className="flex justify-between mb-4 text-sm lg:text-base text-gray-100">
            <span>
              <span className="font-semibold">Game Mode: </span>
              {gameMode}
            </span>
            <span>
                <span className="font-semibold">Created: </span> 
                {createdAt}
              </span>
          </div>
          <div className="flex justify-between  text-sm lg:text-base text-gray-100">
            <span>
              <span className="font-semibold">Creator: </span>
              {username}
            </span>
            <span>
              <span className="font-semibold">Updated: </span> 
              {updatedAt}
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
            <div className="text-sm lg:text-base text-gray-100 border-t border-gray-700">
              <p className="font-semibold mt-4">Transition:</p>
              <p>{info}</p>
            </div>
          )}
        </div>
      </>
    );
  };
  
  export default BuildDetails;
  