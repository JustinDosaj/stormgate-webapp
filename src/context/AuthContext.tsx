import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  User,
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink, // Import this function
} from "firebase/auth";
import { useRouter } from "next/router";
import { db } from "@/lib/firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { CheckForDuplicateUserName } from "@/pages/api/firebase/functions";
import { Notify } from "@/components/shared/notify";

interface AuthContextType {
  user: User | null;
  username: string | null;
  isLoading: boolean;
  auth: any;
  provider: any;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  sendSignInLink: (email: string, redirect?: string) => Promise<void>;
  finishSignIn: () => Promise<void>;  // Update this type
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Default to loading
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const { redirect } = router.query;

  const login = async () => {
    try {
      const signInWithPopup = (await import("firebase/auth")).signInWithPopup;
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      if (user) {
        const userRef = doc(db, "users", user.uid);

        // Check if the document exists
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
          const username = await CheckForDuplicateUserName();

          await setDoc(userRef, {
            email: user.email,
            username: username,
            account_status: "user",
            date_created: new Date().toISOString(),
          });

          setUsername(username);
        } else {
          setUsername(docSnap.data().username);
        }
        router.push(redirect ? String(redirect) : "/");
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    setUsername(null);
    const signOut = (await import("firebase/auth")).signOut;
    await signOut(auth);
  };

  const sendSignInLink = async (email: string, redirect?: string) => {
    const actionCodeSettings = {
      // Your redirect URL
      url: `${process.env.NEXT_PUBLIC_URL}/auth/finishSignIn${redirect ? `?redirect=${redirect}` : ``}`, // Change this to your actual redirect URL
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      Notify("Check your email for the sign-in link")
    } catch (error) {
      Notify("Invalid email address, please try again.")
      console.error("Error sending email link:", error);
    }
  };

  const finishSignIn = async () => {
    const email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      console.error("Email for sign-in is not available.");
      return;
    }

    if (isSignInWithEmailLink(auth, window.location.href)) {
      try {
        const result = await signInWithEmailLink(auth, email, window.location.href);
        const user = result.user
        window.localStorage.removeItem("emailForSignIn");
        
      if (user) {
        const userRef = doc(db, "users", user.uid);

        // Check if the document exists
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
          const username = await CheckForDuplicateUserName();

          await setDoc(userRef, {
            email: user.email,
            username: username,
            account_status: "user",
            date_created: new Date().toISOString(),
          });

          setUsername(username);
        } else {
          setUsername(docSnap.data().username);
        }
        router.push(redirect ? String(redirect) : "/");
      } else {
        router.push("/auth/login")
      }

        
        router.push("/");
      } catch (error) {
        console.error("Error signing in with email link:", error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);

      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUsername(docSnap.data().username); // Set the username from Firestore
        }
      } else {
        setUsername(null); // Reset username if not authenticated
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        auth,
        provider,
        username,
        login,
        logout,
        sendSignInLink,
        finishSignIn, // Use finishSignIn here
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
