interface BuildInfo {
    buildName: string;
    setBuildName: (value: string) => void;
    info: string;
    setInfo: (value: string) => void;
    gameMode: string;
    setGameMode: (value: string) => void;
    faction: string;
    setFaction: (value: string) => void;
    enemyFaction: string;
    setEnemyFaction: (value: string) => void;
    youtubeLink: string;
    setYoutubeLink: (value: string) => void;
    twitchLink: string;
    setTwitchLink: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
}

export default function AddBuildInfo({
    buildName, setBuildName, 
    info, setInfo, 
    gameMode, setGameMode, 
    faction, setFaction, 
    enemyFaction, setEnemyFaction, 
    youtubeLink, setYoutubeLink, 
    twitchLink, setTwitchLink,
    description, setDescription }: BuildInfo) {

    return(
        <div className="bg-gray-800 p-6 rounded-lg w-full">
            <h2 className="text-xl font-semibold mb-4">General Build Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="buildName" className="block font-semibold mb-2">Build Name (max 65 chars):</label>
                <input
                  type="text"
                  id="buildName"
                  maxLength={40}
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  value={buildName}
                  onChange={(e) => setBuildName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="description" className="block font-semibold mb-2">Description (max 250 chars):</label>
                <input
                  type="text"
                  id="description"
                  maxLength={250}
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="gameMode" className="block font-semibold mb-2">Game Mode:</label>
                <select
                  id="gameMode"
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  value={gameMode}
                  onChange={(e) => setGameMode(e.target.value)}
                >
                  <option>1v1</option>
                </select>
              </div>
              <div>
                <label htmlFor="faction" className="block font-semibold mb-2">Faction Selection:</label>
                <select
                  id="faction"
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  value={faction}
                  onChange={(e) => setFaction(e.target.value.toLowerCase())}
                >
                  <option value="vanguard">Vanguard</option>
                  <option value="infernals">Infernal</option>
                  <option value="celestials">Celestial</option>
                </select>
              </div>
              <div>
                <label htmlFor="enemyFaction" className="block font-semibold mb-2">Enemy Faction:</label>
                <select
                  id="enemyFaction"
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  value={enemyFaction}
                  onChange={(e) => setEnemyFaction(e.target.value.toLowerCase())}
                >
                  <option value="any">Any</option>
                  <option value="vanguard">Vanguard</option>
                  <option value="infernals">Infernal</option>
                  <option value="celestials">Celestial</option>
                </select>
              </div>
              <div>
                <label htmlFor="youtubeLink" className="block font-semibold mb-2">YouTube Link (Optional):</label>
                <input
                  type="text"
                  id="youtubeLink"
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="twitchLink" className="block font-semibold mb-2">Twitch Link (Optional):</label>
                <input
                  type="text"
                  id="twitchLink"
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  value={twitchLink}
                  onChange={(e) => setTwitchLink(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="additionalInfo" className="block font-semibold mb-2">Transition:</label>
                <textarea
                  id="additionalInfo"
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  value={info}
                  onChange={(e) => setInfo(e.target.value)}
                />
              </div>
            </div>
          </div>
    )
}