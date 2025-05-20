import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiStar, FiMapPin, FiDollarSign, FiClock, FiAward, FiSliders, FiBriefcase, FiCheck, FiHeart, FiMessageSquare } from 'react-icons/fi';

interface Talent {
  id: string;
  name: string;
  avatar: string;
  title: string;
  rating: number;
  hourlyRate: number;
  location: string;
  skills: string[];
  description: string;
  completedProjects: number;
  successRate: number;
  availability: string;
  languages: string[];
  verificationBadges: string[];
  portfolio: {
    title: string;
    image: string;
  }[];
}

interface FilterState {
  hourlyRate: [number, number];
  skills: string[];
  availability: string[];
  rating: number;
  location: string[];
  languages: string[];
  category: string;
}

const FindTalent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    hourlyRate: [0, 150],
    skills: [],
    availability: [],
    rating: 0,
    location: [],
    languages: [],
    category: ''
  });

  const [activeCategory, setActiveCategory] = useState<string>('');

  const mockTalent: Talent[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      title: 'Full Stack Developer',
      rating: 4.9,
      hourlyRate: 45,
      location: 'San Francisco, USA',
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
      description: 'Experienced full-stack developer specializing in React and Node.js. Strong focus on clean code and scalable architecture.',
      completedProjects: 87,
      successRate: 98,
      availability: 'Full-time',
      languages: ['English', 'Mandarin'],
      verificationBadges: ['ID Verified', 'Skills Tested', 'Payment Verified'],
      portfolio: [
        {
          title: 'E-commerce Platform',
          image: 'https://picsum.photos/seed/1/300/200'
        },
        {
          title: 'Social Media Dashboard',
          image: 'https://picsum.photos/seed/2/300/200'
        }
      ]
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      title: 'UI/UX Designer',
      rating: 4.8,
      hourlyRate: 55,
      location: 'London, UK',
      skills: ['Figma', 'Adobe XD', 'UI Design', 'User Research'],
      description: 'Creative UI/UX designer with a passion for creating intuitive and beautiful user experiences.',
      completedProjects: 64,
      successRate: 96,
      availability: 'Part-time',
      languages: ['English', 'Spanish'],
      verificationBadges: ['ID Verified', 'Skills Tested'],
      portfolio: [
        {
          title: 'Mobile App Design',
          image: 'https://picsum.photos/seed/3/300/200'
        },
        {
          title: 'Web Design',
          image: 'https://picsum.photos/seed/4/300/200'
        }
      ]
    },
    {
      id: '3',
      name: 'Emma Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      title: 'Mobile Developer',
      rating: 4.7,
      hourlyRate: 50,
      location: 'Berlin, Germany',
      skills: ['React Native', 'iOS', 'Android', 'Flutter'],
      description: 'Mobile development expert with extensive experience in cross-platform development.',
      completedProjects: 52,
      successRate: 94,
      availability: 'Hourly',
      languages: ['English', 'German'],
      verificationBadges: ['ID Verified', 'Payment Verified'],
      portfolio: [
        {
          title: 'iOS App Development',
          image: 'https://picsum.photos/seed/5/300/200'
        },
        {
          title: 'Android App Development',
          image: 'https://picsum.photos/seed/6/300/200'
        }
      ]
    }
  ];

  const availabilityOptions = ['Full-time', 'Part-time', 'Hourly', 'As Needed'];
  const languageOptions = ['English', 'Spanish', 'Mandarin', 'Hindi', 'Arabic'];
  const locationOptions = ['North America', 'Europe', 'Asia', 'South America', 'Africa'];

  const skillCategories = {
    'Frontend Development': [
      'React', 'Vue.js', 'Angular', 'Next.js', 'TypeScript', 
      'HTML/CSS', 'Tailwind CSS', 'Material UI', 'JavaScript',
      'Responsive Design', 'Web Animation', 'Frontend Testing'
    ],
    'Backend Development': [
      'Node.js', 'Python', 'Java', 'C#', 'PHP',
      'Ruby', 'Go', 'REST APIs', 'GraphQL',
      'Database Design', 'Microservices', 'DevOps'
    ],
    'Mobile Development': [
      'React Native', 'Flutter', 'iOS/Swift',
      'Android/Kotlin', 'Mobile UI/UX', 'App Testing',
      'Cross-Platform Development', 'Mobile Security'
    ],
    'UI/UX Design': [
      'Figma', 'Adobe XD', 'Sketch', 'User Research',
      'Wireframing', 'Prototyping', 'Design Systems',
      'Visual Design', 'Interaction Design'
    ],
    'Data Science': [
      'Python', 'R', 'Machine Learning', 'Data Analysis',
      'Data Visualization', 'Deep Learning', 'NLP',
      'Statistical Analysis', 'Big Data'
    ],
    'DevOps': [
      'Docker', 'Kubernetes', 'AWS', 'CI/CD',
      'Jenkins', 'Git', 'Linux', 'Cloud Architecture',
      'Infrastructure as Code'
    ]
  };

  const handleSkillSelect = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const filteredTalent = mockTalent.filter(talent => {
    // Filter by skills
    if (selectedSkills.length > 0 && !talent.skills.some(skill => selectedSkills.includes(skill))) {
      return false;
    }
    
    // Filter by hourly rate
    if (talent.hourlyRate < filters.hourlyRate[0] || talent.hourlyRate > filters.hourlyRate[1]) {
      return false;
    }

    // Filter by availability
    if (filters.availability.length > 0 && !filters.availability.includes(talent.availability)) {
      return false;
    }

    // Filter by rating
    if (filters.rating > 0 && talent.rating < filters.rating) {
      return false;
    }

    // Filter by location
    if (filters.location.length > 0 && !filters.location.some(loc => talent.location.includes(loc))) {
      return false;
    }

    // Filter by languages
    if (filters.languages.length > 0 && !talent.languages.some(lang => filters.languages.includes(lang))) {
      return false;
    }

    return true;
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Find Expert Freelancers</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Connect with talented professionals ready to bring your projects to life
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by skill, title, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 text-white rounded-xl border border-gray-700/50 focus:border-code-green focus:ring-1 focus:ring-code-green focus:outline-none"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-gray-800/50 text-white rounded-xl border border-gray-700/50 hover:bg-gray-700/50 transition-colors"
            >
              <FiSliders className="w-5 h-5" />
              Advanced Filters
            </button>
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-6 bg-gray-800/50 rounded-xl border border-gray-700/50"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Hourly Rate */}
                  <div>
                    <label className="block text-white mb-2">Hourly Rate</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        min="0"
                        max={filters.hourlyRate[1]}
                        value={filters.hourlyRate[0]}
                        onChange={(e) => handleFilterChange('hourlyRate', [parseInt(e.target.value), filters.hourlyRate[1]])}
                        className="w-24 px-3 py-2 bg-gray-700/50 text-white rounded-lg"
                      />
                      <span className="text-gray-400">to</span>
                      <input
                        type="number"
                        min={filters.hourlyRate[0]}
                        value={filters.hourlyRate[1]}
                        onChange={(e) => handleFilterChange('hourlyRate', [filters.hourlyRate[0], parseInt(e.target.value)])}
                        className="w-24 px-3 py-2 bg-gray-700/50 text-white rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <label className="block text-white mb-2">Availability</label>
                    <div className="flex flex-wrap gap-2">
                      {availabilityOptions.map(option => (
                        <button
                          key={option}
                          onClick={() => {
                            const newAvailability = filters.availability.includes(option)
                              ? filters.availability.filter(a => a !== option)
                              : [...filters.availability, option];
                            handleFilterChange('availability', newAvailability);
                          }}
                          className={`px-3 py-1 rounded-full text-sm ${
                            filters.availability.includes(option)
                              ? 'bg-code-green text-gray-900'
                              : 'bg-gray-700/50 text-white'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <label className="block text-white mb-2">Languages</label>
                    <div className="flex flex-wrap gap-2">
                      {languageOptions.map(lang => (
                        <button
                          key={lang}
                          onClick={() => {
                            const newLanguages = filters.languages.includes(lang)
                              ? filters.languages.filter(l => l !== lang)
                              : [...filters.languages, lang];
                            handleFilterChange('languages', newLanguages);
                          }}
                          className={`px-3 py-1 rounded-full text-sm ${
                            filters.languages.includes(lang)
                              ? 'bg-code-green text-gray-900'
                              : 'bg-gray-700/50 text-white'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6 sticky top-24 space-y-8">
              <div>
                <h3 className="text-white font-medium mb-4">Skills Categories</h3>
                <div className="space-y-2">
                  {Object.keys(skillCategories).map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(activeCategory === category ? '' : category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        activeCategory === category
                          ? 'bg-code-green text-gray-900'
                          : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {activeCategory && (
                <div>
                  <h4 className="text-white font-medium mb-3">Popular {activeCategory} Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillCategories[activeCategory].map((skill) => (
                      <button
                        key={skill}
                        onClick={() => handleSkillSelect(skill)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedSkills.includes(skill)
                            ? 'bg-code-green text-gray-900'
                            : 'bg-gray-700/50 text-white hover:bg-gray-600/50'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected Skills */}
              {selectedSkills.length > 0 && (
                <div>
                  <h4 className="text-white font-medium mb-3">Selected Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-code-green text-gray-900 rounded-full text-sm flex items-center gap-1"
                      >
                        {skill}
                        <button
                          onClick={() => handleSkillSelect(skill)}
                          className="hover:text-red-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-white mb-2">Minimum Rating</label>
                <div className="flex items-center gap-2">
                  {[4, 4.5, 4.8].map(rating => (
                    <button
                      key={rating}
                      onClick={() => handleFilterChange('rating', rating)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                        filters.rating === rating
                          ? 'bg-code-green text-gray-900'
                          : 'bg-gray-700/50 text-white'
                      }`}
                    >
                      <FiStar className={filters.rating === rating ? 'text-gray-900' : 'text-yellow-500'} />
                      {rating}+
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-white mb-2">Location</label>
                <div className="space-y-2">
                  {locationOptions.map(loc => (
                    <button
                      key={loc}
                      onClick={() => {
                        const newLocations = filters.location.includes(loc)
                          ? filters.location.filter(l => l !== loc)
                          : [...filters.location, loc];
                        handleFilterChange('location', newLocations);
                      }}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm ${
                        filters.location.includes(loc)
                          ? 'bg-code-green text-gray-900'
                          : 'bg-gray-700/50 text-white'
                      }`}
                    >
                      <FiMapPin className="w-4 h-4" />
                      {loc}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Talent List */}
          <div className="lg:col-span-3">
            {/* Results Summary */}
            <div className="mb-6">
              <h3 className="text-white text-lg font-medium">
                {filteredTalent.length} Freelancers Found
                {selectedSkills.length > 0 && (
                  <span className="text-gray-400 text-sm">
                    {' '}matching your selected skills
                  </span>
                )}
              </h3>
            </div>

            <div className="space-y-6">
              {filteredTalent.map((talent) => (
                <motion.div
                  key={talent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6 hover:border-code-green/40 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Profile Info */}
                    <div className="flex gap-4 md:w-2/3">
                      <div className="relative">
                        <img
                          src={talent.avatar}
                          alt={talent.name}
                          className="w-16 h-16 rounded-full"
                        />
                        <div className="absolute -top-2 -right-2 bg-code-green text-gray-900 rounded-full p-1">
                          <FiCheck className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-medium">{talent.name}</h3>
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-code-green transition-colors">
                              <FiHeart className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-code-green transition-colors">
                              <FiMessageSquare className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">{talent.title}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <FiStar className="text-yellow-500" />
                            <span>{talent.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiMapPin className="text-gray-500" />
                            <span>{talent.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiDollarSign className="text-gray-500" />
                            <span>${talent.hourlyRate}/hr</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="md:w-1/3">
                      <div className="flex flex-wrap gap-4 text-sm mb-4">
                        <div className="flex items-center gap-1 text-gray-400">
                          <FiBriefcase />
                          <span>{talent.completedProjects} projects</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <FiAward />
                          <span>{talent.successRate}% success</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {talent.verificationBadges.map((badge, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-code-green/10 text-code-green rounded-full text-xs"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                      <button 
                        onClick={() => setSelectedTalent(talent)}
                        className="w-full px-4 py-2 bg-code-green text-gray-900 rounded-xl hover:bg-code-green/90 transition-colors"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-gray-400 text-sm mb-4">{talent.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {talent.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Portfolio Preview */}
                  {talent.portfolio && (
                    <div className="mt-6">
                      <h4 className="text-white text-sm font-medium mb-3">Recent Work</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {talent.portfolio.map((item, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-gray-900/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <span className="text-white text-sm">{item.title}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindTalent;
