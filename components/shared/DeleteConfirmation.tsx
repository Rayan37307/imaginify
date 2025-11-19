"use client";

import { useTransition, useState } from "react";
import { useTheme } from '@/components/design-system/utils';
import { Material } from '@/components/design-system/materials';
import { textStyles } from '@/components/design-system/typography';
import { Controls } from '@/components/design-system/controls';
import { Modal } from '@/components/design-system/motion';

import { deleteImage } from "@/lib/actions/image.actions";

export const DeleteConfirmation = ({ imageId }: { imageId: string }) => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme } = useTheme();

  return (
    <>
      <Controls.Button
        theme={theme}
        variant="push"
        onClick={() => setIsOpen(true)}
        className="w-full"
      >
        Delete Image
      </Controls.Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Material material="popover" theme={theme} className="p-6 max-w-md rounded-xl">
          <h3 style={{ ...textStyles.headline, marginBottom: '12px' }}>
            Are you sure you want to delete this image?
          </h3>
          <p 
            className="mb-6"
            style={{ 
              ...textStyles.subhead,
              opacity: 0.8
            }}
          >
            This will permanently delete this image
          </p>
          
          <div className="flex justify-end gap-3">
            <Controls.Button
              theme={theme}
              variant="text"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Controls.Button>
            <Controls.Button
              theme={theme}
              variant="push"
              onClick={() => {
                startTransition(async () => {
                  await deleteImage(imageId);
                  setIsOpen(false);
                });
              }}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              {isPending ? "Deleting..." : "Delete"}
            </Controls.Button>
          </div>
        </Material>
      </Modal>
    </>
  );
};