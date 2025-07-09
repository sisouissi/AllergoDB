import React from 'react';
import { AllergenCategory } from '../types';

interface IconProps {
  className?: string;
}

export const ChatIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

export const SendIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);


const TreeIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22v-8m0-4V2" />
    <path d="M22 10h-8M2 10h8" />
    <path d="M12 2v2a5 5 0 0 1-5 5H3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a5 5 0 0 1 5 5v2" />
    <path d="M12 2v2a5 5 0 0 0 5 5h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a5 5 0 0 0-5 5v2" />
  </svg>
);

const AnimalIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.55 15.65c-1.28-1.25-1.28-3.25 0-4.5l3.8-3.8c1.28-1.25 3.32-1.25 4.6 0l.4.4c1.28 1.25 1.28 3.25 0 4.5l-3.8 3.8c-1.28 1.25-3.32-1.25-4.6 0Z" />
    <path d="M12 17.5a2.5 2.5 0 0 1-2.5-2.5V11a5 5 0 0 0-5-5H3" />
    <path d="m15 15-5 5" />
    <path d="M2 22v-2c0-1.1.9-2 2-2h3" />
  </svg>
);

const FoodIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 21h10"/>
      <path d="M12 21V7a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/>
      <path d="M12 7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14"/>
      <path d="M5 21a2 2 0 0 0 2-2V7"/>
      <path d="M19 21a2 2 0 0 1-2-2V7"/>
      <path d="M12 7H2.5C2 7 2 6.5 2.5 6.5A3.5 3.5 0 0 1 6 3a3.5 3.5 0 0 1 3.5 3.5c0 .66.25 1 .5 1Z"/>
      <path d="M12 7h9.5c.5 0 .5-.5.0-1A3.5 3.5 0 0 0 18 3a3.5 3.5 0 0 0-3.5 3.5c0 .66-.25 1-.5 1Z"/>
  </svg>
);

const MiteIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 10a6 6 0 1 0 0 4" />
    <path d="M18 12a6 6 0 1 0-6 4" />
    <path d="M6 12a6 6 0 1 0 6-4" />
    <path d="m2.5 7.5 1.2 1.2" />
    <path d="m12 2.77V1" />
    <path d="m21.5 7.5-1.2 1.2" />
    <path d="M2.5 16.5 3.7 15.3" />
    <path d="m12 23.01V21.2" />
    <path d="m21.5 16.5-1.2-1.2" />
    <path d="m7.5 2.5 1.2 1.2" />
    <path d="m16.5 2.5-1.2 1.2" />
    <path d="m7.5 21.5 1.2-1.2" />
    <path d="m16.5 21.5-1.2-1.2" />
  </svg>
);

const MoldIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.5 10a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"/>
        <path d="M18.5 15a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"/>
        <path d="M12.5 20a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"/>
        <path d="M10 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
        <path d="m8.5 7.5-1-1"/>
        <path d="m15 15h.5a2.5 2.5 0 1 0 0-5h-.5Z"/>
        <path d="m10 20-.5.5a2.5 2.5 0 1 1-3-3l.5-.5Z"/>
    </svg>
);


const VenomIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.44 2.149a1 1 0 0 0-1.028.003L7.5 4.852l-2.433 2.52c-.793.821-.69 2.144.254 2.84l3.15 2.316-3.425 4.887a1 1 0 0 0 .138 1.39l.001.001a1 1 0 0 0 1.39.138l4.887-3.425 2.316 3.15c.696.944 2.019 1.047 2.84.254l2.52-2.432 2.704-3.913a1 1 0 0 0-.002-1.028l-2.703-3.914-2.433-2.52-3.913-2.704Z" />
    <path d="m16 8-4.95 4.95" />
    <path d="M18 10c-1.5-1.5-3-1-4-2" />
  </svg>
);

const LatexIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 16.5V13a1 1 0 0 0-1-1v-2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2a1 1 0 0 0-1 1v3.5" />
    <path d="M19.5 16.5h-15" />
    <path d="M12 9V3" />
    <path d="m7 16.5-1.5 5.25" />
    <path d="m17 16.5 1.5 5.25" />
  </svg>
);

const InsectIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 13a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-2a2 2 0 0 0-2-2h-1a1 1 0 0 1-1-1V6a2 2 0 0 0-2-2h-2" />
        <path d="M3 13V9a1 1 0 0 1 1-1h1" />
        <path d="M4.5 17.5 3 22" />
        <path d="M19.5 17.5 21 22" />
        <path d="M12 22V11" />
        <path d="m7 13-3.6-1.4A.5.5 0 0 1 3 11V9" />
        <path d="m17 13 3.6-1.4a.5.5 0 0 0 .4-.88V9" />
    </svg>
);

const ParasiteIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.521 12.446a1 1 0 0 0-1.042 0l-5 3a1 1 0 0 0-.479 1.554l5 8a1 1 0 0 0 1.554-.479l5-8a1 1 0 0 0-.479-1.554Z" />
        <path d="M14.5 13.5 19 9" />
        <path d="m6.5 13.5 1-1" />
        <path d="M13 18.5 14 17" />
        <circle cx="10.5" cy="5.5" r="3.5" />
        <path d="m3.5 3.5 2 2" />
    </svg>
);

const OtherIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m9.09 9.09 5.83 5.83" />
        <path d="m14.91 9.09-5.83 5.83" />
    </svg>
);


export const CategoryIcon: React.FC<{ category: AllergenCategory; className?: string }> = ({ category, className = 'w-6 h-6' }) => {
  switch (category) {
    case AllergenCategory.POLLEN_TREES:
    case AllergenCategory.POLLEN_GRASSES:
    case AllergenCategory.POLLEN_WEEDS:
      return <TreeIcon className={className} />;
    case AllergenCategory.ANIMALS:
      return <AnimalIcon className={className} />;
    case AllergenCategory.MITES:
        return <MiteIcon className={className} />;
    case AllergenCategory.MOLDS:
        return <MoldIcon className={className} />;
    case AllergenCategory.VENOMS:
        return <VenomIcon className={className} />;
    case AllergenCategory.LATEX:
        return <LatexIcon className={className} />;
    case AllergenCategory.INSECTS:
        return <InsectIcon className={className} />;
    case AllergenCategory.PARASITES:
        return <ParasiteIcon className={className} />;
    case AllergenCategory.FOODS_EGG:
    case AllergenCategory.FOODS_MILK:
    case AllergenCategory.FOODS_NUTS:
    case AllergenCategory.FOODS_PEANUT:
    case AllergenCategory.FOODS_FISH:
    case AllergenCategory.FOODS_SHELLFISH:
    case AllergenCategory.FOODS_SOY:
    case AllergenCategory.FOODS_WHEAT:
    case AllergenCategory.FOODS_PEACH:
    case AllergenCategory.FOODS_SESAME:
    case AllergenCategory.FOODS_MEAT:
    case AllergenCategory.FOODS_FRUITS_VEGETABLES:
        return <FoodIcon className={className} />;
    default:
      return <OtherIcon className={className} />;
  }
};
