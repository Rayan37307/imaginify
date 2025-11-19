// Test Component to showcase the macOS Design System

import React, { useState } from 'react';
import { Window, SidebarItem } from './window';
import { Material } from './materials';
import { Controls } from './controls';
import { MotionComponents } from './motion';
import { useTheme } from './utils';
import { textStyles } from './typography';
import { spacing } from './layout';

const DesignSystemDemo: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [textInput, setTextInput] = useState('');
  const [checkbox1, setCheckbox1] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [selectValue, setSelectValue] = useState('option1');
  const [stepperValue, setStepperValue] = useState(0);
  const [dateValue, setDateValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div style={{ height: '100vh', padding: spacing[4] }}>
      <MotionComponents.MotionDiv>
        <Window 
          theme={theme}
          title="MacOS Design System Demo"
          showSidebar={true}
          showToolbar={true}
          sidebarContent={
            <>
              <SidebarItem theme={theme} isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
                Overview
              </SidebarItem>
              <SidebarItem theme={theme} isActive={activeTab === 'components'} onClick={() => setActiveTab('components')}>
                Components
              </SidebarItem>
              <SidebarItem theme={theme} isActive={activeTab === 'typography'} onClick={() => setActiveTab('typography')}>
                Typography
              </SidebarItem>
              <SidebarItem theme={theme} isActive={activeTab === 'colors'} onClick={() => setActiveTab('colors')}>
                Colors
              </SidebarItem>
            </>
          }
          toolbarContent={
            <div className="flex items-center space-x-4">
              <Controls.Button 
                theme={theme} 
                variant="text" 
                onClick={toggleTheme}
              >
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
              </Controls.Button>
              <Controls.SearchInput
                value={searchValue}
                onChange={setSearchValue}
                theme={theme}
                placeholder="Search..."
              />
            </div>
          }
        >
          <div className="space-y-6">
            <Material material="sheet" theme={theme} padding="6" borderRadius="lg">
              <h1 style={{ ...textStyles.title1, marginBottom: spacing[4] }}>
                macOS Design System
              </h1>
              <p style={{ ...textStyles.body, marginBottom: spacing[4] }}>
                A comprehensive design system implementing Apple's design principles and Human Interface Guidelines.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controls.Button 
                  theme={theme} 
                  variant="push" 
                  onClick={() => alert('Push button clicked!')}
                >
                  Push Button
                </Controls.Button>
                
                <Controls.Button 
                  theme={theme} 
                  variant="rounded" 
                  onClick={() => alert('Rounded button clicked!')}
                >
                  Rounded Button
                </Controls.Button>
                
                <Controls.Button 
                  theme={theme} 
                  variant="bezel" 
                  onClick={() => alert('Bezel button clicked!')}
                >
                  Bezel Button
                </Controls.Button>
                
                <Controls.Button 
                  theme={theme} 
                  variant="icon" 
                  onClick={() => alert('Icon button clicked!')}
                >
                  ✨
                </Controls.Button>
              </div>
            </Material>
            
            <Material material="sheet" theme={theme} padding="6" borderRadius="lg">
              <h2 style={{ ...textStyles.title2, marginBottom: spacing[4] }}>
                Form Components
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label style={{ ...textStyles.subhead, display: 'block', marginBottom: spacing[2] }}>
                    Text Input
                  </label>
                  <Controls.TextInput
                    value={textInput}
                    onChange={setTextInput}
                    theme={theme}
                    placeholder="Enter text..."
                  />
                </div>
                
                <div className="flex space-x-4">
                  <Controls.Checkbox
                    checked={checkbox1}
                    onChange={setCheckbox1}
                    theme={theme}
                    label="Checkbox"
                  />
                  
                  <Controls.RadioButton
                    checked={radioValue === 'option1'}
                    onChange={() => setRadioValue('option1')}
                    theme={theme}
                    label="Radio 1"
                    name="radio-group"
                  />
                  
                  <Controls.RadioButton
                    checked={radioValue === 'option2'}
                    onChange={() => setRadioValue('option2')}
                    theme={theme}
                    label="Radio 2"
                    name="radio-group"
                  />
                </div>
                
                <div className="flex space-x-4">
                  <div>
                    <label style={{ ...textStyles.subhead, display: 'block', marginBottom: spacing[2] }}>
                      Select
                    </label>
                    <Controls.PopupButton
                      value={selectValue}
                      onChange={setSelectValue}
                      options={[
                        { label: 'Option 1', value: 'option1' },
                        { label: 'Option 2', value: 'option2' },
                        { label: 'Option 3', value: 'option3' },
                      ]}
                      theme={theme}
                    />
                  </div>
                  
                  <div>
                    <label style={{ ...textStyles.subhead, display: 'block', marginBottom: spacing[2] }}>
                      Stepper
                    </label>
                    <Controls.Stepper
                      value={stepperValue}
                      onChange={setStepperValue}
                      theme={theme}
                    />
                  </div>
                  
                  <div>
                    <label style={{ ...textStyles.subhead, display: 'block', marginBottom: spacing[2] }}>
                      Date
                    </label>
                    <Controls.DatePicker
                      value={dateValue}
                      onChange={setDateValue}
                      theme={theme}
                    />
                  </div>
                </div>
              </div>
            </Material>
            
            <Material material="sheet" theme={theme} padding="6" borderRadius="lg">
              <h2 style={{ ...textStyles.title2, marginBottom: spacing[4] }}>
                Modals & Sheets
              </h2>
              
              <div className="flex space-x-4">
                <Controls.Button 
                  theme={theme} 
                  variant="push" 
                  onClick={() => setShowModal(true)}
                >
                  Open Modal
                </Controls.Button>
                
                <Controls.Button 
                  theme={theme} 
                  variant="push" 
                  onClick={() => setShowSheet(true)}
                >
                  Open Sheet
                </Controls.Button>
                
                <div 
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <Controls.Button 
                    theme={theme} 
                    variant="text"
                  >
                    Hover for Tooltip
                  </Controls.Button>
                  <MotionComponents.Tooltip 
                    content="This is a tooltip!" 
                    isVisible={showTooltip}
                  >
                    <div style={{ position: 'absolute', left: '-9999px' }} />
                  </MotionComponents.Tooltip>
                </div>
              </div>
            </Material>
          </div>
        </Window>
      </MotionComponents.MotionDiv>
      
      {/* Modal Example */}
      <MotionComponents.Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
      >
        <Material material="popover" theme={theme} padding="6" borderRadius="lg">
          <h3 style={{ ...textStyles.headline, marginBottom: spacing[4] }}>
            Modal Example
          </h3>
          <p style={{ ...textStyles.body, marginBottom: spacing[4] }}>
            This is a modal dialog with slide-in animation from the top.
          </p>
          <div className="flex justify-end">
            <Controls.Button 
              theme={theme} 
              variant="text" 
              onClick={() => setShowModal(false)}
            >
              Close
            </Controls.Button>
          </div>
        </Material>
      </MotionComponents.Modal>
      
      {/* Sheet Example */}
      <MotionComponents.Sheet 
        isOpen={showSheet} 
        onClose={() => setShowSheet(false)}
        position="bottom"
      >
        <Material material="sheet" theme={theme} padding="6" borderRadius="lg">
          <h3 style={{ ...textStyles.headline, marginBottom: spacing[4] }}>
            Sheet Example
          </h3>
          <p style={{ ...textStyles.body, marginBottom: spacing[4] }}>
            This is a sheet that slides up from the bottom.
          </p>
          <div className="flex justify-end">
            <Controls.Button 
              theme={theme} 
              variant="text" 
              onClick={() => setShowSheet(false)}
            >
              Close
            </Controls.Button>
          </div>
        </Material>
      </MotionComponents.Sheet>
    </div>
  );
};

export default DesignSystemDemo;