"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { aspectRatioOptions, creditFee, defaultValues, transformationTypes } from "@/constants"
import { CustomField } from "./CustomField"
import { useEffect, useState, useTransition } from "react"
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils"
import MediaUploader from "./MediaUploader"
import TransformedImage from "./TransformedImage"
import { updateCredits } from "@/lib/actions/user.actions"
import { getCldImageUrl } from "next-cloudinary"
import { addImage, updateImage } from "@/lib/actions/image.actions"
import { useRouter } from "next/navigation"
import { InsufficientCreditsModal } from "./InsufficientCreditsModal"
import { useTheme } from '@/components/design-system/utils';
import { Controls, Button as MacOSButton } from '@/components/design-system/controls';
import { Material } from '@/components/design-system/materials';
import { textStyles } from '@/components/design-system/typography';
import { spacing } from '@/components/design-system/layout';

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
})

const TransformationForm = ({ action, data = null, userId, type, creditBalance, config = null }: TransformationFormProps) => {
  const transformationType = transformationTypes[type];
  const [image, setImage] = useState(data)
  const [newTransformation, setNewTransformation] = useState<Transformations | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformationConfig, setTransformationConfig] = useState(config)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { theme } = useTheme();

  const initialValues = data && action === 'Update' ? {
    title: data?.title,
    aspectRatio: data?.aspectRatio,
    color: data?.color,
    prompt: data?.prompt,
    publicId: data?.publicId,
  } : defaultValues

   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    if(data || image) {
      const transformationUrl = getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...transformationConfig
      })

      const imageData = {
        title: values.title,
        publicId: image?.publicId,
        transformationType: type,
        width: image?.width,
        height: image?.height,
        config: transformationConfig,
        secureURL: image?.secureURL,
        transformationUrl: transformationUrl,
        aspectRatio: values.aspectRatio,
        prompt: values.prompt,
        color: values.color,
      }

      if(action === 'Add') {
        try {
          // Validate required fields before saving
          console.log('🔍 Image data before saving:', imageData);

          if (!imageData.title) {
            throw new Error('Image title is required');
          }
          if (!imageData.publicId) {
            throw new Error('Image publicId is required');
          }
          if (!imageData.secureURL) {
            throw new Error('Image secureURL is required. Please upload an image first.');
          }
          if (!imageData.transformationType) {
            throw new Error('Transformation type is required');
          }

          console.log('✅ All required fields present, calling addImage...');

          const newImage = await addImage({
            image: imageData,
            userId,
            path: '/'
          })

          if(newImage) {
            form.reset()
            setImage(data)
            router.push(`/transformations/${newImage._id}`)
          }
        } catch (error) {
          console.log('❌ Error saving image:', error);
          alert(`Error saving image: ${error.message}`);
        }
      }

      if(action === 'Update') {
        try {
          const updatedImage = await updateImage({
            image: {
              ...imageData,
              _id: data._id
            },
            userId,
            path: `/transformations/${data._id}`
          })

          if(updatedImage) {
            router.push(`/transformations/${updatedImage._id}`)
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    setIsSubmitting(false)
  }

  const onSelectFieldHandler = (value: string, onChangeField: (value: string) => void) => {
    const imageSize = aspectRatioOptions[value as AspectRatioKey]

    setImage((prevState: any) => ({
      ...prevState,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }))

    setNewTransformation(transformationType.config);

    return onChangeField(value)
  }

  const onInputChangeHandler = (fieldName: string, value: string, type: string, onChangeField: (value: string) => void) => {
    debounce(() => {
      setNewTransformation((prevState: any) => ({
        ...prevState,
        [type]: {
          ...prevState?.[type],
          [fieldName === 'prompt' ? 'prompt' : 'to' ]: value
        }
      }))
    }, 1000)();

    return onChangeField(value)
  }

  const onTransformHandler = async () => {
    setIsTransforming(true)

    setTransformationConfig(
      deepMergeObjects(newTransformation, transformationConfig)
    )

    setNewTransformation(null)

    startTransition(async () => {
      await updateCredits(userId, creditFee)
    })
  }

  useEffect(() => {
    if(image && (type === 'restore' || type === 'removeBackground')) {
      setNewTransformation(transformationType.config)
    }
  }, [image, transformationType.config, type])

  return (
    <Material material="sheet" theme={theme} className="p-6 rounded-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {creditBalance < Math.abs(creditFee) && <InsufficientCreditsModal />}
          
          <div>
            <label style={{ ...textStyles.subhead, display: 'block', marginBottom: spacing[2] }}>
              Image Title
            </label>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <Controls.TextInput
                  value={field.value}
                  onChange={field.onChange}
                  theme={theme}
                  placeholder="Enter image title"
                />
              )}
            />
          </div>

          {type === 'fill' && (
            <div>
              <label style={{ ...textStyles.subhead, display: 'block', marginBottom: spacing[2] }}>
                Aspect Ratio
              </label>
              <FormField
                control={form.control}
                name="aspectRatio"
                render={({ field }) => (
                  <Controls.PopupButton
                    value={field.value}
                    onChange={(value) => onSelectFieldHandler(value, field.onChange)}
                    options={Object.keys(aspectRatioOptions).map(key => ({
                      label: aspectRatioOptions[key as AspectRatioKey].label,
                      value: key
                    }))}
                    theme={theme}
                  />
                )}
              />
            </div>
          )}

          {(type === 'remove' || type === 'recolor') && (
            <div className="space-y-4">
              <div>
                <label style={{ ...textStyles.subhead, display: 'block', marginBottom: spacing[2] }}>
                  {type === 'remove' ? 'Object to remove' : 'Object to recolor'}
                </label>
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <Controls.TextInput
                      value={field.value}
                      onChange={(e) => onInputChangeHandler(
                        'prompt',
                        e.target.value,
                        type,
                        field.onChange
                      )}
                      theme={theme}
                      placeholder={type === 'remove' ? 'Enter object to remove' : 'Enter object to recolor'}
                    />
                  )}
                />
              </div>

              {type === 'recolor' && (
                <div>
                  <label style={{ ...textStyles.subhead, display: 'block', marginBottom: spacing[2] }}>
                    Replacement Color
                  </label>
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <Controls.TextInput
                        value={field.value}
                        onChange={(e) => onInputChangeHandler(
                          'color',
                          e.target.value,
                          'recolor',
                          field.onChange
                        )}
                        theme={theme}
                        placeholder="Enter replacement color"
                      />
                    )}
                  />
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label style={{ ...textStyles.subhead, display: 'block', marginBottom: spacing[2] }}>
                Upload Image
              </label>
              <FormField
                control={form.control}
                name="publicId"
                render={({ field }) => (
                  <MediaUploader
                    onValueChange={field.onChange}
                    setImage={setImage}
                    publicId={field.value}
                    image={image}
                    type={type}
                  />
                )}
              />
            </div>

            <div>
              <label style={{ ...textStyles.subhead, display: 'block', marginBottom: spacing[2] }}>
                Preview
              </label>
              <TransformedImage
                image={image}
                type={type}
                title={form.getValues().title}
                isTransforming={isTransforming}
                setIsTransforming={setIsTransforming}
                transformationConfig={transformationConfig}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <MacOSButton
              theme={theme}
              variant="push"
              disabled={isTransforming || newTransformation === null}
              onClick={onTransformHandler}
              className="w-full"
            >
              {isTransforming ? 'Transforming...' : 'Apply Transformation'}
            </MacOSButton>
            <MacOSButton
              theme={theme}
              variant="push"
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Submitting...' : 'Save Image'}
            </MacOSButton>
          </div>
        </form>
      </Form>
    </Material>
  )
}

export default TransformationForm