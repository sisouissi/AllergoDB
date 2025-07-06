import React, { useEffect } from 'react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sticky top-0 bg-white border-b border-gray-200 flex justify-between items-center">
          <h2 id="modal-title" className="text-2xl font-bold text-thermo-red">
            Quand prescrire les allergènes moléculaires?
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Fermer la fenêtre modale"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="p-8 overflow-y-auto space-y-6 text-gray-800">
          <div>
            <h3 className="text-xl font-bold text-gray-900">A. Allergies respiratoires :</h3>
            <ul className="list-decimal list-inside mt-2 space-y-2 pl-4">
              <li><span className="font-semibold">Explorer une polysensibilisation :</span> rechercher des IgE vis-à-vis d’un panallergène, exemple : PR-10 (Bet v 1), profiline ( Phl p 12), polcalcine (Phl p 7 ou Bet v 4), des CCD</li>
              <li><span className="font-semibold">Orientation du choix de l’ITA :</span> rechercher des IgE vis-à-vis d’un allergène marqueur de spécificité orienté par l’histoire clinique</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">B. Allergies alimentaires :</h3>
            <ul className="list-decimal list-inside mt-2 space-y-2 pl-4">
              <li><span className="font-semibold">Explorer une polysensibilisation :</span> rechercher des IgE vis-à-vis d’un panallergène, exemple : PR-10 (Pru p 1), LTP (Pru p 3), profiline (Pru p 4), GRP (Pru p 7), des CCD</li>
              <li><span className="font-semibold">Marqueur de sévérité et de persistance:</span> protéines de stockage, allergènes thermorésistants</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">C. Allergies aux venins d’hyménoptères :</h3>
            <ul className="list-decimal list-inside mt-2 space-y-2 pl-4">
              <li><span className="font-semibold">Diagnostic précis et orientation du choix de l’ITA :</span> rechercher des IgE vis-à-vis d’un allergène</li>
              <li><span className="font-semibold">Marqueur de spécificité</span> orienté par l’histoire clinique</li>
            </ul>
          </div>
        </div>
         <div className="p-4 bg-thermo-gray-light border-t border-gray-200 text-right sticky bottom-0">
            <button
                onClick={onClose}
                className="px-6 py-2 bg-thermo-red text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-thermo-red transition-colors"
            >
                Fermer
            </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;