import mongoose from 'mongoose'

// 1. Book Schema
const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  isbn: String,
  publicationYear: Number,
  publisher: String,
  pages: Number,
  language: { type: String, default: 'English' },
  category: { type: String, enum: ['scripture', 'commentary', 'theology', 'philosophy', 'history', 'practice'] },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'intermediate' },
  amazonLink: String,
  goodreadsLink: String,
  googleBooksLink: String,
  pdfLink: String,
  coverImage: String,
  tags: [String],
  rating: { type: Number, min: 0, max: 5, default: 0 },
  religionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Religion', required: true },
  sectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sect' },
  createdAt: { type: Date, default: Date.now }
})

// 2. Video Schema
const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  youtubeId: { type: String, required: true },
  duration: String,
  thumbnail: String,
  channel: { type: String, required: true },
  channelUrl: String,
  category: { type: String, enum: ['lecture', 'documentary', 'interview', 'practice', 'ceremony', 'discussion'] },
  language: { type: String, default: 'English' },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'intermediate' },
  tags: [String],
  rating: { type: Number, min: 0, max: 5, default: 0 },
  religionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Religion', required: true },
  sectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sect' },
  scholarId: { type: mongoose.Schema.Types.ObjectId, ref: 'Scholar' },
  createdAt: { type: Date, default: Date.now }
})

// 3. Practice Schema
const PracticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructions: { type: String, required: true },
  category: { type: String, enum: ['meditation', 'prayer', 'ritual', 'daily-practice', 'ceremony', 'ethical-practice', 'study'] },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  duration: String,
  frequency: String,
  tools: [String],
  benefits: [String],
  steps: [{ step: Number, instruction: String, duration: String }],
  religionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Religion', required: true },
  sectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sect' },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  createdAt: { type: Date, default: Date.now }
})

// 4. Scholar Schema (FIXED FOR SEED COMPATIBILITY)
const ScholarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  
  // FIX 1: Made biography optional (Seed data does not provide it)
  biography: { type: String, required: false }, 
  
  birthYear: Number,
  deathYear: Number,
  era: { type: String, required: true },
  century: { type: String, required: true },
  language: { type: String, required: true },
  isUniversallyRespected: { type: Boolean, default: false },
  
  // FIX 2: Changed to String to match your seed string "Confessions, City of God"
  majorWorks: { type: String }, 
  
  religionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Religion', required: true },
  
  // FIX 3: Renamed from 'sectId' to 'sect' because your seed uses 'sect'
  sect: { type: mongoose.Schema.Types.ObjectId, ref: 'Sect', required: true }, 
  
  rating: { type: Number, min: 0, max: 5, default: 0 },
  createdAt: { type: Date, default: Date.now }
})

// 5. Sect Schema
const SectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  numberOfFollowers: { type: Number, default: 0 },
  keyCharacteristics: String,
  religionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Religion', required: true },
  
  // Relations
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  scholars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scholar' }],
  practices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Practice' }],
  createdAt: { type: Date, default: Date.now }
})

// 6. Religion Schema
const ReligionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  introText: { type: String, required: true },
  foundingDate: Date,
  founder: String,
  origin: { country: String, region: String, continent: String },
  currentFollowers: { type: Number, default: 0 },
  populationPercentage: { type: Number, default: 0 },
  keyBeliefs: [String],
  corePrinciples: [String],
  sacredTexts: [{ title: String, author: String, language: String, description: String }],
  holyBooks: [{ title: String, description: String, language: String }],
  festivals: [{ name: String, description: String, date: String, significance: String }],
  tags: [String],
  
  // Relations
  sects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sect' }],
  scholars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scholar' }],
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  practices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Practice' }],
  
  createdAt: { type: Date, default: Date.now }
})

// Create models
const Book = mongoose.models.Book || mongoose.model('Book', BookSchema)
const Video = mongoose.models.Video || mongoose.model('Video', VideoSchema)
const Practice = mongoose.models.Practice || mongoose.model('Practice', PracticeSchema)
const Scholar = mongoose.models.Scholar || mongoose.model('Scholar', ScholarSchema)
const Sect = mongoose.models.Sect || mongoose.model('Sect', SectSchema)
const Religion = mongoose.models.Religion || mongoose.model('Religion', ReligionSchema)

export { Book, Video, Practice, Scholar, Sect, Religion }