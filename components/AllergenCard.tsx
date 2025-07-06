import React from 'react';
import { Allergen, AllergenType, SymptomSeverity, CrossReactivityLevel } from '../types';
import { CategoryIcon } from './icons';

interface AllergenCardProps {
  allergen: Allergen;
}

const getBadgeClass = (value: AllergenType | SymptomSeverity | CrossReactivityLevel) => {
  switch (value) {
    case AllergenType.MAJOR:
      return 'bg-red-200 text-red-800';
    case AllergenType.MINOR:
      return 'bg-gray-200 text-gray-800';
    case SymptomSeverity.SEVERE:
      return 'bg-purple-200 text-purple-800';
    case SymptomSeverity.SYSTEMIC:
      return 'bg-orange-200 text-orange-800';
    case SymptomSeverity.LOCAL:
      return 'bg-yellow-200 text-yellow-800';
    case SymptomSeverity.ASYMPTOMATIC:
      return 'bg-green-200 text-green-800';
    case CrossReactivityLevel.HIGH:
    case CrossReactivityLevel.PROBABLE:
      return 'bg-blue-200 text-blue-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

const AllergenCard: React.FC<AllergenCardProps> = ({ allergen }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="uppercase tracking-wide text-sm text-thermo-red font-semibold">{allergen.extract}</div>
            <p className="block mt-1 text-2xl leading-tight font-bold text-black">{allergen.name}</p>
            <p className="text-gray-500 text-sm">{allergen.source} - {allergen.id}</p>
          </div>
          <div className="ml-4 p-2 bg-thermo-gray-light rounded-full text-thermo-red">
            <CategoryIcon category={allergen.category} className="w-8 h-8"/>
          </div>
        </div>

        <p className="mt-4 text-gray-700 text-base">{allergen.description}</p>
        
        <div className="mt-4">
            <h4 className="font-semibold text-gray-800">Réactivité croisée:</h4>
            <p className="text-gray-600">{allergen.crossReactivityDetails}</p>
        </div>

      </div>
      <div className="p-6 bg-thermo-gray-light">
        <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getBadgeClass(allergen.type)}`}>
                {allergen.type}
            </span>
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getBadgeClass(allergen.crossReactivity)}`}>
                Réactivité: {allergen.crossReactivity}
            </span>
            {allergen.symptoms.map(symptom => (
                <span key={symptom} className={`px-3 py-1 text-xs font-semibold rounded-full ${getBadgeClass(symptom)}`}>
                    {symptom}
                </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllergenCard;