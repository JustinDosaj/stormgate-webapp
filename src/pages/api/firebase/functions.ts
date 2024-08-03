import { doc, setDoc, addDoc, collection, runTransaction } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from '@/lib/firebase';

interface AddBuildProps {
    build: any;
    user: User;
}

export async function AddBuildToFirebase({build, user}: AddBuildProps) {

    const { buildName, enemyFaction, faction, gameMode, steps, summary, twitchLink, youtubeLink, description } = build
    const { uid, email } = user

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
            username: email || 'Temp Username',
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

async function generateSlug(buildName: string) {
    return buildName.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}