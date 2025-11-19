"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from '@/components/design-system/utils';
import { Controls } from '@/components/design-system/controls';

import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

export const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        const newUrl = formUrlQuery({
          searchParams: searchParams.toString(),
          key: "query",
          value: query,
        });

        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeKeysFromQuery({
          searchParams: searchParams.toString(),
          keysToRemove: ["query"],
        });

        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [router, searchParams, query]);

  return (
    <div className="relative flex items-center w-full md:w-64">
      <span className="absolute left-3 pointer-events-none">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={18}
          height={18}
        />
      </span>
      <Controls.SearchInput
        value={query}
        onChange={setQuery}
        theme={theme}
        placeholder="Search..."
        className="pl-10 w-full"
      />
    </div>
  );
};