import React from 'react'
import { useTheme } from '@/components/design-system/utils';
import { textStyles } from '@/components/design-system/typography';

const Header = ({ title, subtitle }: { title: string, subtitle?: string }) => {
  const { theme } = useTheme();
  
  return (
    <>
      <h2 
        style={{ 
          ...textStyles.title2,
          color: theme === 'light' ? '#000000' : '#ffffff' 
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p 
          className="mt-2"
          style={{ 
            ...textStyles.subhead,
            color: theme === 'light' ? '#666666' : '#cccccc' 
          }}
        >
          {subtitle}
        </p>
      )}
    </>
  )
}

export default Header