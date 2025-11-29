import mongoose from 'mongoose'

// Book Schema
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isbn: String,
  publicationYear: Number,
  publisher: String,
  pages: Number,
  language: {
    type: String,
    default: 'English'
  },
  category: {
    type: String,
    enum: ['scripture', 'commentary', 'theology', 'philosophy', 'history', 'practice']
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  amazonLink: String,
  goodreadsLink: String,
  googleBooksLink: String,
  pdfLink: String,
  coverImage: String,
  tags: [String],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    user: String,
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  religionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Religion',
    required: true
  },
  sectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sect'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Video Schema
const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  youtubeId: {
    type: String,
    required: true
  },
  duration: String, // "15:30"
  thumbnail: String,
  channel: {
    type: String,
    required: true
  },
  channelUrl: String,
  views: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    enum: ['lecture', 'documentary', 'interview', 'practice', 'ceremony', 'discussion']
  },
  language: {
    type: String,
    default: 'English'
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  tags: [String],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  religionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Religion',
    required: true
  },
  sectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sect'
  },
  scholarId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scholar'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Practice Schema
const PracticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['meditation', 'prayer', 'ritual', 'daily-practice', 'ceremony', 'ethical-practice', 'study']
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  duration: String, // "30 minutes", "1 hour"
  frequency: String, // "daily", "weekly", "monthly"
  tools: [String], // ["prayer beads", "meditation cushion", "incense"]
  environment: String, // "quiet room", "temple", "outdoor"
  benefits: [String],
  precautions: [String],
  steps: [{
    step: Number,
    instruction: String,
    duration: String
  }],
  relatedScriptures: [String],
  images: [String],
  videos: [{
    title: String,
    youtubeId: String,
    description: String
  }],
  books: [{
    title: String,
    author: String,
    link: String
  }],
  religionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Religion',
    required: true
  },
  sectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sect'
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    user: String,
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Enhanced Scholar Schema
const ScholarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  biography: {
    type: String,
    required: true
  },
  birthYear: Number,
  deathYear: Number,
  era: {
    type: String,
    required: true
  },
  century: {
    type: String,
    required: true
  },
  nationality: String,
  language: {
    type: String,
    required: true
  },
  isUniversallyRespected: {
    type: Boolean,
    default: false
  },
  specialization: [String],
  education: [{
    degree: String,
    institution: String,
    year: Number
  }],
  occupation: String,
  majorWorks: [{
    title: String,
    year: Number,
    description: String,
    language: String
  }],
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video'
  }],
  quotes: [{
    text: String,
    source: String,
    context: String
  }],
  photo: String,
  website: String,
  socialMedia: {
    twitter: String,
    facebook: String,
    youtube: String,
    instagram: String
  },
  tags: [String],
  religionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Religion',
    required: true
  },
  sectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sect',
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    user: String,
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Enhanced Sect Schema
const SectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  foundingDate: Date,
  founder: String,
  headquarters: String,
  currentLeader: String,
  numberOfFollowers: {
    type: Number,
    default: 0
  },
  keyBeliefs: [String],
  practices: [String],
  rituals: [String],
  sacredTexts: [String],
  prohibitions: [String],
  dressCode: String,
  dietaryRestrictions: [String],
  festivals: [{
    name: String,
    description: String,
    date: String,
    significance: String
  }],
  symbols: [{
    name: String,
    description: String,
    image: String
  }],
  history: String,
  geography: [String], // Countries where practiced
  language: String,
  websites: [String],
  socialMedia: [{
    platform: String,
    url: String
  }],
  relatedSects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sect'
  }],
  schisms: [{
    name: String,
    date: Date,
    reason: String
  }],
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  scholars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scholar'
  }],
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video'
  }],
  practices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Practice'
  }],
  religionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Religion',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Enhanced Religion Schema
const ReligionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  introText: {
    type: String,
    required: true
  },
  foundingDate: Date,
  founder: String,
  origin: {
    country: String,
    region: String,
    continent: String
  },
  currentFollowers: {
    type: Number,
    default: 0
  },
  populationPercentage: {
    type: Number,
    default: 0
  },
  keyBeliefs: [String],
  corePrinciples: [String],
  moralCode: [String],
  afterlifeBeliefs: String,
  sacredTexts: [{
    title: String,
    author: String,
    language: String,
    approximateDate: String,
    description: String
  }],
  holyBooks: [{
    title: String,
    description: String,
    language: String
  }],
  practices: [{
    name: String,
    description: String,
    frequency: String
  }],
  rituals: [{
    name: String,
    description: String,
    significance: String,
    frequency: String
  }],
  festivals: [{
    name: String,
    description: String,
    date: String,
    significance: String
  }],
  symbols: [{
    name: String,
    description: String,
    image: String,
    meaning: String
  }],
  sects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sect'
  }],
  scholars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scholar'
  }],
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video'
  }],
  practices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Practice'
  }],
  geography: [String],
  languages: [String],
  demographics: [{
    country: String,
    percentage: Number
  }],
  timeline: [{
    event: String,
    date: Date,
    description: String,
    significance: String
  }],
  relatedReligions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Religion'
  }],
  websites: [String],
  socialMedia: [{
    platform: String,
    url: String
  }],
  images: [String],
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Create models
const Book = mongoose.models.Book || mongoose.model('Book', BookSchema)
const Video = mongoose.models.Video || mongoose.model('Video', VideoSchema)
const Practice = mongoose.models.Practice || mongoose.model('Practice', PracticeSchema)
const Scholar = mongoose.models.Scholar || mongoose.model('Scholar', ScholarSchema)
const Sect = mongoose.models.Sect || mongoose.model('Sect', SectSchema)
const Religion = mongoose.models.Religion || mongoose.model('Religion', ReligionSchema)

export { Book, Video, Practice, Scholar, Sect, Religion }