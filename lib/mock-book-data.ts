// Mock data for book analysis dashboard

// Kitap metrikleri
export const mockBookMetrics = {
  flesch_kincaid_grade: 5.6, // Readability Score
  total_word_count: 87500, // Word Count
  avg_chapter_length: 8750, // Avg. Chapter Length
  estimated_reading_time_hours: 6, // Estimated Reading Time
  tension_spike_count: 15, // Tension spike count
  emotional_volatility: 0.85, // Emotional volatility (High)
  climax_tension_gradient: 1.2, // Climax momentum (Rising)
  third_person_pronoun_ratio: 0.75, // Pronoun style (Observer)
  passive_voice_ratio: 0.68, // Detached tone (High)
  adjective_density: 0.12, // Descriptiveness (part of High)
  adverb_density: 0.08, // Descriptiveness (part of High)
  metaphor_simile_density: 0.05, // Descriptiveness (part of High)
  visual_keyword_density: 0.45, // Visual sensory
  auditory_keyword_density: 0.25, // Auditory sensory
  tactile_keyword_density: 0.15, // Tactile sensory
  olfactory_keyword_density: 0.08, // Olfactory sensory
  gustatory_keyword_density: 0.07, // Gustatory sensory
  estimated_disturbance_timing: 0.15, // First Incident
  estimated_doorway1_timing: 0.2, // Hero's Journey Truly Begins
  estimated_midpoint_shift: 0.7, // Major Turning Point
  estimated_doorway2_timing: 0.8, // Climax
}

// Bölüm bazlı metrikler - Gerçekçi değerler
export const mockChapterMetrics = [
  {
    chapter: 1,
    avg_sentiment_score: -0.008,
    pace_variance: 0.003,
    peak_tension_score: 0.003,
    action_density_per_block: 5,
    question_density: 0.01,
  },
  {
    chapter: 2,
    avg_sentiment_score: 0.002,
    pace_variance: 0.005,
    peak_tension_score: 0.008,
    action_density_per_block: 13,
    question_density: 0.02,
  },
  {
    chapter: 3,
    avg_sentiment_score: 0.005,
    pace_variance: 0.008,
    peak_tension_score: 0.012,
    action_density_per_block: 10,
    question_density: 0.03,
  },
  {
    chapter: 4,
    avg_sentiment_score: 0.01,
    pace_variance: 0.015,
    peak_tension_score: 0.02,
    action_density_per_block: 5,
    question_density: 0.04,
  },
  {
    chapter: 5,
    avg_sentiment_score: 0.015,
    pace_variance: 0.02,
    peak_tension_score: 0.025,
    action_density_per_block: 13,
    question_density: 0.05,
  },
  {
    chapter: 6,
    avg_sentiment_score: 0.02,
    pace_variance: 0.025,
    peak_tension_score: 0.03,
    action_density_per_block: 18,
    question_density: 0.06,
  },
  {
    chapter: 7,
    avg_sentiment_score: 0.03,
    pace_variance: 0.035,
    peak_tension_score: 0.04,
    action_density_per_block: 29,
    question_density: 0.07,
  },
  {
    chapter: 8,
    avg_sentiment_score: 0.04,
    pace_variance: 0.045,
    peak_tension_score: 0.05,
    action_density_per_block: 28,
    question_density: 0.08,
  },
  {
    chapter: 9,
    avg_sentiment_score: 0.065,
    pace_variance: 0.06,
    peak_tension_score: 0.065,
    action_density_per_block: 7,
    question_density: 0.09,
  },
]

// Eski yapıyı koruyalım (geçiş için)
export const mockSentimentData = mockChapterMetrics.map((item) => ({
  chapter: item.chapter,
  sentiment: item.avg_sentiment_score,
}))

export const mockTensionData = mockChapterMetrics.map((item) => ({
  chapter: item.chapter,
  tension: item.peak_tension_score,
}))

export const mockPaceData = mockChapterMetrics.map((item) => ({
  chapter: item.chapter,
  pace: item.pace_variance,
}))

export const mockActionData = mockChapterMetrics.map((item) => ({
  chapter: item.chapter,
  action: item.action_density_per_block,
}))

export const mockSensoryData = {
  visual: mockBookMetrics.visual_keyword_density * 100,
  auditory: mockBookMetrics.auditory_keyword_density * 100,
  tactile: mockBookMetrics.tactile_keyword_density * 100,
  olfactory: mockBookMetrics.olfactory_keyword_density * 100,
  gustatory: mockBookMetrics.gustatory_keyword_density * 100,
}

export const mockStyleData = {
  passiveVoice: mockBookMetrics.passive_voice_ratio,
  adjectives: mockBookMetrics.adjective_density,
  adverbs: mockBookMetrics.adverb_density,
}

export const mockMetrics = {
  readabilityScore: 72, // Readability Score
  wordCount: mockBookMetrics.total_word_count,
  avgChapterLength: mockBookMetrics.avg_chapter_length,
  estimatedReadTime: mockBookMetrics.estimated_reading_time_hours * 60,
}

// Kitap başlığı
export const mockBookTitle = "The Silent Echo"
