import React from 'react';
import {ChevronRight} from 'lucide-react';

const colors = {
  text: '#0F172A',
  textMuted: '#64748B',
  primary: '#0066CC',
};

interface BreadcrumbProps {
  items: string[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({items}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '16px 0',
      }}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span
            style={{
              fontSize: 16,
              fontWeight: index === items.length - 1 ? 600 : 400,
              color: index === items.length - 1 ? colors.text : colors.textMuted,
            }}
          >
            {item}
          </span>
          {index < items.length - 1 && (
            <ChevronRight size={16} color={colors.textMuted} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};