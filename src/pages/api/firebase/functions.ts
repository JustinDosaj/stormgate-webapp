import { doc, setDoc, arrayUnion, addDoc, collection, updateDoc, runTransaction, where, query, getDocs, getDoc, increment, arrayRemove, deleteDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from '@/lib/firebase';
import { generateSlug } from '@/utils/generateSlug';
import { generateRandomUsername } from '@/utils/generateUsernames';
import { Notify } from '@/components/shared/notify';

interface AddBuildProps {
    build?: any;
    user: User;
    newUsername?: string;
    username?: string | null;
    likes?: number | 0;
    id?: string;
}

export async function AddBuildToFirebase({build, user}: AddBuildProps) {

    const { buildName, enemyFaction, faction, gameMode, steps, summary, twitchLink, youtubeLink, description } = build
    const { uid } = user

    const userDocRef = doc(db, 'users', uid)
    const buildsCollectionRef = collection(db, 'builds')
    const date = new Date().getTime()
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
            updatedAt: date,
            likes: 0,
            likedBy: [],
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

    const id = buildDocRef.id

    return {slug, id};
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
        return; 
    }
    
    const userDocRef = doc(db, 'users', user.uid)

    await setDoc(userDocRef, {
        username: newUsername,
    }, {merge: true}).then(() => {
        Notify("Username updated successfully")
    })

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

interface LikesProps {
    id: string;
    user: User;
    likes: number | 0;
    remove?: boolean;
}

export async function UpdateLikesInFirebase({likes, id, user, remove}: LikesProps) {

    const buildDocRef = doc(db, 'builds', id);
    
    if(remove == true) {
        await updateDoc(buildDocRef, {
            "data.likes": increment(-1),
            "data.likedBy": arrayRemove(user.uid),
        });
        return;
    } else {
        await updateDoc(buildDocRef, {
            "data.likes": increment(1),
            "data.likedBy": arrayUnion(user.uid),
        });
    }
}

interface DeleteBuildProps {
    userId: string;
    buildId: string;
}

export async function DeleteBuildFromFirebase({userId, buildId}: DeleteBuildProps) {
    try {
        // Reference the build document in the 'builds' collection
        const buildDocRef = doc(db, 'builds', buildId);

        // Reference the user's document and "my-builds" subcollection
        const userDocRef = doc(db, 'users', userId);
        const myBuildsDocRef = doc(userDocRef, 'my-builds', buildId);

        // Delete the build document from the 'builds' collection
        await deleteDoc(buildDocRef);

        // Delete the reference from the user's "my-builds" subcollection
        await deleteDoc(myBuildsDocRef);

        Notify("Build deleted successfully");

    } catch (error) {
        console.error("Error deleting build: ", error);
    }
}
