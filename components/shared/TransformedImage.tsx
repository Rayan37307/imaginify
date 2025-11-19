"use client"

import { dataUrl, debounce, download, getImageSize } from '@/lib/utils'
import { CldImage, getCldImageUrl } from 'next-cloudinary'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React from 'react'
import { useTheme } from '@/components/design-system/utils';
import { Material } from '@/components/design-system/materials';
import { textStyles } from '@/components/design-system/typography';
import { Controls } from '@/components/design-system/controls';

const TransformedImage = ({ image, type, title, transformationConfig, isTransforming, setIsTransforming, hasDownload = false }: TransformedImageProps) => {
  const { theme } = useTheme();

  const downloadHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    download(getCldImageUrl({
      width: image?.width,
      height: image?.height,
      src: image?.publicId,
      ...transformationConfig
    }), title)
  }

  return (
    <Material material="sheet" theme={theme} className="p-4 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 style={{ ...textStyles.headline }}>
          Transformed
        </h3>

        {hasDownload && (
          <Controls.Button
            theme={theme}
            variant="icon"
            onClick={downloadHandler}
          >
            <Image
              src="/assets/icons/download.svg"
              alt="Download"
              width={20}
              height={20}
            />
          </Controls.Button>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className="relative">
          <CldImage
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            src={image?.publicId}
            alt={image.title}
            sizes={"(max-width: 767px) 100vw, 50vw"}
            placeholder={dataUrl as PlaceholderValue}
            className="w-full h-auto rounded-lg"
            onLoad={() => {
              setIsTransforming && setIsTransforming(false);
            }}
            onError={() => {
              debounce(() => {
                setIsTransforming && setIsTransforming(false);
              }, 8000)()
            }}
            {...transformationConfig}
          />

          {isTransforming && (
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-lg"
              style={{ 
                backgroundColor: theme === 'light' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.2)'
              }}
            >
              <Image
                src="/assets/icons/spinner.svg"
                width={50}
                height={50}
                alt="spinner"
                className="animate-spin"
              />
              <p 
                className="mt-2 text-white"
                style={{ ...textStyles.subhead }}
              >
                Please wait...
              </p>
            </div>
          )}
        </div>
      ): (
        <div 
          className="flex items-center justify-center h-48 rounded-lg"
          style={{ 
            backgroundColor: theme === 'light' ? '#f8f9fa' : '#2a2a2c',
            border: `2px dashed ${theme === 'light' ? '#d2d2d7' : '#545458'}`
          }}
        >
          <span 
            style={{ 
              ...textStyles.subhead,
              color: theme === 'light' ? '#999999' : '#aaaaaa' 
            }}
          >
            Transformed Image
          </span>
        </div>
      )}
    </Material>
  )
}

export default TransformedImage