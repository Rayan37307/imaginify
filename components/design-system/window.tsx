// macOS Design System - Window Structure Components
// Components for titlebar, toolbar, and sidebar

import React from 'react';
import { backgroundColors, contentColors, getColor, Theme } from './colors';
import { spacing } from './layout';
import { textStyles } from './typography';
import { motion } from 'framer-motion';

// Window titlebar component
interface TitlebarProps {
  title?: string;
  theme: Theme;
  hasTrafficLightButtons?: boolean;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  className?: string;
}

export const Titlebar: React.FC<TitlebarProps> = ({
  title = '',
  theme,
  hasTrafficLightButtons = true,
  onMinimize,
  onMaximize,
  onClose,
  className = ''
}) => {
  const bg = getColor(backgroundColors.contentBackground, theme);
  const labelColor = getColor(contentColors.label, theme);

  return (
    <div 
      className={`flex items-center justify-between px-4 py-2 ${className}`}
      style={{ 
        backgroundColor: bg,
        color: labelColor,
        minHeight: '28px',
        WebkitAppRegion: 'drag'
      }}
    >
      {hasTrafficLightButtons && (
        <div className="flex space-x-2">
          <button 
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 focus:outline-none"
            style={{ WebkitAppRegion: 'no-drag' }}
          />
          <button 
            onClick={onMinimize}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 focus:outline-none"
            style={{ WebkitAppRegion: 'no-drag' }}
          />
          <button 
            onClick={onMaximize}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 focus:outline-none"
            style={{ WebkitAppRegion: 'no-drag' }}
          />
        </div>
      )}
      {title && (
        <div 
          className="text-center flex-grow"
          style={{
            ...textStyles.subhead,
            color: labelColor
          }}
        >
          {title}
        </div>
      )}
      {!title && <div className="flex-grow" />}
      <div style={{ width: hasTrafficLightButtons ? '44px' : '0px' }} />
    </div>
  );
};

// Toolbar component
interface ToolbarProps {
  children: React.ReactNode;
  theme: Theme;
  className?: string;
}

export const Toolbar: React.FC<ToolbarProps> = ({ 
  children, 
  theme, 
  className = '' 
}) => {
  const bg = getColor(backgroundColors.contentBackground, theme);
  
  return (
    <div 
      className={`flex items-center px-3 py-2 border-b ${className}`}
      style={{ 
        backgroundColor: bg,
        borderBottomColor: getColor(contentColors.separator.separator, theme),
        minHeight: '44px'
      }}
    >
      {children}
    </div>
  );
};

// Sidebar component
interface SidebarProps {
  children: React.ReactNode;
  theme: Theme;
  width?: string;
  isCollapsed?: boolean;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  children, 
  theme, 
  width = '240px', 
  isCollapsed = false,
  className = '' 
}) => {
  const bg = getColor(backgroundColors.sidebarBackground, theme);
  
  return (
    <motion.aside
      className={`border-r ${className}`}
      style={{ 
        backgroundColor: bg,
        width: isCollapsed ? '48px' : width,
        borderRightColor: getColor(contentColors.separator.separator, theme)
      }}
      initial={false}
      animate={{ width: isCollapsed ? '48px' : width }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      <div className="p-3">
        {children}
      </div>
    </motion.aside>
  );
};

// Sidebar item component
interface SidebarItemProps {
  children: React.ReactNode;
  theme: Theme;
  isActive?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ 
  children, 
  theme, 
  isActive = false,
  onClick,
  icon,
  className = '' 
}) => {
  const bg = isActive 
    ? getColor(backgroundColors.contentBackground, theme)
    : 'transparent';
  const labelColor = getColor(contentColors.label, theme);
  const secondaryLabelColor = getColor(contentColors.secondaryLabel, theme);
  
  return (
    <div
      className={`flex items-center p-2 rounded-lg cursor-pointer ${className}`}
      style={{ 
        backgroundColor: bg,
        color: isActive ? labelColor : secondaryLabelColor
      }}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span style={textStyles.subhead}>{children}</span>
    </div>
  );
};

// Window container component
interface WindowProps {
  children: React.ReactNode;
  theme: Theme;
  title?: string;
  showTitlebar?: boolean;
  showSidebar?: boolean;
  sidebarContent?: React.ReactNode;
  showToolbar?: boolean;
  toolbarContent?: React.ReactNode;
  className?: string;
}

export const Window: React.FC<WindowProps> = ({
  children,
  theme,
  title,
  showTitlebar = true,
  showSidebar = false,
  sidebarContent,
  showToolbar = false,
  toolbarContent,
  className = ''
}) => {
  const bg = getColor(backgroundColors.windowBackground, theme);
  
  return (
    <div 
      className={`flex flex-col h-full w-full overflow-hidden rounded-lg border ${className}`}
      style={{ 
        backgroundColor: bg,
        borderColor: getColor(contentColors.separator.separator, theme),
        minHeight: '400px',
        minWidth: '600px'
      }}
    >
      {showTitlebar && (
        <Titlebar 
          title={title} 
          theme={theme} 
          hasTrafficLightButtons={true} 
        />
      )}
      
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && sidebarContent && (
          <Sidebar theme={theme}>
            {sidebarContent}
          </Sidebar>
        )}
        
        <div className="flex flex-col flex-1 overflow-hidden">
          {showToolbar && toolbarContent && (
            <Toolbar theme={theme}>
              {toolbarContent}
            </Toolbar>
          )}
          
          <main className="flex-1 overflow-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

// Export all window components
export const WindowComponents = {
  Titlebar,
  Toolbar,
  Sidebar,
  SidebarItem,
  Window,
};