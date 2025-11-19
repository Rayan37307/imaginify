import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/shared/Header";
import TransformedImage from "@/components/shared/TransformedImage";
import { Button } from "@/components/ui/button";
import { getImageById } from "@/lib/actions/image.actions";
import { getImageSize } from "@/lib/utils";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import { useTheme } from '@/components/design-system/utils';
import { Material } from '@/components/design-system/materials';
import { textStyles } from '@/components/design-system/typography';
import { Controls } from '@/components/design-system/controls';
import { spacing } from '@/components/design-system/layout';

const ImageDetails = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth();
  const { theme } = useTheme();

  const image = await getImageById(id);

  return (
    <>
      <Header title={image.title} />

      <section className="mt-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span style={{ ...textStyles.subhead, opacity: 0.7 }}>Transformation:</span>
          <span 
            className="px-2 py-1 rounded-full text-xs"
            style={{ 
              backgroundColor: theme === 'light' ? '#f0f0f0' : '#404040',
              ...textStyles.footnote,
              textTransform: 'capitalize'
            }}
          >
            {image.transformationType}
          </span>
        </div>

        {image.prompt && (
          <>
            <span style={{ opacity: 0.5 }}>&#x25CF;</span>
            <div className="flex items-center gap-2">
              <span style={{ ...textStyles.subhead, opacity: 0.7 }}>Prompt:</span>
              <span 
                className="px-2 py-1 rounded-full text-xs"
                style={{ 
                  backgroundColor: theme === 'light' ? '#f0f0f0' : '#404040',
                  ...textStyles.footnote,
                  textTransform: 'capitalize'
                }}
              >
                {image.prompt}
              </span>
            </div>
          </>
        )}

        {image.color && (
          <>
            <span style={{ opacity: 0.5 }}>&#x25CF;</span>
            <div className="flex items-center gap-2">
              <span style={{ ...textStyles.subhead, opacity: 0.7 }}>Color:</span>
              <span 
                className="px-2 py-1 rounded-full text-xs"
                style={{ 
                  backgroundColor: theme === 'light' ? '#f0f0f0' : '#404040',
                  ...textStyles.footnote,
                  textTransform: 'capitalize'
                }}
              >
                {image.color}
              </span>
            </div>
          </>
        )}

        {image.aspectRatio && (
          <>
            <span style={{ opacity: 0.5 }}>&#x25CF;</span>
            <div className="flex items-center gap-2">
              <span style={{ ...textStyles.subhead, opacity: 0.7 }}>Aspect Ratio:</span>
              <span 
                className="px-2 py-1 rounded-full text-xs"
                style={{ 
                  backgroundColor: theme === 'light' ? '#f0f0f0' : '#404040',
                  ...textStyles.footnote,
                  textTransform: 'capitalize'
                }}
              >
                {image.aspectRatio}
              </span>
            </div>
          </>
        )}
      </section>

      <section className="mt-8" style={{ borderColor: theme === 'light' ? '#e5e7eb' : '#374151' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ORIGINAL IMAGE */}
          <Material material="sheet" theme={theme} className="p-4 rounded-xl">
            <h3 style={{ ...textStyles.headline, marginBottom: spacing[3] }}>Original</h3>
            <Image
              width={getImageSize(image.transformationType, image, "width")}
              height={getImageSize(image.transformationType, image, "height")}
              src={image.secureURL}
              alt="image"
              className="w-full h-auto rounded-lg"
            />
          </Material>

          {/* TRANSFORMED IMAGE */}
          <TransformedImage
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config}
            hasDownload={true}
          />
        </div>

        {userId === image.author.clerkId && (
          <div className="mt-6 space-y-4">
            <Link href={`/transformations/${image._id}/update`}>
              <Controls.Button 
                theme={theme} 
                variant="push" 
                className="w-full"
              >
                Update Image
              </Controls.Button>
            </Link>

            <DeleteConfirmation imageId={image._id} />
          </div>
        )}
      </section>
    </>
  );
};

export default ImageDetails;