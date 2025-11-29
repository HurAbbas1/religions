import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Religion, Sect, Scholar, Book, Video, Practice } from '@/lib/mongodb-models'
import mongoose from 'mongoose'

export async function POST(request: NextRequest) {
  try {
    console.log('=== Starting Database Seed ===')
    
    // Test connection first
    console.log('1. Connecting to MongoDB...')
    await connectDB()
    console.log('✓ MongoDB connected successfully')
    
    // Check connection status
    const connectionState = mongoose.connection.readyState
    console.log('Connection state:', {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    }[connectionState])
    
    if (connectionState !== 1) {
      throw new Error('MongoDB not properly connected')
    }
    
    // Clear existing data
    console.log('2. Clearing existing data...')
    await Religion.deleteMany({})
    console.log('✓ Religions cleared')
    
    await Sect.deleteMany({})
    console.log('✓ Sects cleared')
    
    await Scholar.deleteMany({})
    console.log('✓ Scholars cleared')
    
    await Book.deleteMany({})
    console.log('✓ Books cleared')
    
    await Video.deleteMany({})
    console.log('✓ Videos cleared')
    
    await Practice.deleteMany({})
    console.log('✓ Practices cleared')

    // Create Religions
    console.log('3. Creating religions...')
    const religions = await Religion.create([
      // 1. Christianity
      {
        name: 'Christianity',
        description: 'An Abrahamic monotheistic religion based on the life and teachings of Jesus Christ.',
        introText: 'Christianity is an Abrahamic monotheistic religion based on the life and teachings of Jesus Christ of Nazareth. Christians believe Jesus is the Son of God and the savior of humanity.',
        foundingDate: new Date('0030-01-01'),
        founder: 'Jesus Christ',
        origin: {
          country: 'Israel',
          region: 'Middle East',
          continent: 'Asia'
        },
        currentFollowers: 2400000000,
        populationPercentage: 31.2,
        keyBeliefs: [
          'Belief in one God (Holy Trinity)',
          'Jesus Christ as the Son of God and savior',
          'Resurrection and afterlife',
          'Salvation through faith in Jesus',
          'The Bible as sacred scripture'
        ],
        corePrinciples: [
          'Love God and love your neighbor',
          'Forgiveness and redemption',
          'Faith, hope, and charity',
          'The Golden Rule: treat others as you want to be treated'
        ],
        sacredTexts: [
          {
            title: 'The Bible',
            author: 'Multiple authors',
            language: 'Hebrew, Aramaic, Greek',
            approximateDate: 'c. 1200 BCE - 100 CE',
            description: 'Collection of sacred texts including Old Testament and New Testament'
          }
        ],
        holyBooks: [
          {
            title: 'Bible',
            description: 'Old Testament and New Testament',
            language: 'Hebrew, Greek'
          }
        ],
        festivals: [
          {
            name: 'Christmas',
            description: 'Celebration of the birth of Jesus Christ',
            date: 'December 25',
            significance: 'Commemorates the incarnation of God in human form'
          },
          {
            name: 'Easter',
            description: 'Celebration of the resurrection of Jesus',
            date: 'Varies (Spring)',
            significance: 'Celebrates victory over death and sin'
          }
        ],
        tags: ['abrahamic', 'monotheistic', 'jesus', 'bible', 'resurrection']
      },
      // 2. Islam
      {
        name: 'Islam',
        description: 'An Abrahamic monotheistic religion teaching that there is only one God (Allah) and that Muhammad is the messenger of God.',
        introText: 'Islam is an Abrahamic monotheistic religion teaching that there is only one God (Allah) and that Muhammad is the final messenger of God. Muslims believe in the Quran as the literal word of God.',
        foundingDate: new Date('0610-01-01'),
        founder: 'Prophet Muhammad',
        origin: {
          country: 'Saudi Arabia',
          region: 'Middle East',
          continent: 'Asia'
        },
        currentFollowers: 1900000000,
        populationPercentage: 24.1,
        keyBeliefs: [
          'Belief in one God (Allah)',
          'Muhammad as the final prophet',
          'The Quran as divine revelation',
          'Belief in angels, revealed books, prophets, Day of Judgment',
          'Predestination (Qadar)'
        ],
        corePrinciples: [
          'Five Pillars of Islam',
          'Submission to God\'s will',
          'Charity (Zakat)',
          'Fasting during Ramadan',
          'Pilgrimage to Mecca (Hajj)'
        ],
        sacredTexts: [
          {
            title: 'The Quran',
            author: 'God (revealed to Muhammad)',
            language: 'Arabic',
            approximateDate: '610-632 CE',
            description: 'The literal word of God revealed to Prophet Muhammad'
          }
        ],
        holyBooks: [
          {
            title: 'Quran',
            description: 'The central religious text',
            language: 'Arabic'
          }
        ],
        festivals: [
          {
            name: 'Eid al-Fitr',
            description: 'Festival breaking the fast of Ramadan',
            date: 'Varies (Islamic calendar)',
            significance: 'Celebrates the end of Ramadan fasting'
          },
          {
            name: 'Eid al-Adha',
            description: 'Festival of sacrifice',
            date: 'Varies (Islamic calendar)',
            significance: 'Commemorates Abraham\'s willingness to sacrifice his son'
          }
        ],
        tags: ['abrahamic', 'monotheistic', 'muhammad', 'quran', 'ramadan']
      },
      // 3. Hinduism
      {
        name: 'Hinduism',
        description: 'An Indian religion and dharma, or way of life, widely practiced in the Indian subcontinent.',
        introText: 'Hinduism is an Indian religion and dharma, or way of life, widely practiced in the Indian subcontinent. It encompasses a diverse spectrum of philosophies and beliefs.',
        // No specific single founding date
        founder: 'No single founder (diverse origins)',
        origin: {
          country: 'India',
          region: 'South Asia',
          continent: 'Asia'
        },
        currentFollowers: 1200000000,
        populationPercentage: 15.1,
        keyBeliefs: [
          'Dharma (righteous living, ethics)',
          'Karma (action and consequence)',
          'Moksha (liberation from samsara)',
          'Samsara (cycle of rebirth)',
          'Brahman (ultimate reality)'
        ],
        corePrinciples: [
          'Ahimsa (non-violence)',
          'Satya (truthfulness)',
          'Asteya (non-stealing)',
          'Brahmacharya (celibacy/chastity)',
          'Aparigraha (non-attachment)'
        ],
        sacredTexts: [
          {
            title: 'Vedas',
            author: 'Ancient sages (Rishis)',
            language: 'Sanskrit',
            approximateDate: 'c. 1500-500 BCE',
            description: 'Oldest sacred texts of Hinduism containing hymns and philosophy'
          },
          {
            title: 'Upanishads',
            author: 'Various sages',
            language: 'Sanskrit',
            approximateDate: 'c. 800-300 BCE',
            description: 'Philosophical texts exploring the nature of reality and self'
          }
        ],
        holyBooks: [
          {
            title: 'Vedas',
            description: 'Ancient sacred texts',
            language: 'Sanskrit'
          }
        ],
        festivals: [
          {
            name: 'Diwali',
            description: 'Festival of lights',
            date: 'Varies (October-November)',
            significance: 'Celebrates victory of light over darkness, good over evil'
          },
          {
            name: 'Holi',
            description: 'Festival of colors',
            date: 'Varies (March)',
            significance: 'Celebrates arrival of spring and love'
          }
        ],
        tags: ['dharmic', 'polytheistic', 'vedas', 'karma', 'moksha', 'reincarnation']
      },
      // 4. Buddhism
      {
        name: 'Buddhism',
        description: 'A spiritual and philosophical tradition focusing on liberation from suffering, the cycle of rebirth, and attainment of enlightenment (Nirvāṇa).',
        introText: 'Buddhism began as a reform movement within the religious milieu of ancient India, where Siddhartha Gautama renounced worldly life to seek understanding of suffering and its cessation. Through meditation and ethical living, he attained enlightenment and taught the Four Noble Truths and the Eightfold Path as a way to overcome suffering, desire, and ignorance.',
        foundingDate: new Date('-0500-01-01'), // Approx 500 BCE
        founder: 'Siddhartha Gautama (the Buddha)',
        origin: {
          country: 'Nepal',
          region: 'South Asia',
          continent: 'Asia'
        },
        currentFollowers: 530612000,
        populationPercentage: 6.5,
        keyBeliefs: [
          'Life involves suffering (dukkha), caused by desire and attachment',
          'Liberation (nirvāṇa) is achieved by extinguishing desire and ignorance',
          'The cycle of rebirth (samsara) can be escaped through ethical conduct, meditation, and wisdom'
        ],
        corePrinciples: [
          'The Four Noble Truths',
          'The Eightfold Path',
          'Compassion (karuṇā)',
          'Non-harm (ahiṃsā)'
        ],
        sacredTexts: [
          {
            title: 'Pāli Canon (Tipitaka)',
            author: 'Disciples of Buddha',
            language: 'Pali',
            approximateDate: 'c. 1st Century BCE',
            description: 'The standard collection of scriptures in the Theravada Buddhist tradition'
          },
          {
            title: 'Mahāyāna Sūtras',
            author: 'Various',
            language: 'Sanskrit, Chinese, Tibetan',
            approximateDate: 'c. 1st Century BCE onwards',
            description: 'Broad genre of Buddhist scriptures accepted as canonical in Mahāyāna Buddhism'
          }
        ],
        holyBooks: [
          {
            title: 'Tripitaka',
            description: 'The Three Baskets of Wisdom',
            language: 'Pali'
          }
        ],
        festivals: [
          {
            name: 'Vesak',
            description: 'Buddha Day',
            date: 'Varies (Full moon in May)',
            significance: 'Commemorates the birth, enlightenment, and death of the Buddha'
          }
        ],
        tags: ['buddhism', 'enlightenment', 'karma', 'meditation', 'nirvana']
      },
      // 5. Sikhism
      {
        name: 'Sikhism',
        description: 'A monotheistic religion emphasizing devotion to one God, equality of humanity, justice, honest living, and community service.',
        introText: 'Sikhism emerged in the context of the religious and social environment of medieval India, where Guru Nanak Dev Ji preached a message of one God, equality across caste and gender, and social justice. Sikhism rejects caste discrimination and ritualism, focusing on living a truthful, compassionate, and selfless life.',
        foundingDate: new Date('1499-01-01'), // Approx 1500 CE
        founder: 'Guru Nanak',
        origin: {
          country: 'India',
          region: 'Punjab',
          continent: 'Asia'
        },
        currentFollowers: 29254000,
        populationPercentage: 0.4,
        keyBeliefs: [
          'Belief in One God (Ik Onkar)',
          'Equality of all humans regardless of caste, gender, race',
          'Importance of honest earning, social justice, community service (seva)'
        ],
        corePrinciples: [
          'Naam Japna (meditation on God’s name)',
          'Kirat Karō (honest living)',
          'Vand Chhakō (sharing and community)',
          'Rejection of caste inequality and ritualism'
        ],
        sacredTexts: [
          {
            title: 'Guru Granth Sahib',
            author: 'Sikh Gurus',
            language: 'Gurmukhi (Punjabi)',
            approximateDate: '1604-1708 CE',
            description: 'Central religious scripture, regarded as the eternal living Guru'
          }
        ],
        holyBooks: [
          {
            title: 'Guru Granth Sahib',
            description: 'The Eternal Guru',
            language: 'Punjabi'
          }
        ],
        festivals: [
          {
            name: 'Vaisakhi',
            description: 'Harvest Festival / Birth of Khalsa',
            date: 'April 13 or 14',
            significance: 'Marks the formation of the Khalsa Panth in 1699'
          },
          {
            name: 'Guru Nanak Gurpurab',
            description: 'Birth Anniversary of Guru Nanak',
            date: 'Varies (Lunar Calendar)',
            significance: 'Celebrates the birth of the founder of Sikhism'
          }
        ],
        tags: ['sikhism', 'monotheism', 'equality', 'community', 'service']
      },
      // 6. Judaism
      {
        name: 'Judaism',
        description: 'One of the oldest monotheistic religions; emphasizes covenant between God and the Jewish people, law/ethics, moral living.',
        introText: 'Judaism emerged in the ancient Near East as the religion of the Hebrew people, centered on belief in one God (Yahweh), revelation, and covenant. Through prophets, law (Torah), and community traditions, Judaism maintained identity despite diasporas and persecutions.',
        foundingDate: new Date('-1500-01-01'), // Ancient, approx 2nd millennium BCE
        founder: 'Abraham / Moses (Prophets)',
        origin: {
          country: 'Israel',
          region: 'Middle East',
          continent: 'Asia'
        },
        currentFollowers: 14800000,
        populationPercentage: 0.2,
        keyBeliefs: [
          'Belief in one God (Monotheism)',
          'Covenant between God and the Jewish people',
          'Emphasis on moral and ethical law, justice, and community responsibility'
        ],
        corePrinciples: [
          'Observance of commandments (mitzvot)',
          'Communal identity and tradition',
          'Study of scripture (Torah)',
          'Tikkun Olam (repairing the world)'
        ],
        sacredTexts: [
          {
            title: 'Tanakh',
            author: 'Multiple (Moses, Prophets)',
            language: 'Hebrew, Aramaic',
            approximateDate: 'c. 1200-200 BCE',
            description: 'Hebrew Bible consisting of Torah, Nevi\'im, and Ketuvim'
          },
          {
            title: 'Talmud',
            author: 'Rabbinic Sages',
            language: 'Hebrew, Aramaic',
            approximateDate: 'c. 200-500 CE',
            description: 'Central text of Rabbinic Judaism and source of Jewish religious law (Halakha)'
          }
        ],
        holyBooks: [
          {
            title: 'Torah',
            description: 'The Five Books of Moses',
            language: 'Hebrew'
          }
        ],
        festivals: [
          {
            name: 'Passover (Pesach)',
            description: 'Festival of Freedom',
            date: 'Varies (Spring)',
            significance: 'Commemorates the Exodus from Egypt'
          },
          {
            name: 'Yom Kippur',
            description: 'Day of Atonement',
            date: 'Varies (Fall)',
            significance: 'Holiest day of the year, focused on atonement and repentance'
          }
        ],
        tags: ['judaism', 'monotheism', 'law', 'covenant', 'torah']
      },
      // 7. Baháʼí Faith
      {
        name: 'Baháʼí Faith',
        description: 'A monotheistic, universalist religion emphasizing unity of humanity, unity of world religions, equality, peace, social ethics.',
        introText: 'The Baháʼí Faith holds that all major world religions come from the same divine source, manifested in different eras through different prophets. The religion rejects clergy, promotes global fellowship, universal education, gender equality, and harmony between religion and science.',
        foundingDate: new Date('1863-04-21'),
        founder: 'Baháʼu\'lláh',
        origin: {
          country: 'Iran',
          region: 'Middle East',
          continent: 'Asia'
        },
        currentFollowers: 7500000,
        populationPercentage: 0.1,
        keyBeliefs: [
          'Oneness of God',
          'Oneness of religion (progressive revelation)',
          'Oneness of humanity',
          'Equality of men and women'
        ],
        corePrinciples: [
          'Elimination of all forms of prejudice',
          'Universal education',
          'Harmony of science and religion',
          'Independent investigation of truth'
        ],
        sacredTexts: [
          {
            title: 'Kitáb-i-Aqdas',
            author: 'Baháʼu\'lláh',
            language: 'Arabic',
            approximateDate: '1873',
            description: 'The Most Holy Book, containing the laws of the Baháʼí Faith'
          }
        ],
        holyBooks: [
          {
            title: 'Kitáb-i-Aqdas',
            description: 'The Most Holy Book',
            language: 'Arabic'
          }
        ],
        festivals: [
          {
            name: 'Ridván',
            description: 'Festival of Paradise',
            date: 'April 21 - May 2',
            significance: 'Commemorates Baháʼu\'lláh\'s declaration of his mission'
          }
        ],
        tags: ['bahai', 'unity', 'peace', 'oneness', 'global']
      },
      // 8. Jainism
      {
        name: 'Jainism',
        description: 'Ancient Indian religion emphasizing non-violence (ahiṃsā), non-possessiveness, truth, asceticism, and liberation of the soul.',
        introText: 'Jainism developed a strong ethic of non-violence, strict asceticism, and a philosophy that emphasizes non-attachment and truthfulness. The goal is liberation from the cycle of birth and death (samsara) by purifying the soul through right conduct.',
        foundingDate: new Date('-0599-01-01'), // Approx 6th Century BCE
        founder: 'Mahavira (24th Tirthankara)',
        origin: {
          country: 'India',
          region: 'South Asia',
          continent: 'Asia'
        },
        currentFollowers: 6344000,
        populationPercentage: 0.1,
        keyBeliefs: [
          'Ahiṃsā (non-violence) toward all living beings',
          'Karma - actions have consequences',
          'Souls (jivas) are eternal and can achieve liberation',
          'Anekantavada (many-sidedness of reality)'
        ],
        corePrinciples: [
          'Ahimsa (Non-violence)',
          'Satya (Truth)',
          'Asteya (Non-stealing)',
          'Brahmacharya (Chastity)',
          'Aparigraha (Non-possessiveness)'
        ],
        sacredTexts: [
          {
            title: 'Agamas',
            author: 'Gandharas (Disciples)',
            language: 'Ardhamagadhi, Prakrit',
            approximateDate: 'c. 6th Century BCE onwards',
            description: 'Canonical texts based on Mahavira\'s teachings'
          }
        ],
        holyBooks: [
          {
            title: 'Agamas',
            description: 'Canonical scriptures',
            language: 'Prakrit'
          }
        ],
        festivals: [
          {
            name: 'Paryushana',
            description: 'Festival of Forgiveness',
            date: 'Varies (August/September)',
            significance: 'Time of fasting, reflection, and repentance'
          },
          {
            name: 'Mahavira Jayanti',
            description: 'Birth of Mahavira',
            date: 'Varies (Spring)',
            significance: 'Celebrates the birth of the last Tirthankara'
          }
        ],
        tags: ['jainism', 'ahimsa', 'karma', 'nonviolence', 'asceticism']
      },
      // 9. Taoism (Daoism)
      {
        name: 'Taoism',
        description: 'A Chinese philosophical and religious tradition emphasizing harmony with the Tao (the Way), naturalness, simplicity, and non-action.',
        introText: 'Taoism advocates a life in harmony with nature and the underlying "Way" (Tao), emphasizing minimal interference with natural order, simplicity, humility, and flexibility.',
        foundingDate: new Date('-0550-01-01'), // Approx 6th Century BCE
        founder: 'Laozi',
        origin: {
          country: 'China',
          region: 'East Asia',
          continent: 'Asia'
        },
        currentFollowers: 8767000,
        populationPercentage: 0.1,
        keyBeliefs: [
          'The Tao (Way) is the fundamental principle underlying reality',
          'Living in harmony with nature',
          'Yin and Yang balance',
          'Cultivation of life force (Qi)'
        ],
        corePrinciples: [
          'Wu-wei (effortless action / non-action)',
          'Simplicity and humility',
          'Harmony with nature',
          'Ziran (naturalness)'
        ],
        sacredTexts: [
          {
            title: 'Tao Te Ching',
            author: 'Laozi',
            language: 'Classical Chinese',
            approximateDate: 'c. 6th Century BCE',
            description: 'Foundational text exploring the Tao and virtue (De)'
          },
          {
            title: 'Zhuangzi',
            author: 'Zhuangzi',
            language: 'Classical Chinese',
            approximateDate: 'c. 4th Century BCE',
            description: 'Stories and parables illustrating Taoist philosophy'
          }
        ],
        holyBooks: [
          {
            title: 'Tao Te Ching',
            description: 'The Book of the Way and Virtue',
            language: 'Chinese'
          }
        ],
        festivals: [
          {
            name: 'Lantern Festival',
            description: 'End of Chinese New Year',
            date: '15th day of 1st lunar month',
            significance: 'Celebrates the first full moon and heavenly deities'
          }
        ],
        tags: ['taoism', 'tao', 'nature', 'harmony', 'wu-wei']
      },
      // 10. Confucianism
      {
        name: 'Confucianism',
        description: 'A philosophical-ethical tradition focusing on morality, social harmony, proper conduct, filial piety, and societal order.',
        introText: 'Confucianism emphasizes humaneness (ren), righteousness, social roles, respect for ancestors, and living in harmony with the moral order. It has shaped East Asian culture, governance, and family structure for millennia.',
        foundingDate: new Date('-0551-01-01'), // Confucius born 551 BCE
        founder: 'Confucius',
        origin: {
          country: 'China',
          region: 'East Asia',
          continent: 'Asia'
        },
        currentFollowers: 8755000,
        populationPercentage: 0.1,
        keyBeliefs: [
          'Importance of moral virtue (Ren)',
          'Respect for ancestors and elders (Filial Piety)',
          'Social harmony through proper conduct (Li)',
          'The Five Relationships'
        ],
        corePrinciples: [
          'Ren (Benevolence)',
          'Yi (Righteousness)',
          'Li (Propriety/Ritual)',
          'Zhi (Wisdom)',
          'Xin (Trustworthiness)'
        ],
        sacredTexts: [
          {
            title: 'The Analects',
            author: 'Disciples of Confucius',
            language: 'Classical Chinese',
            approximateDate: 'c. 475-221 BCE',
            description: 'Collection of sayings and ideas attributed to Confucius'
          }
        ],
        holyBooks: [
          {
            title: 'Analects',
            description: 'Sayings of Confucius',
            language: 'Chinese'
          }
        ],
        festivals: [
          {
            name: 'Confucius Birthday',
            description: 'Teacher\'s Day',
            date: 'September 28',
            significance: 'Commemorates the birth of Confucius'
          }
        ],
        tags: ['confucianism', 'ethics', 'harmony', 'virtue', 'filial-piety']
      },
      // 11. Shinto
      {
        name: 'Shinto',
        description: 'Indigenous Japanese religion with animistic features, emphasizing kami (spirits), ancestor veneration, and harmony with nature.',
        introText: 'Shinto is Japan’s indigenous spiritual tradition centered on kami — spiritual entities believed to inhabit natural elements. Ritual purity, offerings, festivals (matsuri), and reverence for nature are central.',
        // Ancient indigenous tradition, no specific date
        founder: 'None (Indigenous)',
        origin: {
          country: 'Japan',
          region: 'East Asia',
          continent: 'Asia'
        },
        currentFollowers: 3000000, // Explicit followers, though cultural participation is higher
        populationPercentage: 0.05,
        keyBeliefs: [
          'Kami exist in nature, people, and objects',
          'Importance of purity (spiritual and physical)',
          'Harmony with nature (Kannagara)',
          'Ancestor veneration'
        ],
        corePrinciples: [
          'Makoto (Sincerity)',
          'Respect for nature',
          'Ritual purity (Harae)',
          'Community connection (Matsuri)'
        ],
        sacredTexts: [
          {
            title: 'Kojiki',
            author: 'O no Yasumaro (Compiler)',
            language: 'Old Japanese',
            approximateDate: '712 CE',
            description: 'Records of Ancient Matters, mythology and early history'
          },
          {
            title: 'Nihon Shoki',
            author: 'Prince Toneri (Compiler)',
            language: 'Classical Japanese',
            approximateDate: '720 CE',
            description: 'Chronicles of Japan'
          }
        ],
        holyBooks: [
          {
            title: 'Kojiki',
            description: 'Records of Ancient Matters',
            language: 'Old Japanese'
          }
        ],
        festivals: [
          {
            name: 'Shogatsu (New Year)',
            description: 'New Year Celebration',
            date: 'January 1-3',
            significance: 'Welcoming the Toshigami (New Year kami) for blessings'
          }
        ],
        tags: ['shinto', 'animism', 'kami', 'nature', 'japan']
      },
      // 12. Zoroastrianism
      {
        name: 'Zoroastrianism',
        description: 'One of the oldest organized monotheistic religions; worship of a supreme deity, cosmic dualism, and moral living.',
        introText: 'Zoroastrianism dates back over two millennia. Its core message centers on worshipping one supreme God (Ahura Mazda), ethical living, truth (asha), and the ongoing struggle between good and evil.',
        foundingDate: new Date('-1000-01-01'), // Approx 1000 BCE
        founder: 'Zoroaster (Zarathushtra)',
        origin: {
          country: 'Iran',
          region: 'Middle East',
          continent: 'Asia'
        },
        currentFollowers: 120000,
        populationPercentage: 0.002,
        keyBeliefs: [
          'Monotheism: belief in one supreme God (Ahura Mazda)',
          'Cosmic dualism: struggle between good (Asha) and evil (Druj)',
          'Judgment of the soul after death'
        ],
        corePrinciples: [
          'Humata, Hukhta, Hvarshta (Good Thoughts, Good Words, Good Deeds)',
          'Upholding Truth (Asha)',
          'Charity and care for the elements (fire, water, earth)'
        ],
        sacredTexts: [
          {
            title: 'Avesta',
            author: 'Zoroaster and ancient priests',
            language: 'Avestan',
            approximateDate: 'c. 1000 BCE onwards',
            description: 'Primary collection of sacred texts'
          }
        ],
        holyBooks: [
          {
            title: 'Avesta',
            description: 'The Book of the Law',
            language: 'Avestan'
          }
        ],
        festivals: [
          {
            name: 'Nowruz',
            description: 'Persian New Year',
            date: 'Spring Equinox (March)',
            significance: 'Celebration of renewal, nature, and the triumph of light'
          }
        ],
        tags: ['zoroastrianism', 'ahura-mazda', 'monotheism', 'good-vs-evil', 'ancient']
      }
    ])
    console.log(`✓ Created ${religions.length} religions`)

    // Create sample Books
    console.log('4. Creating books...')
    const books = await Book.create([
      {
        title: 'The Holy Bible',
        author: 'Multiple Authors',
        description: 'The sacred scripture of Christianity, containing the Old and New Testaments.',
        category: 'scripture',
        difficulty: 'intermediate',
        language: 'English',
        amazonLink: 'https://amazon.com/holy-bible',
        goodreadsLink: 'https://goodreads.com/holy-bible',
        rating: 4.8,
        religionId: religions[0]._id,
        tags: ['christianity', 'bible', 'scripture', 'jesus']
      },
      {
        title: 'The Quran',
        author: 'God (revealed to Muhammad)',
        description: 'The central religious text of Islam, believed to be the word of God.',
        category: 'scripture',
        difficulty: 'advanced',
        language: 'Arabic',
        amazonLink: 'https://amazon.com/quran',
        rating: 4.9,
        religionId: religions[1]._id,
        tags: ['islam', 'quran', 'muhammad', 'arabic']
      },
      {
        title: 'The Bhagavad Gita',
        author: 'Vyasa (traditionally attributed)',
        description: 'A 700-verse Hindu scripture that is part of the epic Mahabharata.',
        category: 'scripture',
        difficulty: 'intermediate',
        language: 'Sanskrit',
        amazonLink: 'https://amazon.com/bhagavad-gita',
        rating: 4.7,
        religionId: religions[2]._id,
        tags: ['hinduism', 'bhagavad-gita', 'krishna', 'dharma']
      }
    ])
    console.log(`✓ Created ${books.length} books`)

    // Create sample Videos
    console.log('5. Creating videos...')
    const videos = await Video.create([
      {
        title: 'Introduction to Christianity',
        description: 'A comprehensive overview of Christian beliefs, practices, and history.',
        youtubeId: 'abc123',
        duration: '45:30',
        channel: 'Religious Studies',
        category: 'lecture',
        difficulty: 'beginner',
        language: 'English',
        rating: 4.5,
        religionId: religions[0]._id,
        tags: ['christianity', 'introduction', 'beliefs']
      },
      {
        title: 'Understanding the Quran',
        description: 'Deep dive into the meaning and context of Quranic verses.',
        youtubeId: 'def456',
        duration: '60:15',
        channel: 'Islamic Learning',
        category: 'lecture',
        difficulty: 'intermediate',
        language: 'English',
        rating: 4.7,
        religionId: religions[1]._id,
        tags: ['islam', 'quran', 'teaching']
      }
    ])
    console.log(`✓ Created ${videos.length} videos`)

    // Create sample Practices
    console.log('6. Creating practices...')
    const practices = await Practice.create([
      {
        title: 'Christian Prayer',
        description: 'Daily prayer practice for Christians to communicate with God.',
        instructions: 'Find a quiet space, kneel or sit comfortably, and speak from the heart to God.',
        category: 'prayer',
        difficulty: 'beginner',
        duration: '15-30 minutes',
        frequency: 'daily',
        tools: ['Bible', 'prayer book'],
        benefits: ['Spiritual connection', 'Peace', 'Guidance'],
        religionId: religions[0]._id,
        rating: 4.6,
        steps: [
          {
            step: 1,
            instruction: 'Find a quiet place where you won\'t be disturbed',
            duration: '2 minutes'
          },
          {
            step: 2,
            instruction: 'Begin with gratitude and praise',
            duration: '3 minutes'
          },
          {
            step: 3,
            instruction: 'Present your requests and concerns',
            duration: '10 minutes'
          },
          {
            step: 4,
            instruction: 'Close in Jesus\' name with faith',
            duration: '2 minutes'
          }
        ]
      },
      {
        title: 'Islamic Salah (Prayer)',
        description: 'The ritual prayer performed five times daily by Muslims.',
        instructions: 'Perform ablution (wudu), face the Kaaba, and follow the prescribed movements and recitations.',
        category: 'prayer',
        difficulty: 'intermediate',
        duration: '5-10 minutes',
        frequency: '5 times daily',
        tools: ['Prayer rug', 'clean water'],
        benefits: ['Spiritual discipline', 'Connection with God', 'Community bonding'],
        religionId: religions[1]._id,
        rating: 4.8,
        steps: [
          {
            step: 1,
            instruction: 'Perform wudu (ablution)',
            duration: '2 minutes'
          },
          {
            step: 2,
            instruction: 'Stand and recite Al-Fatiha',
            duration: '1 minute'
          },
          {
            step: 3,
            instruction: 'Bow in ruku and recite praises',
            duration: '1 minute'
          },
          {
            step: 4,
            instruction: 'Prostrate in sujud and recite prayers',
            duration: '2 minutes'
          }
        ]
      }
    ])
    console.log(`✓ Created ${practices.length} practices`)

    console.log('=== Seed Completed Successfully ===')

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully! 🎉',
      counts: {
        religions: religions.length,
        books: books.length,
        videos: videos.length,
        practices: practices.length
      },
      data: {
        religions: religions.map(r => ({ id: r._id, name: r.name }))
      }
    })
  } catch (error) {
    console.error('❌ Seed Error:', error)
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to seed database',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}