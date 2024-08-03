import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { User, getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from 'next/router';
import { db } from '@/lib/firebase';
import { getDoc, doc, setDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  auth: any;
  provider: any;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);  // Default to loading
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const login = async () => {
    try {

      const signInWithPopup = (await import("firebase/auth")).signInWithPopup;
      const result = await signInWithPopup(auth, provider);

      const user = result.user

      if(user) {

        const userRef = doc(db, 'users', user.uid);

        // Check if the document exists
        const docSnap = await getDoc(userRef);

        
        if(!docSnap.exists()) {
          await setDoc(userRef, {
            email: user.email,
            account_status: 'user',
            date_created: new Date().toISOString()
          });
        } 
          router.reload()
      }

    } catch (error) {

      throw error;
    }
  };

  const logout = async () => {

      const signOut = (await import("firebase/auth")).signOut;
      await signOut(auth);

  };

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      
      setUser(currentUser); 
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);


  return (
    <AuthContext.Provider value={{ user, isLoading, auth, provider, login, logout }}>
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
