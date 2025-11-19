import { Collection } from "@/components/shared/Collection"
import { navLinks } from "@/constants"
import { getAllImages } from "@/lib/actions/image.actions"
import Image from "next/image"
import Link from "next/link"
import { Material } from '@/components/design-system/materials';
import { useTheme } from '@/components/design-system/utils';
import { textStyles } from '@/components/design-system/typography';
import { spacing } from '@/components/design-system/layout';

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';
  const { theme } = useTheme();

  const images = await getAllImages({ page, searchQuery})

  return (
    <>
      <Material material="sheet" theme={theme} className="mb-6 lg:mb-8 rounded-xl" padding="6">
        <h1 style={{ ...textStyles.title1, marginBottom: spacing[4] }}>
          Unleash Your Creative Vision with Imaginify
        </h1>
        <div className="flex justify-center w-full gap-8 lg:gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-gray-800 shadow-md">
                <Image src={link.icon} alt="image" width={24} height={24} />
              </div>
              <p 
                className="text-center"
                style={{ 
                  ...textStyles.subhead,
                  color: theme === 'light' ? '#333333' : '#ffffff' 
                }}
              >
                {link.label}
              </p>
            </Link>
          ))}
        </div>
      </Material>

      <section className="sm:mt-6 lg:mt-8">
        <Collection
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  )
}

export default Home