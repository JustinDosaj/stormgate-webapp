import { doc, setDoc, addDoc, collection, updateDoc, runTransaction, where, query, getDocs, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from '@/lib/firebase';
import { generateSlug } from '@/utils/generateSlug';
import { generateRandomUsername } from '@/utils/generateUsernames';

interface AddBuildProps {
    build?: any;
    user: User;
    newUsername?: string;
    username?: string | null;
}

export async function AddBuildToFirebase({build, user}: AddBuildProps) {

    const { buildName, enemyFaction, faction, gameMode, steps, summary, twitchLink, youtubeLink, description } = build
    const { uid } = user

    const userDocRef = doc(db, 'users', uid)
    const buildsCollectionRef = collection(db, 'builds')
    const date = new Date().toISOString()
    const slug = await generateSlug(buildName)

    const fullBuild = {
        buildName,
        summary,
        enemyFaction,
        faction,
        gameMode,
        steps,
        twitchLink,
        youtubeLink,
        description,
        data: {
            slug,
            createdAt: date,
            updatedAt: date
        },
        owner: {
            id: uid,
            ref: userDocRef,
        },
    }

    const buildDocRef = await runTransaction(db, async (transaction: any) => {
        const counterDocRef = doc(db, 'counters', 'buildCounter');
        const counterDoc = await transaction.get(counterDocRef);

        let buildId = 0;
        if (counterDoc.exists()) {
            buildId = counterDoc.data().count + 1;
            transaction.update(counterDocRef, { count: buildId });
        } else {
            buildId = 0; // Start from 0 if no counter exists
            transaction.set(counterDocRef, { count: buildId });
        }

        const newBuildDocRef = doc(buildsCollectionRef, buildId.toString());
        transaction.set(newBuildDocRef, { ...fullBuild, id: buildId });

        return newBuildDocRef;
    });


    // Reference the user's document and "my-builds" subcollection
    const myBuildsCollectionRef = collection(userDocRef, 'my-builds');

    // Add a reference to the build in the user's "my-builds" subcollection
    await setDoc(doc(myBuildsCollectionRef, buildDocRef.id), {
        buildId: buildDocRef.id,
        ref: buildDocRef,
        buildName, // Optional: Store additional build details if needed
        slug,
    });

    return;
}

export async function UpdateBuildInFirebase({build, user}: AddBuildProps) {
    
    const { buildName, id } = build
    const { slug } = build.data
    
    const buildDocRef = doc(db, 'builds', String(id));
    await updateDoc(buildDocRef, build);

    const userDocRef = doc(db, 'users', user.uid);
    const myBuildsCollectionRef = collection(userDocRef, 'my-builds');

    // Add a reference to the build in the user's "my-builds" subcollection
    await updateDoc(doc(myBuildsCollectionRef, buildDocRef.id), {
        buildId: buildDocRef.id,
        ref: buildDocRef,
        buildName, // Optional: Store additional build details if needed
        slug,
    });

    
}

export async function CheckForDuplicateUserName() {
    
    let username = generateRandomUsername();
    let usernameExists = true;

    // Check for username uniqueness
    while (usernameExists) {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        usernameExists = false;
      } else {
        username = generateRandomUsername();
      }
    }

    return username;
}

export async function UpdateUsername({user, newUsername, username}: AddBuildProps) {

    if (newUsername === username) { 
        
        // Add Notification Here to information username has not changed

        return; 
    }
    
    const userDocRef = doc(db, 'users', user.uid)

    await setDoc(userDocRef, {
        username: newUsername,
    }, {merge: true})

    return;
}

export async function GetAuthor(userId: string) {
    
    const userDocRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userDocRef)

    let author = 'Unknown User'

    if (userDoc.exists()) {
        const userData = userDoc.data()
        author = userData.username || "Unknown User";
    }

    return author
}
