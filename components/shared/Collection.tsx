"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { transformationTypes } from "@/constants";
import { IImage } from "@/lib/database/models/image.model";
import { formUrlQuery } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Search } from "./Search";
import { useTheme } from '@/components/design-system/utils';
import { Material } from '@/components/design-system/materials';
import { textStyles } from '@/components/design-system/typography';
import { Controls } from '@/components/design-system/controls';
import { spacing } from '@/components/design-system/layout';

export const Collection = ({
  hasSearch = false,
  images,
  totalPages = 1,
  page,
}: {
  images: IImage[];
  totalPages?: number;
  page: number;
  hasSearch?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useTheme();

  // PAGINATION HANDLER
  const onPageChange = (action: string) => {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      searchParams: searchParams.toString(),
      key: "page",
      value: pageValue,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 style={{ ...textStyles.title2 }}>Recent Edits</h2>
        {hasSearch && <Search />}
      </div>

      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card image={image} key={image._id} theme={theme} />
          ))}
        </div>
      ) : (
        <Material material="sheet" theme={theme} className="flex items-center justify-center h-40 rounded-xl">
          <p style={{ ...textStyles.body, color: theme === 'light' ? '#666666' : '#aaaaaa' }}>
            Empty List
          </p>
        </Material>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8 pt-8 border-t" style={{ borderColor: theme === 'light' ? '#e5e7eb' : '#374151' }}>
          <Controls.Button
            theme={theme}
            variant="push"
            disabled={Number(page) <= 1}
            onClick={() => onPageChange("prev")}
          >
            Previous
          </Controls.Button>

          <span style={{ ...textStyles.subhead, color: theme === 'light' ? '#333333' : '#ffffff' }}>
            {page} / {totalPages}
          </span>

          <Controls.Button
            theme={theme}
            variant="push"
            onClick={() => onPageChange("next")}
            disabled={Number(page) >= totalPages}
          >
            Next
          </Controls.Button>
        </div>
      )}
    </>
  );
};

const Card = ({ image, theme }: { image: IImage, theme: 'light' | 'dark' }) => {
  return (
    <Link href={`/transformations/${image._id}`}>
      <Material material="sheet" theme={theme} className="p-4 rounded-xl hover:shadow-md transition-shadow">
        <CldImage
          src={image.publicId}
          alt={image.title}
          width={image.width}
          height={image.height}
          {...image.config}
          loading="lazy"
          className="h-52 w-full rounded-lg object-cover mb-3"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />
        <div className="flex items-center justify-between">
          <p 
            className="truncate"
            style={{ 
              ...textStyles.subhead,
              color: theme === 'light' ? '#333333' : '#ffffff' 
            }}
          >
            {image.title}
          </p>
          <Image
            src={`/assets/icons/${
              transformationTypes[
                image.transformationType as TransformationTypeKey
              ].icon
            }`}
            alt={image.title}
            width={20}
            height={20}
          />
        </div>
      </Material>
    </Link>
  );
};