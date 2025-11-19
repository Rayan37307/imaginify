"use client";

import { useToast } from "@/components/ui/use-toast"
import { dataUrl, getImageSize } from "@/lib/utils";
import { CldImage, CldUploadWidget } from "next-cloudinary"
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useTheme } from '@/components/design-system/utils';
import { Material } from '@/components/design-system/materials';
import { textStyles } from '@/components/design-system/typography';
import { Controls } from '@/components/design-system/controls';

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  publicId: string;
  image: any;
  type: string;
}

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type
}: MediaUploaderProps) => {
  const { toast } = useToast()
  const { theme } = useTheme();

  const onUploadSuccessHandler = (result: any) => {
    setImage((prevState: any) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url
    }))

    onValueChange(result?.info?.public_id)

    toast({
      title: 'Image uploaded successfully',
      description: '1 credit was deducted from your account',
      duration: 5000,
      className: 'success-toast'
    })
  }

  const onUploadErrorHandler = (error: any) => {
    toast({
      title: 'Something went wrong while uploading',
      description: 'Please try again',
      duration: 5000,
      className: 'error-toast'
    })
  }

  return (
    <CldUploadWidget
      uploadPreset="jsm_imaginify"
      options={{
        multiple: false,
        resourceType: "image",
        folder: "imaginify",
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <Material material="sheet" theme={theme} className="p-4 rounded-lg">
          <h3 style={{ ...textStyles.headline, marginBottom: '12px' }}>
            Original
          </h3>

          {publicId ? (
            <div className="cursor-pointer overflow-hidden rounded-[10px]">
              <CldImage
                width={getImageSize(type, image, "width")}
                height={getImageSize(type, image, "height")}
                src={publicId}
                alt="image"
                sizes={"(max-width: 767px) 100vw, 50vw"}
                placeholder={dataUrl as PlaceholderValue}
                className="w-full h-auto rounded-lg"
              />
            </div>
          ) : (
            <div 
              className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed rounded-xl cursor-pointer"
              onClick={() => open()}
              style={{ 
                borderColor: theme === 'light' ? '#d2d2d7' : '#545458',
                backgroundColor: theme === 'light' ? '#f8f9fa' : '#2a2a2c'
              }}
            >
              <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                <Image
                  src="/assets/icons/add.svg"
                  alt="Add Image"
                  width={24}
                  height={24}
                />
              </div>
              <p 
                className="text-center"
                style={{ 
                  ...textStyles.subhead,
                  color: theme === 'light' ? '#333333' : '#ffffff' 
                }}
              >
                Click here to upload image
              </p>
            </div>
          )}
        </Material>
      )}
    </CldUploadWidget>
  )
}

export default MediaUploader