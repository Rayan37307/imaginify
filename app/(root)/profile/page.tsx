import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Collection } from "@/components/shared/Collection";
import Header from "@/components/shared/Header";
import { getUserImages } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { useTheme } from '@/components/design-system/utils';
import { Material } from '@/components/design-system/materials';
import { textStyles } from '@/components/design-system/typography';

const Profile = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const { userId } = auth();
  const { theme } = useTheme();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  const images = await getUserImages({ page, userId: user._id });

  return (
    <>
      <Header title="Profile" />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Material material="sheet" theme={theme} className="p-6 rounded-xl">
          <p className="mb-4" style={{ ...textStyles.subhead, opacity: 0.8 }}>
            CREDITS AVAILABLE
          </p>
          <div className="flex items-center gap-4 mt-2">
            <Image
              src="/assets/icons/coins.svg"
              alt="coins"
              width={40}
              height={40}
            />
            <h2 style={{ ...textStyles.title1 }}>{user.creditBalance}</h2>
          </div>
        </Material>

        <Material material="sheet" theme={theme} className="p-6 rounded-xl">
          <p className="mb-4" style={{ ...textStyles.subhead, opacity: 0.8 }}>
            IMAGE MANIPULATION DONE
          </p>
          <div className="flex items-center gap-4 mt-2">
            <Image
              src="/assets/icons/photo.svg"
              alt="images"
              width={40}
              height={40}
            />
            <h2 style={{ ...textStyles.title1 }}>{images?.data.length}</h2>
          </div>
        </Material>
      </section>

      <section className="mt-8">
        <Collection
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
        />
      </section>
    </>
  );
};

export default Profile;