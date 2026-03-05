import React from 'react';
import {Home, Search, Bookmark, User} from 'lucide-react';

const colors = {
  primary: '#0066CC',
  text: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',
};

interface BottomNavProps {
  activeTab?: 'home' | 'search' | 'saved' | 'profile';
}

export const BottomNav: React.FC<BottomNavProps> = ({activeTab = 'home'}) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'saved', icon: Bookmark, label: 'Saved' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        background: 'white',
        borderTop: `1px solid ${colors.border}`,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 20,
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <div
            key={tab.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isActive ? `${colors.primary}15` : 'transparent',
                borderRadius: 12,
              }}
            >
              <Icon
                size={24}
                color={isActive ? colors.primary : colors.textMuted}
                strokeWidth={isActive ? 2.5 : 2}
              />
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? colors.primary : colors.textMuted,
              }}
            >
              {tab.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};