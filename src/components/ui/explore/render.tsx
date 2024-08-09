//import AdSenseDisplay from '@/components/tags/adsense';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, Block, Inline } from '@contentful/rich-text-types';
import AdSense from '@/components/ads/adsense';
import Image from "next/image"

export const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline ) => {
        const { file, title } = (node.data.target as any).fields;
        const imageUrl = file.url;
        const finalImageUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;
  
        return <Image height={900} width={1600} src={finalImageUrl} alt={title} className="w-full object-scale-down max-h-[900px] max-w-[1600px] rounded-lg mb-4 mt-4"/>;
      },
    },
};

export const renderContentBlock = (block: any) => {
    switch (block.fields.blockType) {
      case 'text':
        return <div className="text-white prose-base">{documentToReactComponents(block.fields.textContent)}</div>;
      case 'image':
        const imageUrl = block.fields.image.fields.file.url;
        const finalImageUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;
        return (
          <div className="">
            <Image src={finalImageUrl} alt={block.fields.imageDescription} width={575} height={500} className="w-full object-scale-down max-w-[575px] rounded-lg mb-2" />
            <p className="text-xs text-gray-400">{block.fields.imageCredit ? `Photo By: ${block.fields.imageCredit}` : ''}</p>
          </div>
        )
      case 'image Gallery':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {block.fields.imageGallery.map((img: any) => {
              const galleryImageUrl = img.fields.file.url;
              const galleryFinalImageUrl = galleryImageUrl.startsWith('//') ? `https:${galleryImageUrl}` : galleryImageUrl;
              return <Image key={img.sys.id} src={galleryFinalImageUrl} alt={img.fields.description} width={1600} height={900} className="w-full object-scale-down max-h-[900px] max-w-[1600px] rounded-lg mb-4 mt-4" />;
            })}
          </div>
        );
      case 'video':
        return <iframe src={block.fields.videoUrl} frameBorder="0" className="w-full h-64 md:h-96 my-4"></iframe>;
      case 'code snippet':
        return <pre className="bg-gray-100 p-4 rounded my-4">{block.fields.codeSnippet}</pre>;
      case 'ad': 
        return <div className="py-4">
                  <AdSense
                    adSlot="7423668524" 
                    adFormat="auto"
                    adStyle={{ width: '100%', height: '90px' }} 
                  />
                </div>
      default:
        return null;
    }
};

export const extractTextFromRichText = (richText: any): string => {
  if (!richText) return '';

  return richText.content
    .map((node: any) => {
      if (node.nodeType === 'text') {
        return node.value;
      }

      if (node.nodeType === BLOCKS.PARAGRAPH || node.nodeType === BLOCKS.HEADING_1 || node.nodeType === BLOCKS.HEADING_2) {
        return extractTextFromRichText(node);
      }

      return '';
    })
    .join(' ')
    .trim();
};