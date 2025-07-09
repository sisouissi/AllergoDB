
import React, { useState, useMemo, useEffect } from 'react';
import { Allergen, AllergenType, SymptomSeverity, MolecularFamily, molecularFamilyDescriptions, Pathology } from './types';
import { allergens } from './data/allergens';
import AllergenCard from './components/AllergenCard';
import FilterPanel from './components/FilterPanel';
import InfoModal from './components/InfoModal';
import GeminiChat from './components/GeminiChat';
import { ChatIcon } from './components/icons';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<AllergenType[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomSeverity[]>([]);
  const [selectedExtracts, setSelectedExtracts] = useState<string[]>([]);
  const [selectedFamily, setSelectedFamily] = useState<MolecularFamily | null>(null);
  const [selectedPathology, setSelectedPathology] = useState<Pathology | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (selectedFamily) {
      const relevantExtracts = allergens
        .filter(allergen => allergen.molecularFamily === selectedFamily)
        .map(allergen => allergen.extract);
      setSelectedExtracts([...new Set(relevantExtracts)]);
    }
  }, [selectedFamily]);


  const filteredAllergens = useMemo(() => {
    return allergens.filter(allergen => {
      const searchTermMatch =
        searchTerm === '' ||
        allergen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        allergen.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        allergen.extract.toLowerCase().includes(searchTerm.toLowerCase());

      const typeMatch =
        selectedTypes.length === 0 || selectedTypes.includes(allergen.type);
      
      const symptomMatch =
        selectedSymptoms.length === 0 ||
        selectedSymptoms.some(symptom => allergen.symptoms.includes(symptom));

      const extractMatch =
        selectedExtracts.length === 0 || selectedExtracts.includes(allergen.extract);
      
      const familyMatch =
        !selectedFamily || allergen.molecularFamily === selectedFamily;

      const pathologyMatch =
        !selectedPathology ||
        (allergen.pathologies && allergen.pathologies.includes(selectedPathology));

      return searchTermMatch && typeMatch && symptomMatch && extractMatch && familyMatch && pathologyMatch;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [searchTerm, selectedTypes, selectedSymptoms, selectedExtracts, selectedFamily, selectedPathology]);

  return (
    <div className="min-h-screen bg-thermo-gray-light font-sans">
      <header className="bg-gradient-to-r from-thermo-red to-thermo-red-dark shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white">Base de données des Allergènes moléculaires ImmunoCAP</h1>
              <p className="text-red-100 mt-1">Recherchez et filtrez les allergènes moléculaires.</p>
            </div>
            <div className="flex items-center gap-4">
               <a 
                href="https://corporate.thermofisher.com/content/phadia/fr/fr/resources/testing-algorithms.html?resourceID=L2NvbnRlbnQvZGFtL3BoYWRpYS9saWJyYXJ5L2ZyL0ltbXVub2NhcC10ZXN0aW5nLWFsZ29yaXRobS1wb2NrZXQtZ3VpZGVzLUZSLnBkZg=="
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-white hover:text-thermo-red transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-thermo-red focus:ring-white"
              >
                Source : Algorithmes de tests ImmunoCAP (Thermofisher)
              </a>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-thermo-red font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-red-100 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-thermo-red focus:ring-white"
              >
                Quand prescrire les allergènes moléculaires?
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 md:p-8 flex flex-col md:flex-row md:gap-8">
        <aside className="w-full md:w-1/3 lg:w-1/4 md:sticky md:top-8 self-start">
          <FilterPanel
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            selectedSymptoms={selectedSymptoms}
            setSelectedSymptoms={setSelectedSymptoms}
            selectedExtracts={selectedExtracts}
            setSelectedExtracts={setSelectedExtracts}
            selectedFamily={selectedFamily}
            setSelectedFamily={setSelectedFamily}
            selectedPathology={selectedPathology}
            setSelectedPathology={setSelectedPathology}
            allAllergens={allergens}
          />
        </aside>

        <main className="w-full md:w-2/3 lg:w-3/4 mt-8 md:mt-0">
          {selectedFamily && (
            <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-800 rounded-lg shadow-md" role="alert">
              <h3 className="font-bold text-lg">{selectedFamily}</h3>
              <p className="mt-1 text-gray-700">{molecularFamilyDescriptions[selectedFamily]}</p>
            </div>
          )}

          {filteredAllergens.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredAllergens.map(allergen => (
                <AllergenCard key={allergen.id} allergen={allergen} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-6 bg-white rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-gray-700">Aucun allergène trouvé</h3>
              <p className="text-gray-500 mt-2">Essayez d'ajuster vos filtres de recherche ou de réinitialiser.</p>
            </div>
          )}
        </main>
      </div>

      <InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-thermo-red text-white p-4 rounded-full shadow-lg hover:bg-thermo-red-dark transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-thermo-red z-40"
        aria-label="Ouvrir l'assistant IA"
      >
        <ChatIcon className="w-8 h-8"/>
      </button>

      <GeminiChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        allAllergens={allergens} 
      />


      <footer className="text-center py-6 mt-8 text-gray-500 text-sm">
        <p>Base de données des Allergènes moléculaires ImmunoCAP &copy; 2025</p>
        <p>Application à but pédagogique développée par Dr Zouhair Souissi</p>
      </footer>
    </div>
  );
};

export default App;