// pages/policy/privacy.tsx

import { GetStaticProps } from 'next';
import { fetchEntries } from '../../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { ReactNode } from 'react';

interface PrivacyPolicyProps {
  content: any;
}

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: ReactNode) => <strong>{text}</strong>,
    // Add other marks like italic, underline, etc.
  },
  renderNode: {
    [BLOCKS.HEADING_1]: (node: any, children: ReactNode) => (
      <h1 className="text-4xl font-bold mb-4">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: ReactNode) => (
      <h2 className="text-3xl font-semibold mb-3">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: ReactNode) => (
      <h3 className="text-2xl font-semibold mb-2">{children}</h3>
    ),
    [BLOCKS.PARAGRAPH]: (node: any, children: ReactNode) => (
      <p className="mb-4">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: ReactNode) => (
      <ul className="list-disc list-outside  mb-4">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: ReactNode) => (
      <ol className="list-decimal list-outside  mb-4">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: ReactNode) => (
      <li className="ml-4">{children}</li>
    ),
    // Add other block types like quotes, embedded entries, etc.
  },
};

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ content }) => {
  if (!content) {
    return (
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
        <p>Content not available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div>{documentToReactComponents(content, options)}</div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const entries = await fetchEntries('termsAndConditions');
  const content = entries?.[0]?.fields?.content ?? null;

  return {
    props: {
      content,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
};

export default PrivacyPolicy;
