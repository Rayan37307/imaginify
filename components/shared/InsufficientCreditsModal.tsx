"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from '@/components/design-system/utils';
import { Material } from '@/components/design-system/materials';
import { textStyles } from '@/components/design-system/typography';
import { Controls } from '@/components/design-system/controls';
import { Modal } from '@/components/design-system/motion';

export const InsufficientCreditsModal = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Material material="popover" theme={theme} className="p-6 max-w-md rounded-xl">
        <div className="flex justify-between items-start mb-4">
          <h3 style={{ ...textStyles.headline }}>Insufficient Credits</h3>
          <Controls.Button
            theme={theme}
            variant="icon"
            onClick={() => {
              router.push("/profile");
              setIsOpen(false);
            }}
          >
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
            />
          </Controls.Button>
        </div>

        <div className="flex justify-center mb-4">
          <Image
            src="/assets/images/stacked-coins.png"
            alt="credit coins"
            width={200}
            height={60}
          />
        </div>

        <h4 
          className="mb-3 text-center"
          style={{ ...textStyles.title3 }}
        >
          Oops.... Looks like you&#39;ve run out of free credits!
        </h4>

        <p 
          className="mb-6 text-center"
          style={{ 
            ...textStyles.subhead,
            opacity: 0.8
          }}
        >
          No worries, though - you can keep enjoying our services by grabbing
          more credits.
        </p>

        <div className="flex gap-3">
          <Controls.Button
            theme={theme}
            variant="push"
            onClick={() => {
              router.push("/profile");
              setIsOpen(false);
            }}
            className="flex-1"
          >
            No, Cancel
          </Controls.Button>
          <Controls.Button
            theme={theme}
            variant="push"
            onClick={() => {
              router.push("/credits");
              setIsOpen(false);
            }}
            className="flex-1 bg-blue-500 text-white hover:bg-blue-600"
          >
            Yes, Proceed
          </Controls.Button>
        </div>
      </Material>
    </Modal>
  );
};