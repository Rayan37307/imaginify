import { SignedIn, auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

import Header from "@/components/shared/Header";
import { plans } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import Checkout from "@/components/shared/Checkout";
import { useTheme } from '@/components/design-system/utils';
import { Material } from '@/components/design-system/materials';
import { textStyles } from '@/components/design-system/typography';
import { Controls } from '@/components/design-system/controls';
import { spacing } from '@/components/design-system/layout';

const Credits = async () => {
  const { userId } = auth();
  const { theme } = useTheme();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  return (
    <>
      <Header
        title="Buy Credits"
        subtitle="Choose a credit package that suits your needs!"
      />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {plans.map((plan) => (
          <Material 
            key={plan.name} 
            material="sheet" 
            theme={theme} 
            className="p-6 rounded-xl flex flex-col"
          >
            <div className="flex flex-col items-center gap-3 mb-6">
              <Image src={plan.icon} alt="check" width={50} height={50} />
              <h3 
                style={{ 
                  ...textStyles.title2,
                  color: theme === 'light' ? '#007AFF' : '#0A84FF'
                }}
              >
                {plan.name}
              </h3>
              <p style={{ ...textStyles.title1 }}>${plan.price}</p>
              <p style={{ ...textStyles.subhead }}>{plan.credits} Credits</p>
            </div>

            {/* Inclusions */}
            <ul className="flex flex-col gap-4 flex-1 py-4">
              {plan.inclusions.map((inclusion) => (
                <li
                  key={plan.name + inclusion.label}
                  className="flex items-center gap-4"
                >
                  <Image
                    src={`/assets/icons/${
                      inclusion.isIncluded ? "check.svg" : "cross.svg"
                    }`}
                    alt="check"
                    width={20}
                    height={20}
                  />
                  <span style={{ ...textStyles.subhead }}>{inclusion.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6">
              {plan.name === "Free" ? (
                <Controls.Button 
                  theme={theme} 
                  variant="push" 
                  disabled
                  className="w-full"
                >
                  Free Consumable
                </Controls.Button>
              ) : (
                <SignedIn>
                  <Checkout
                    plan={plan.name}
                    amount={plan.price}
                    credits={plan.credits}
                    buyerId={user._id}
                  />
                </SignedIn>
              )}
            </div>
          </Material>
        ))}
      </section>
    </>
  );
};

export default Credits;