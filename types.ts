export enum AllergenType {
  MAJOR = 'Majeur',
  MINOR = 'Mineur',
}

export enum SymptomSeverity {
  LOCAL = 'Local',
  SYSTEMIC = 'Systémique',
  SEVERE = 'Sévère',
  ASYMPTOMATIC = 'Asymptomatique',
}

export enum CrossReactivityLevel {
  HIGH = 'Élevée',
  PROBABLE = 'Probable',
  MODERATE = 'Modérée',
  LOW = 'Faible',
  NONE = 'Aucune',
}

export enum AllergenCategory {
  POLLEN_TREES = "Pollens d'arbres",
  POLLEN_GRASSES = "Pollens de graminées",
  POLLEN_WEEDS = "Pollens d'herbacées",
  ANIMALS = "Animaux",
  MITES = "Acariens",
  MOLDS = "Moisissures",
  FOODS_PEANUT = "Aliment - Arachide",
  FOODS_NUTS = "Aliment - Fruits à coque",
  FOODS_EGG = "Aliment - Oeuf",
  FOODS_MILK = "Aliment - Lait de vache",
  FOODS_FISH = "Aliment - Poisson",
  FOODS_SHELLFISH = "Aliment - Crustacés",
  FOODS_SOY = "Aliment - Soja",
  FOODS_WHEAT = "Aliment - Blé",
  FOODS_PEACH = "Aliment - Pêche",
  FOODS_SESAME = "Aliment - Sésame",
  FOODS_MEAT = "Aliment - Viande",
  FOODS_FRUITS_VEGETABLES = "Aliment - Fruits & Légumes",
  VENOMS = "Venins d'hyménoptères",
  LATEX = "Latex",
  INSECTS = "Insectes",
  PARASITES = "Parasites",
}

export enum MolecularFamily {
    STORAGE_PROTEINS = 'Protéines de stockage',
    PR10 = 'PR-10',
    LTP = 'LTP',
    GRP = 'GRP',
    PROFILINS = 'Profilines',
    POLCALCINS = 'Polcalcines',
    TLP = 'TLP',
    PARVALBUMINS = 'Parvalbumines',
    TROPOMYOSINS = 'Tropomyosines',
    SERUM_ALBUMINS = 'Serum albumines',
}

export enum Pathology {
  ASTHMA = "Asthme bronchique",
  SEVERE_ASTHMA = "Asthme sévère",
  RHINITIS = "Rhinite Allergique",
  FOOD_ALLERGY = "Allergie alimentaire",
  ANAPHYLAXIS = "Anaphylaxie / Réactions sévères",
  PROFESSIONAL_ALLERGY = "Allergies professionnelles",
  VENOM_ALLERGY = "Allergies aux venins",
}

export const molecularFamilyDescriptions: Record<MolecularFamily, string> = {
    [MolecularFamily.STORAGE_PROTEINS]: "Présentes dans les fruits à coque et dans les graines. THERMOSTABLES, résistantes à la digestion. Allergie alimentaire potentiellement sévère (albumines 2S), réactions systémiques fréquentes.",
    [MolecularFamily.PR10]: "Homologues de Bet v 1. Protéine THERMOLABILE. Souvent associée à des symptômes locaux = syndrome oral. Présent dans les fruits, les légumes, les fruits à coque et les pollens.",
    [MolecularFamily.LTP]: "(non-specific lipid transfer protein). Nombreux allergènes majeurs, THERMOSTABLES, résistants à la digestion. Allergie alimentaire sévère et Syndrome oral.",
    [MolecularFamily.GRP]: "(Gibberellin-regulated Protein). THERMOSTABLES, résistants à la digestion. Allergie alimentaire sévère, co-facteurs. Pollinose aux cupressacées. Fruits des rosacées, agrumes.",
    [MolecularFamily.PROFILINS]: "THERMOSENSIBLE, sensible à la digestion. Rarement associées à des symptômes cliniques mais peuvent provoquer des réactions sévères. Panallergènes végétaux avec haut niveau de réactivité croisée.",
    [MolecularFamily.POLCALCINS]: "Ubiquitaires dans le pollen, allergènes mineurs, marqueurs de réactivité croisée mais NON PRESENTES dans les aliments végétaux.",
    [MolecularFamily.TLP]: "(thaumatin like protein). Allergène mineur en général, THERMOSTABLE. Forte réactivité croisée = panallergène. Peut être liée à une allergie alimentaire sévère.",
    [MolecularFamily.PARVALBUMINS]: "Un des allergènes majeurs du poisson, THERMOSTABLES, résistants à la digestion. Marqueur de réactivité croisée entre différentes espèces de poissons et amphibiens.",
    [MolecularFamily.TROPOMYOSINS]: "Allergènes majeurs des invertébrés (crustacés, etc.), allergènes mineurs des acariens. Allergies alimentaires potentiellement sévères, réactions croisées acariens-invertébrés.",
    [MolecularFamily.SERUM_ALBUMINS]: "Grande identité de séquence. Allergène respiratoire mineur des animaux; allergène alimentaire du lait et de la viande. Impliqué dans le syndrome porc-chat et œuf-oiseau.",
};


export interface Allergen {
  id: string; 
  name: string; 
  source: string; 
  extract: string;
  category: AllergenCategory;
  type: AllergenType;
  symptoms: SymptomSeverity[];
  crossReactivity: CrossReactivityLevel;
  crossReactivityDetails: string;
  description: string;
  molecularFamily?: MolecularFamily;
  pathologies?: Pathology[];
}