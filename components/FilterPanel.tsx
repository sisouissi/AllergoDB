import React, { useMemo, useState } from 'react';
import { Allergen, AllergenType, SymptomSeverity, MolecularFamily, AllergenCategory, Pathology } from '../types';

interface FilterPanelProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedTypes: AllergenType[];
  setSelectedTypes: (types: AllergenType[]) => void;
  selectedSymptoms: SymptomSeverity[];
  setSelectedSymptoms: (symptoms: SymptomSeverity[]) => void;
  selectedExtracts: string[];
  setSelectedExtracts: (extracts: string[]) => void;
  selectedFamily: MolecularFamily | null;
  setSelectedFamily: (family: MolecularFamily | null) => void;
  selectedPathology: Pathology | null;
  setSelectedPathology: (pathology: Pathology | null) => void;
  allAllergens: Allergen[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  searchTerm,
  setSearchTerm,
  selectedTypes,
  setSelectedTypes,
  selectedSymptoms,
  setSelectedSymptoms,
  selectedExtracts,
  setSelectedExtracts,
  selectedFamily,
  setSelectedFamily,
  selectedPathology,
  setSelectedPathology,
  allAllergens
}) => {
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const groupedExtracts = useMemo(() => {
    const groups: Record<string, Set<string>> = {};
    const categoryOrder = Object.values(AllergenCategory);

    allAllergens.forEach(allergen => {
        if (!groups[allergen.category]) {
            groups[allergen.category] = new Set();
        }
        groups[allergen.category].add(allergen.extract);
    });

    const sortedGroupedExtracts: Record<string, string[]> = {};
    // Sort categories based on the enum order for a logical layout
    Object.keys(groups).sort((a,b) => categoryOrder.indexOf(a as AllergenCategory) - categoryOrder.indexOf(b as AllergenCategory)).forEach(category => {
        sortedGroupedExtracts[category] = Array.from(groups[category]).sort((a,b) => a.localeCompare(b));
    });

    return sortedGroupedExtracts;
  }, [allAllergens]);
  
  const toggleCategory = (category: string) => {
    setOpenCategories(prevOpen =>
        prevOpen.includes(category)
            ? prevOpen.filter(c => c !== category)
            : [...prevOpen, category]
    );
  };

  const handleTypeChange = (type: AllergenType) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(newTypes);
  };

  const handleSymptomChange = (symptom: SymptomSeverity) => {
    const newSymptoms = selectedSymptoms.includes(symptom)
      ? selectedSymptoms.filter(s => s !== symptom)
      : [...selectedSymptoms, symptom];
    setSelectedSymptoms(newSymptoms);
  };

  const handleExtractChange = (extract: string) => {
    const newExtracts = selectedExtracts.includes(extract)
      ? selectedExtracts.filter(e => e !== extract)
      : [...selectedExtracts, extract];
    setSelectedExtracts(newExtracts);
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedTypes([]);
    setSelectedSymptoms([]);
    setSelectedExtracts([]);
    setSelectedFamily(null);
    setSelectedPathology(null);
    setOpenCategories([]);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Filtres</h2>
        <button 
            onClick={resetFilters}
            className="px-4 py-2 text-sm font-medium text-thermo-red bg-red-100 rounded-md hover:bg-red-200 transition-colors"
        >
            Réinitialiser
        </button>
      </div>

      <div className="mb-6">
        <label htmlFor="search" className="block text-lg font-medium text-gray-700 mb-2">Recherche</label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Ex: rBet v 1, Arachide..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-thermo-red focus:border-thermo-red transition"
        />
      </div>

      <div className="space-y-6">
        {/* Type Filter */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">Type d'allergène</h3>
          <div className="flex flex-row space-x-6">
            {(Object.values(AllergenType)).map(type => (
              <label key={type} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeChange(type)}
                  className="h-5 w-5 rounded border-gray-300 text-thermo-red focus:ring-thermo-red"
                />
                <span className="text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Pathology Filter (Dropdown) */}
        <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Pathologies allergiques</h3>
            <select
                name="pathology"
                value={selectedPathology || ''}
                onChange={(e) => setSelectedPathology(e.target.value as Pathology || null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-thermo-red focus:border-thermo-red transition bg-white"
            >
                <option value="">Toutes les pathologies</option>
                {(Object.values(Pathology)).map(pathology => (
                <option key={pathology} value={pathology}>{pathology}</option>
                ))}
            </select>
        </div>

        {/* Symptom Filter */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">Symptômes induits</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {(Object.values(SymptomSeverity)).map(symptom => (
              <label key={symptom} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSymptoms.includes(symptom)}
                  onChange={() => handleSymptomChange(symptom)}
                  className="h-5 w-5 rounded border-gray-300 text-thermo-red focus:ring-thermo-red"
                />
                <span className="text-gray-700">{symptom}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Molecular Family Filter (Dropdown) */}
        <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Principales familles</h3>
            <select
                name="molecular-family"
                value={selectedFamily || ''}
                onChange={(e) => setSelectedFamily(e.target.value as MolecularFamily || null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-thermo-red focus:border-thermo-red transition bg-white"
            >
                <option value="">Toutes les familles</option>
                {(Object.values(MolecularFamily)).map(family => (
                <option key={family} value={family}>{family}</option>
                ))}
            </select>
        </div>
        
        {/* Extract Filter Accordion */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">Extrait allergénique ImmunoCAP</h3>
          <div className="space-y-1 border border-gray-200 rounded-lg">
            {Object.entries(groupedExtracts).map(([category, extracts], index) => {
                const isOpen = openCategories.includes(category);
                return (
                    <div key={category} className={`border-b border-gray-200 last:border-b-0`}>
                        <button
                            onClick={() => toggleCategory(category)}
                            className="w-full flex justify-between items-center p-3 text-left font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors"
                            aria-expanded={isOpen}
                        >
                            <span>{category}</span>
                            <svg
                                className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {isOpen && (
                            <div className="pl-6 pr-3 pb-3 pt-1 bg-white">
                                <div className="space-y-1">
                                    {extracts.map(extract => (
                                        <label key={extract} className="flex items-center space-x-2 cursor-pointer p-1 rounded">
                                            <input
                                                type="checkbox"
                                                checked={selectedExtracts.includes(extract)}
                                                onChange={() => handleExtractChange(extract)}
                                                className="h-4 w-4 rounded border-gray-300 text-thermo-red focus:ring-thermo-red flex-shrink-0"
                                            />
                                            <span className="text-gray-700 text-sm">{extract}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;