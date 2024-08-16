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
        <div className="border border-gray-700 rounded-md mt-8 p-4 bg-gray-800">
          <div className="flex justify-between mb-4 text-sm lg:text-base text-gray-100 border-b border-gray-700">
     
                <span className="">
                  <span className="font-semibold">Description: </span>
                  <Paragraph size="medium" className="mb-3 text-gray-100">{description}</Paragraph>
                </span>
          
          </div>
          <Paragraph size="medium" className="flex justify-between mb-4 text-gray-100">
              <span className="">
                <span className="font-semibold text-white">Matchup: </span>
                <span className="capitalize">{faction} </span>
                  v. 
                <span className="capitalize"> {enemyFaction}</span>
              </span>
          </Paragraph>
          <Paragraph size="medium" className="flex justify-between mb-4 text-sm lg:text-base text-gray-100">
            <span>
              <span className="font-semibold text-white">Game Mode: </span>
              {gameMode}
            </span>
            <span>
              <span className="font-semibold text-white">Created: </span> 
              {createdAt}
            </span>
          </Paragraph>
          <Paragraph size="medium" className="flex justify-between">
            <span>
              <span className="font-semibold text-white">Creator: </span>
              {username}
            </span>
            <span>
              <span className="font-semibold text-white">Updated: </span> 
              {updatedAt}
            </span>
          </Paragraph>
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
            <Paragraph size="medium" className="border-t border-gray-700">
              <p className="font-semibold mt-4 text-white">Transition:</p>
              <p>{info}</p>
            </Paragraph>
          )}
        </div>
      </>
    );
  };
  
  export default BuildDetails;
  