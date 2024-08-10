import { doc, setDoc, arrayUnion, addDoc, collection, updateDoc, where, query, getDocs, getDoc, increment, arrayRemove, deleteDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from '@/lib/firebase';
import { generateRandomUsername } from '@/utils/generateUsernames';
import { Notify } from '@/components/shared/notify';
import { httpsCallable, getFunctions } from 'firebase/functions';

interface AddBuildProps {
    build?: any;
    user: User;
    newUsername?: string;
    username?: string | null;
    likes?: number | 0;
    id?: string;
}

export async function AddBuildToFirebase({build}: AddBuildProps) {

    const data = {
        "build": build,
    }

    const functions = getFunctions();
    const addBuildOrder = httpsCallable(functions, 'addBuildOrder');

    let slug = ""
    let id = ""

    await addBuildOrder(data).then((res) => { 

        if(res && res.data) {

            const responseData = res.data as any;

            console.log("Response Data: ", responseData)

            slug = responseData.slug;
            id = responseData.id;

            Notify("Build added successfully")
        }
    }).catch(() => {
        Notify("Error processing request. Please try again later.");
    })

    return { slug, id };
}

export async function UpdateBuildInFirebase({build}: AddBuildProps) {
    
    const data = {
        "build": build,
    }

    const functions = getFunctions();
    const updateBuildOrder = httpsCallable(functions, 'updateBuildOrder');

    let slug = ""
    let id = ""

    await updateBuildOrder(data).then((res) => {

        console.log(res)

        if(res && res.data) {

            const responseData = res.data as any;

            slug = responseData.slug;
            id = responseData.id;

            Notify("Build updated successfully")
        }

    }).catch(() => {
        Notify("Error updating build order. Please try again later.")
    })

    return { slug, id }
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
        return false; 
    }

    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', newUsername));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        // Username already exists
        Notify('Username is already taken. Please choose another one.');
        return false;
    }
    
    const userDocRef = doc(db, 'users', user.uid)

    await setDoc(userDocRef, {
        username: newUsername,
    }, {merge: true}).then(() => {
        Notify("Username updated successfully")
    })

    return true;
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

interface Report {
    slug: string;
    buildId: string;
    userId: string;
  }

export async function reportContentToFirebase(slug: string, buildId: string, userId: string): Promise<void> {
    const report: Report = { slug, buildId, userId };
  
    try {
      await addDoc(collection(db, 'reports'), report);
      Notify('Report submitted successfully');
    } catch (error) {
      Notify('Problem submitting report, please try again.')
    }
}
