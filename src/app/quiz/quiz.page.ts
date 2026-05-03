import { Component, OnInit } from '@angular/core';

interface Question {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  category: string;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: false
})
export class QuizPage implements OnInit {
  private allQuestions: Question[] = [
    // --- CAPITALES ---
    {
      category: "🏛️ Capitales",
      question: "Quelle est la capitale du Sénégal ?",
      options: ["Saint-Louis", "Dakar", "Thiès", "Ziguinchor"],
      answer: 1,
      explanation: "Dakar est la capitale du Sénégal depuis 1960. C'est le point le plus à l'ouest de l'Afrique continentale."
    },
    {
      category: "🏛️ Capitales",
      question: "Quelle est la capitale de l'Égypte ?",
      options: ["Alexandrie", "Louxor", "Le Caire", "Gizeh"],
      answer: 2,
      explanation: "Le Caire est la capitale et la plus grande ville d'Égypte, surnommée 'La cité aux mille minarets'."
    },
    {
      category: "🏛️ Capitales",
      question: "Quelle est la capitale administrative de l'Afrique du Sud ?",
      options: ["Le Cap", "Johannesburg", "Pretoria", "Durban"],
      answer: 2,
      explanation: "L'Afrique du Sud a trois capitales : Pretoria (administrative), Le Cap (législative) et Bloemfontein (judiciaire)."
    },
    {
      category: "🏛️ Capitales",
      question: "Quelle est la capitale du Nigéria ?",
      options: ["Lagos", "Abuja", "Kano", "Ibadan"],
      answer: 1,
      explanation: "Abuja est devenue la capitale du Nigéria en 1991, remplaçant Lagos qui reste le centre économique du pays."
    },
    {
      category: "🏛️ Capitales",
      question: "Quelle est la capitale du Kenya ?",
      options: ["Mombasa", "Kisumu", "Nakuru", "Nairobi"],
      answer: 3,
      explanation: "Nairobi est la capitale du Kenya. Son nom vient de la phrase Maasai 'Enkare Nyrobi', qui signifie 'lieu d'eau fraîche'."
    },

    // --- GÉOGRAPHIE ---
    {
      category: "🌍 Géographie",
      question: "Quel est le plus grand pays d'Afrique par sa superficie ?",
      options: ["Soudan", "Algérie", "RD Congo", "Libye"],
      answer: 1,
      explanation: "L'Algérie est le plus grand pays d'Afrique (et du monde arabe) avec plus de 2,3 millions de km²."
    },
    {
      category: "🌍 Géographie",
      question: "Quel fleuve est le plus long d'Afrique (et l'un des plus longs du monde) ?",
      options: ["Le Niger", "Le Congo", "Le Nil", "Le Zambèze"],
      answer: 2,
      explanation: "Le Nil s'étend sur environ 6 650 km. Il traverse 11 pays avant de se jeter dans la Méditerranée."
    },
    {
      category: "🌍 Géographie",
      question: "Quel est le point le plus élevé du continent africain ?",
      options: ["Mont Kenya", "Mont Toubkal", "Kilimandjaro", "Mont Cameroun"],
      answer: 2,
      explanation: "Le Kilimandjaro, en Tanzanie, culmine à 5 895 mètres d'altitude."
    },
    {
      category: "🌍 Géographie",
      question: "Quel désert couvre la majeure partie de l'Afrique du Nord ?",
      options: ["Le Kalahari", "Le Namib", "Le Sahara", "Le Gobi"],
      answer: 2,
      explanation: "Le Sahara est le plus grand désert chaud du monde, couvrant environ 3,6 millions de miles carrés."
    },
    {
      category: "🌍 Géographie",
      question: "Dans quel océan se trouvent les îles Seychelles ?",
      options: ["Océan Atlantique", "Océan Indien", "Océan Pacifique", "Mer Méditerranée"],
      answer: 1,
      explanation: "Les Seychelles sont un archipel de 115 îles situé dans l'Océan Indien, au large de l'Afrique de l'Est."
    },

    // --- HISTOIRE & CULTURE ---
    {
      category: "📜 Histoire & Culture",
      question: "Quel pays est surnommé le 'Pays des Hommes Intègres' ?",
      options: ["Mali", "Bénin", "Burkina Faso", "Togo"],
      answer: 2,
      explanation: "Burkina Faso signifie 'Patrie des Hommes Intègres' en mooré et en dioula. Nom choisi par Thomas Sankara en 1984."
    },
    {
      category: "📜 Histoire & Culture",
      question: "Qui a été le premier président noir de l'Afrique du Sud ?",
      options: ["Desmond Tutu", "Nelson Mandela", "Thabo Mbeki", "Jacob Zuma"],
      answer: 1,
      explanation: "Nelson Mandela a été élu en 1994 après avoir passé 27 ans en prison pour sa lutte contre l'apartheid."
    },
    {
      category: "📜 Histoire & Culture",
      question: "Quel pays africain est considéré comme le 'Berceau du Vodoun' ?",
      options: ["Sénégal", "Bénin", "Niger", "Angola"],
      answer: 1,
      explanation: "Le Bénin est le berceau du vodoun, qui y est une religion officielle et une part centrale de l'identité culturelle."
    },
    {
      category: "📜 Histoire & Culture",
      question: "Quel empire était dirigé par Mansa Moussa, l'homme le plus riche de l'histoire ?",
      options: ["Empire du Ghana", "Empire Songhaï", "Empire du Mali", "Empire du Bénin"],
      answer: 2,
      explanation: "Mansa Moussa était le souverain de l'Empire du Mali au XIVe siècle. Son pèlerinage à La Mecque a marqué les esprits par sa richesse."
    },
    {
      category: "📜 Histoire & Culture",
      question: "Quelle est la langue la plus parlée en Afrique ?",
      options: ["Français", "Anglais", "Swahili", "Arabe"],
      answer: 3,
      explanation: "L'arabe est la langue la plus parlée sur le continent, principalement en Afrique du Nord et au Sahel."
    },

    // --- ÉCONOMIE & NATURE ---
    {
      category: "💼 Économie & Nature",
      question: "Quel pays est le premier producteur mondial de cacao ?",
      options: ["Ghana", "Nigéria", "Brésil", "Côte d'Ivoire"],
      answer: 3,
      explanation: "La Côte d'Ivoire produit environ 40% du cacao mondial."
    },
    {
      category: "💼 Économie & Nature",
      question: "Quelle monnaie est commune à 8 pays de l'Afrique de l'Ouest (UEMOA) ?",
      options: ["Le Naira", "Le Cedi", "Le Franc CFA", "Le Franc Guinéen"],
      answer: 2,
      explanation: "Le Franc CFA (XOF) est utilisé par le Bénin, le Burkina Faso, la Côte d'Ivoire, la Guinée-Bissau, le Mali, le Niger, le Sénégal et le Togo."
    },
    {
      category: "💼 Économie & Nature",
      question: "Quelle est la principale ressource d'exportation de l'Angola ?",
      options: ["Cacao", "Or", "Pétrole", "Café"],
      answer: 2,
      explanation: "L'Angola est l'un des plus grands producteurs de pétrole d'Afrique subsaharienne avec le Nigéria."
    },
    {
      category: "💼 Économie & Nature",
      question: "Quel animal n'appartient PAS aux 'Big Five' des safaris africains ?",
      options: ["Lion", "Éléphant", "Girafe", "Léopard"],
      answer: 2,
      explanation: "Les 'Big Five' sont le Lion, l'Éléphant, le Buffle, le Léopard et le Rhinocéros. La girafe n'en fait pas partie."
    },
    {
      category: "💼 Économie & Nature",
      question: "Quel pays possède le plus grand nombre de pyramides au monde ?",
      options: ["Égypte", "Soudan", "Mexique", "Pérou"],
      answer: 1,
      explanation: "Le Soudan possède plus de 200 pyramides (principalement à Méroé), soit plus que l'Égypte, bien qu'elles soient plus petites."
    }
  ];

  questions: Question[] = [];
  currentQuestionIndex = 0;
  score = 0;
  showResult = false;
  selectedOption: number | null = null;
  answered = false;

  constructor() { }

  ngOnInit() {
    this.startNewGame();
  }

  startNewGame() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.showResult = false;
    this.selectedOption = null;
    this.answered = false;
    
    // Mélanger TOUTES les questions et en prendre 10 au hasard pour cette session
    this.questions = [...this.allQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
  }

  selectOption(index: number) {
    if (this.answered) return;
    this.selectedOption = index;
    this.answered = true;

    if (index === this.questions[this.currentQuestionIndex].answer) {
      this.score++;
    }
  }

  nextQuestion() {
    this.selectedOption = null;
    this.answered = false;
    
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.showResult = true;
    }
  }

  restartQuiz() {
    this.startNewGame();
  }
}
