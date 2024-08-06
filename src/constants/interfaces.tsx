export interface BuildListProps {
    builds: Build[];
    title: string;
    currentPage: number;
    totalPages: number;
}
  
export interface Build {
    id: string;
    slug: string;
    title: string;
    author: string;
    ownerId?: string;
    faction: string;
    enemyFaction: string;
    likes: number;
    dateCreated: string;
    timestamp?: number;
}

export interface BuildStep {
    id: string;
    timing: {
      type: string;
      value: string; 
    };
    action: {
      type: string;
      value: string;
    };
    description: string; 
    amount: number;
}

export interface SubmitBuildProps {
  buildName: string;
  summary: string;
  gameMode: string;
  faction: string;
  enemyFaction: string;
  youtubeLink: string;
  twitchLink: string;
  description: string;
  steps: BuildStep[];
}

