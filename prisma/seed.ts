import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Religions data
  const religions = [
    {
      name: 'Christianity',
      introText: 'Christianity is an Abrahamic monotheistic religion based on the life and teachings of Jesus Christ of Nazareth. It is the world\'s largest religion with about 2.4 billion followers.',
      populationPercentage: 31.2,
      foundingDate: 'c. 30 CE',
      founder: 'Jesus Christ',
      holyBooks: 'Bible (Old Testament, New Testament)',
      coreBeliefs: 'Belief in one God, Jesus as the Son of God, resurrection, salvation through faith'
    },
    {
      name: 'Islam',
      introText: 'Islam is an Abrahamic monotheistic religion teaching that there is only one God (Allah) and that Muhammad is the messenger of God. It is the world\'s second-largest religion with about 1.9 billion followers.',
      populationPercentage: 24.1,
      foundingDate: '7th century CE',
      founder: 'Prophet Muhammad',
      holyBooks: 'Quran (primary), Hadith, Sunnah',
      coreBeliefs: 'Belief in one God (Allah), angels, revealed books, prophets, Day of Judgment, predestination'
    },
    {
      name: 'Hinduism',
      introText: 'Hinduism is an Indian religion and dharma, or way of life. It is the world\'s third-largest religion with over 1.2 billion followers, known as Hindus.',
      populationPercentage: 15.1,
      foundingDate: 'c. 2000 BCE',
      founder: 'No single founder (diverse origins)',
      holyBooks: 'Vedas, Upanishads, Puranas, Mahabharata, Ramayana, Bhagavad Gita',
      coreBeliefs: 'Dharma, karma, moksha, samsara, various deities as manifestations of Brahman'
    },
    {
      name: 'Buddhism',
      introText: 'Buddhism is a religion and dharma that encompasses a variety of traditions, beliefs and spiritual practices largely based on original teachings attributed to the Buddha.',
      populationPercentage: 7.1,
      foundingDate: 'c. 5th century BCE',
      founder: 'Siddhartha Gautama (the Buddha)',
      holyBooks: 'Tripitaka (Pali Canon), Mahayana Sutras, Tibetan Buddhist Canon',
      coreBeliefs: 'Four Noble Truths, Eightfold Path, karma, rebirth, enlightenment (Nirvana)'
    },
    {
      name: 'Sikhism',
      introText: 'Sikhism is a monotheistic religion that originated in the Punjab region of the Indian subcontinent around the end of the 15th century CE.',
      populationPercentage: 0.3,
      foundingDate: '15th century CE',
      founder: 'Guru Nanak',
      holyBooks: 'Guru Granth Sahib',
      coreBeliefs: 'Belief in one God, equality of all humans, living an honest life, meditation on God\'s name'
    },
    {
      name: 'Judaism',
      introText: 'Judaism is an Abrahamic ethnic religion comprising the collective religious, cultural, and legal tradition and civilization of the Jewish people.',
      populationPercentage: 0.2,
      foundingDate: 'c. 2000 BCE',
      founder: 'Abraham',
      holyBooks: 'Tanakh (Hebrew Bible), Talmud',
      coreBeliefs: 'Belief in one God, covenant relationship, Torah as divine law, Messiah, afterlife'
    },
    {
      name: 'Baháʼí Faith',
      introText: 'The Baháʼí Faith is a relatively new religion teaching the essential worth of all religions and the unity of all people.',
      populationPercentage: 0.1,
      foundingDate: '19th century CE',
      founder: 'Baháʼuʼlláh',
      holyBooks: 'Kitáb-i-Aqdas, Kitáb-i-Íqán, writings of Baháʼuʼlláh',
      coreBeliefs: 'Unity of God, unity of religion, unity of humanity, progressive revelation'
    },
    {
      name: 'Jainism',
      introText: 'Jainism, traditionally known as Jain Dharma, is an ancient Indian religion that prescribes a path of non-violence, truth, and self-control for all forms of living beings.',
      populationPercentage: 0.1,
      foundingDate: 'c. 6th century BCE',
      founder: 'Mahavira (24th Tirthankara)',
      holyBooks: 'Agamas (canonical texts), Tattvartha Sutra',
      coreBeliefs: 'Ahimsa (non-violence), karma, reincarnation, liberation (moksha), self-control'
    },
    {
      name: 'Shinto',
      introText: 'Shinto is a religion which originated in Japan. Classified as an East Asian religion by scholars of religion, its practitioners often regard it as Japan\'s indigenous religion.',
      populationPercentage: 0.1,
      foundingDate: 'Ancient (pre-6th century CE)',
      founder: 'No single founder',
      holyBooks: 'Kojiki, Nihon Shoki',
      coreBeliefs: 'Kami (spirits/deities), purification, harmony with nature, reverence for ancestors'
    }
  ]

  // Create religions
  const createdReligions = await Promise.all(
    religions.map(async (religion) => {
      return await prisma.religion.create({
        data: religion
      })
    })
  )

  // Find religions by name for easier reference
  const getReligion = (name: string) => createdReligions.find(r => r.name === name)!

  // Create sects for each religion
  const sects = [
    // Christianity sects
    { name: 'Catholicism', description: 'The Catholic Church is headed by the Pope and believes in the authority of tradition alongside scripture.', religionName: 'Christianity', keyCharacteristics: 'Papal authority, seven sacraments, veneration of saints, apostolic succession' },
    { name: 'Eastern Orthodoxy', description: 'Eastern Orthodox Churches emphasize continuity with early Christianity and mystical theology.', religionName: 'Christianity', keyCharacteristics: 'Divine liturgy, icon veneration, mystical theology, autocephalous churches' },
    { name: 'Protestantism', description: 'Protestantism emphasizes salvation by faith alone and the authority of scripture alone.', religionName: 'Christianity', keyCharacteristics: 'Sola scriptura, sola fide, priesthood of all believers, diverse denominations' },

    // Islam sects
    { name: 'Sunni Islam', description: 'Sunni Islam is the largest branch of Islam, following the Sunnah of the Prophet Muhammad.', religionName: 'Islam', keyCharacteristics: 'Following the Rashidun caliphs, emphasis on consensus, four major schools of law' },
    { name: 'Shia Islam', description: 'Shia Islam believes that Ali, the cousin and son-in-law of Muhammad, was the rightful successor.', religionName: 'Islam', keyCharacteristics: 'Imamate, martyrdom of Husayn, emphasis on ahl al-bayt, different schools of law' },
    { name: 'Sufism', description: 'Sufism is the mystical dimension of Islam, focusing on inner spiritual development.', religionName: 'Islam', keyCharacteristics: 'Mystical practices, dhikr, spiritual guidance, love of God' },

    // Hinduism sects
    { name: 'Vaishnavism', description: 'Vaishnavism worships Vishnu as the supreme being and his manifestations.', religionName: 'Hinduism', keyCharacteristics: 'Devotion to Vishnu, bhakti yoga, avatars, temple worship' },
    { name: 'Shaivism', description: 'Shaivism worships Shiva as the supreme being.', religionName: 'Hinduism', keyCharacteristics: 'Devotion to Shiva, ascetic traditions, yoga philosophy, temple worship' },
    { name: 'Shaktism', description: 'Shaktism focuses on the worship of the divine feminine in her various forms.', religionName: 'Hinduism', keyCharacteristics: 'Goddess worship, tantra, yantra, mantra practices' },

    // Buddhism sects
    { name: 'Theravada', description: 'Theravada is the oldest surviving Buddhist school and emphasizes personal enlightenment.', religionName: 'Buddhism', keyCharacteristics: 'Pali Canon, arhat ideal, monastic tradition, mindfulness meditation' },
    { name: 'Mahayana', description: 'Mahayana Buddhism emphasizes the bodhisattva path and compassion for all beings.', religionName: 'Buddhism', keyCharacteristics: 'Bodhisattva ideal, emptiness, Buddha nature, diverse sutras' },
    { name: 'Vajrayana', description: 'Vajrayana Buddhism incorporates esoteric practices and rapid enlightenment techniques.', religionName: 'Buddhism', keyCharacteristics: 'Tantric practices, mantras, mandalas, deity yoga' }
  ]

  const createdSects = await Promise.all(
    sects.map(async (sect) => {
      const religion = getReligion(sect.religionName)
      return await prisma.sect.create({
        data: {
          name: sect.name,
          description: sect.description,
          religionId: religion.id,
          keyCharacteristics: sect.keyCharacteristics
        }
      })
    })
  )

  // Find sects by name for easier reference
  const getSect = (name: string) => createdSects.find(s => s.name === name)!

  // Create scholars
  const scholars = [
    // Christianity scholars
    { name: 'Augustine of Hippo', era: '4th-5th century', century: '4th-5th', language: 'Latin', sectName: 'Catholicism', isUniversallyRespected: true, majorWorks: 'Confessions, City of God, On Christian Doctrine' },
    { name: 'Thomas Aquinas', era: '13th century', century: '13th', language: 'Latin', sectName: 'Catholicism', isUniversallyRespected: true, majorWorks: 'Summa Theologica, Summa Contra Gentiles' },
    { name: 'Martin Luther', era: '15th-16th century', century: '15th-16th', language: 'German', sectName: 'Protestantism', isUniversallyRespected: true, majorWorks: '95 Theses, Luther\'s Large Catechism' },

    // Islam scholars
    { name: 'Al-Ghazali', era: '11th-12th century', century: '11th-12th', language: 'Arabic', sectName: 'Sunni Islam', isUniversallyRespected: true, majorWorks: 'Ihya Ulum al-Din, Tahafut al-Falasifa' },
    { name: 'Ibn Sina (Avicenna)', era: '10th-11th century', century: '10th-11th', language: 'Arabic', sectName: 'Sunni Islam', isUniversallyRespected: true, majorWorks: 'The Book of Healing, The Canon of Medicine' },
    { name: 'Rumi', era: '13th century', century: '13th', language: 'Persian', sectName: 'Sufism', isUniversallyRespected: true, majorWorks: 'Masnavi, Diwan-e Shams-e Tabrizi' },

    // Hinduism scholars
    { name: 'Adi Shankaracharya', era: '8th century', century: '8th', language: 'Sanskrit', sectName: 'Shaivism', isUniversallyRespected: true, majorWorks: 'Viveka Chudamani, Atma Bodha, commentaries on Upanishads' },
    { name: 'Ramanuja', era: '11th-12th century', century: '11th-12th', language: 'Sanskrit', sectName: 'Vaishnavism', isUniversallyRespected: true, majorWorks: 'Sri Bhashya, Vedartha Sangraha' },

    // Buddhism scholars
    { name: 'Nagarjuna', era: '2nd-3rd century', century: '2nd-3rd', language: 'Sanskrit', sectName: 'Mahayana', isUniversallyRespected: true, majorWorks: 'Mulamadhyamakakarika, Vigrahavyavartani' },
    { name: 'Dogen', era: '13th century', century: '13th', language: 'Japanese', sectName: 'Mahayana', isUniversallyRespected: true, majorWorks: 'Shobogenzo, Eihei Shingi' }
  ]

  await Promise.all(
    scholars.map(async (scholar) => {
      const sect = getSect(scholar.sectName)
      return await prisma.scholar.create({
        data: {
          name: scholar.name,
          era: scholar.era,
          century: scholar.century,
          language: scholar.language,
          sectId: sect.id,
          isUniversallyRespected: scholar.isUniversallyRespected,
          majorWorks: scholar.majorWorks
        }
      })
    })
  )

  // Create rituals
  const rituals = [
    // Christianity rituals
    { name: 'Baptism', description: 'The ritual of initiation into Christianity through water.', religionName: 'Christianity', icon: '💧', significance: 'Symbolizes purification and rebirth in Christ', frequency: 'Once in lifetime' },
    { name: 'Eucharist/Communion', description: 'The ritual of consuming bread and wine representing Christ\'s body and blood.', religionName: 'Christianity', icon: '🍞', significance: 'Commemorates the Last Supper', frequency: 'Weekly or daily' },

    // Islam rituals
    { name: 'Salah (Prayer)', description: 'The ritual prayer performed five times daily facing Mecca.', religionName: 'Islam', icon: '🙏', significance: 'Direct communication with Allah', frequency: 'Five times daily' },
    { name: 'Hajj', description: 'The annual pilgrimage to Mecca, required once in a lifetime for those who can afford it.', religionName: 'Islam', icon: '🕋', significance: 'Spiritual purification and unity of Muslims', frequency: 'Once in lifetime' },

    // Hinduism rituals
    { name: 'Puja', description: 'Worship ritual involving offerings to deities.', religionName: 'Hinduism', icon: '🪔', significance: 'Shows devotion and seeks blessings', frequency: 'Daily' },
    { name: 'Aarti', description: 'Ritual of waving lighted lamps before deities.', religionName: 'Hinduism', icon: '🔥', significance: 'Removal of darkness and ignorance', frequency: 'Daily during puja' },

    // Buddhism rituals
    { name: 'Meditation', description: 'Practice of mindfulness and concentration for mental development.', religionName: 'Buddhism', icon: '🧘', significance: 'Cultivation of awareness and wisdom', frequency: 'Daily' },
    { name: 'Offerings', description: 'Making offerings to Buddha images and monks.', religionName: 'Buddhism', icon: '🌸', significance: 'Cultivation of generosity and merit', frequency: 'Regular' }
  ]

  await Promise.all(
    rituals.map(async (ritual) => {
      const religion = getReligion(ritual.religionName)
      return await prisma.ritual.create({
        data: {
          title: ritual.name,
          description: ritual.description,
          religionId: religion.id,
          icon: ritual.icon,
          significance: ritual.significance,
          frequency: ritual.frequency
        }
      })
    })
  )

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })