// pages/builds/add.tsx
import { useState } from 'react';
import { managementClient } from '../../lib/contentful-management';
import { useAuth } from '@/context/AuthContext';
import { db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function AddBuild() {
  const [buildName, setBuildName] = useState('');
  const user = useAuth();

  const handleSubmit = async () => {
    if (!user) return;

    try {
      // Create build entry in Contentful
      const space = await managementClient.getSpace('YOUR_SPACE_ID');
      const environment = await space.getEnvironment('master');
      const entry = await environment.createEntry('build', {
        fields: {
          title: {
            'en-US': buildName,
          },
        },
      });
      await entry.publish();

      // Store user-build association in Firestore
      await setDoc(doc(db, 'users', user.uid, 'builds', entry.sys.id), {
        buildName,
        contentfulEntryId: entry.sys.id,
      });

      // Clear form or show success message
      setBuildName('');
    } catch (error) {
      console.error('Error adding build:', error);
    }
  };

  return (
    <div className="dark:bg-gray-900 min-h-screen text-white flex items-center justify-center">
      <div className="w-full max-w-xs">
        <h1 className="text-3xl font-bold mb-4">Add New Build</h1>
        <input
          type="text"
          placeholder="Build Name"
          className="w-full p-2 mb-4 bg-gray-800 text-white"
          value={buildName}
          onChange={(e) => setBuildName(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 p-2"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
