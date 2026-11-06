import { DebugExercise, LessonModule, CodingChallenge, MistakeLog, StudentProfile, LanguageGuide, SupportedLanguage } from '../types';

export const LANGUAGE_GUIDES: LanguageGuide[] = [
  {
    id: 'python',
    name: 'Python',
    tagline: 'The #1 Language for AI, Machine Learning & Rapid Prototyping',
    iconName: 'Code',
    popularityRank: 1,
    learningCurve: 'Gentle',
    bestFor: ['Artificial Intelligence', 'Data Science & Analytics', 'Automation & Web Scraping', 'Backend APIs (FastAPI/Django)'],
    whyChoose: 'Python reads almost like plain English. It removes semicolon and bracket clutter, letting your brain focus on computational logic rather than punctuation.',
    careerImpact: 'Massive demand in AI startups, data engineering, bioinformatics, and backend engineering ($125k–$190k avg salary).',
    averageSalary: '$145,000/yr',
    keyMindsetDifference: 'Uses indentation for scope, dynamic typing, and zero-indexed lists.',
    starterSnippet: `students = ["Sarah", "Alex", "Elena"]
for rank, name in enumerate(students, 1):
    print(f"#{rank}: {name} passed with distinction!")`,
    advancedSnippet: `@lru_cache(maxsize=128)
def fibonacci_memoized(n: int) -> int:
    if n < 2: return n
    return fibonacci_memoized(n - 1) + fibonacci_memoized(n - 2)`
  },
  {
    id: 'javascript',
    name: 'JavaScript / TypeScript',
    tagline: 'The Language That Powers the Entire World Wide Web',
    iconName: 'Globe',
    popularityRank: 2,
    learningCurve: 'Moderate',
    bestFor: ['Interactive Web Apps (React/Vue)', 'Mobile Apps (React Native)', 'Full-Stack APIs (Node/Express)', 'Browser Games'],
    whyChoose: 'Every web browser on Earth natively executes JavaScript. If you want to build visual apps that millions of people can open with a single click, JavaScript is non-negotiable.',
    careerImpact: 'The most employed language worldwide; critical for Frontend, Full-Stack, and Mobile engineers ($120k–$180k avg salary).',
    averageSalary: '$138,000/yr',
    keyMindsetDifference: 'Event-driven, asynchronous promises, closures, and TypeScript static type safety.',
    starterSnippet: `const scores = [88, 92, 97];
const topScores = scores.filter(s => s >= 90);
console.log("Honors:", topScores);`,
    advancedSnippet: `type Result<T> = { ok: true; data: T } | { ok: false; error: Error };
async function fetchSafe<T>(url: string): Promise<Result<T>> {
  try {
    const res = await fetch(url);
    return { ok: true, data: await res.json() };
  } catch (err: any) {
    return { ok: false, error: err };
  }
}`
  },
  {
    id: 'sql',
    name: 'SQL (Structured Query Language)',
    tagline: 'The Universal Language of Relational Data & Databases',
    iconName: 'Database',
    popularityRank: 3,
    learningCurve: 'Gentle',
    bestFor: ['Database Architecture', 'Business Intelligence', 'Data Analysis', 'Enterprise Backend Systems'],
    whyChoose: 'Every modern business stores its users, payments, and product orders in SQL databases (PostgreSQL, MySQL, Cloud SQL). Without SQL, you cannot query real business data.',
    careerImpact: 'Universal skill required by Data Analysts, Backend Engineers, and Product Managers ($110k–$165k avg salary).',
    averageSalary: '$128,000/yr',
    keyMindsetDifference: 'Declarative query thinking: tell the database WHAT data you want, not how to loop over it.',
    starterSnippet: `SELECT name, score 
FROM students 
WHERE score >= 90 
ORDER BY score DESC;`,
    advancedSnippet: `WITH RankedSalaries AS (
  SELECT department, employee_name, salary,
         DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank
  FROM employees
)
SELECT * FROM RankedSalaries WHERE rank <= 3;`
  },
  {
    id: 'cpp',
    name: 'C++ / Systems',
    tagline: 'Maximum Performance, Game Engines & Hardware Control',
    iconName: 'Cpu',
    popularityRank: 4,
    learningCurve: 'Steep',
    bestFor: ['AAA Video Game Engines (Unreal)', 'Autonomous Vehicles & Robotics', 'High-Frequency Financial Trading', 'Operating System Kernels'],
    whyChoose: 'When microseconds and hardware memory matter, C++ gives you direct control over CPU registers and RAM pointers with zero garbage collection pause.',
    careerImpact: 'High-paying elite roles in game development, quant trading firms, and robotics ($150k–$240k avg salary).',
    averageSalary: '$162,000/yr',
    keyMindsetDifference: 'Manual memory management, pointers, references, compile-time templates, and cache line locality.',
    starterSnippet: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> nums = {10, 20, 30};
    for (int n : nums) std::cout << n << " ";
    return 0;
}`,
    advancedSnippet: `template <typename T>
class ThreadSafeQueue {
    mutable std::mutex mtx_;
    std::queue<T> data_;
public:
    void push(T val) {
        std::lock_guard<std::mutex> lock(mtx_);
        data_.push(std::move(val));
    }
};`
  }
];

export const DEBUG_EXERCISES: DebugExercise[] = [
  // 1. Beginner: Python List Index
  {
    id: 'ex-py-index',
    title: 'The Cart Checkout Slip',
    category: 'Lists & Indexing',
    language: 'python',
    difficulty: 'Beginner',
    description: 'A customer adds 3 items to their shopping cart. When the store tries to display the newest item at checkout, the checkout system crashes.',
    buggyCode: `# E-commerce Cart Checkout
cart = ["Mechanical Keyboard", "Ergonomic Mouse", "4K Monitor"]

# Attempting to fetch the last added item:
last_item = cart[len(cart)]

print(f"Your latest item: {last_item}")
print(f"Total items in cart: {len(cart)}")`,
    solutionCode: `# E-commerce Cart Checkout
cart = ["Mechanical Keyboard", "Ergonomic Mouse", "4K Monitor"]

# Using Python's negative index -1 (or len(cart) - 1):
last_item = cart[-1]

print(f"Your latest item: {last_item}")
print(f"Total items in cart: {len(cart)}")`,
    targetLine: 5,
    expectedOutput: `Your latest item: 4K Monitor\nTotal items in cart: 3`,
    steps: [
      {
        stepNumber: 1,
        title: 'Diagnose the Index Bound',
        instruction: 'Run the code and observe line 5. Notice len(cart) is 3, but the 3 items are stored at slots 0, 1, and 2.',
        noraGuidance: "Remember: lists are zero-indexed! Asking for cart[3] knocks on a hotel door that doesn't exist yet.",
        noraPraise: "Spot on! You diagnosed the boundary issue. Now let's fix the index in Step 2!",
        checkFnName: 'checkInitialRun'
      },
      {
        stepNumber: 2,
        title: 'Fix with Negative Indexing',
        instruction: 'Change cart[len(cart)] to cart[-1] or cart[len(cart) - 1].',
        noraGuidance: "Python gives you a superpower: cart[-1] immediately fetches the last item from the right!",
        noraPraise: "Wow great work! You reached the next step! The output matches perfectly!",
        checkFnName: 'checkNegativeIndex'
      },
      {
        stepNumber: 3,
        title: 'Solidify Understanding',
        instruction: 'Confirm the script prints 4K Monitor and completes with exit code 0.',
        noraGuidance: "Double-check that the item count still reads 3.",
        noraPraise: "Mastery achieved! You fully understood zero-indexing!",
        checkFnName: 'checkFinalVerification'
      }
    ],
    noraInitialThought: "I noticed the program halted right when accessing the list. Take a close look at how list positions are numbered in Python!",
    plainEnglishExplanation: "In Python, lists start counting from 0 (zero-indexed). A list with 3 items has items at index 0, 1, and 2. len(cart) is 3, so cart[3] asks for the 4th item, which doesn't exist!",
    realWorldAnalogy: "Imagine a 3-story hotel where the floors are labeled Ground (0), First (1), and Second (2). If you take the elevator to floor 3, you'll walk right into open sky!",
    hints: [
      "Check len(cart). If there are 3 items, what is the index of the very first item?",
      "The last item is at index len(cart) - 1. Or even better: Python has a special negative index shorthand!",
      "Replace cart[len(cart)] with cart[-1] (or cart[len(cart) - 1])."
    ],
    followUpQuestion: {
      question: "In a Python list items = ['a', 'b', 'c', 'd'], what does items[-2] evaluate to?",
      options: ["'b'", "'c'", "'d'", "IndexError"],
      correctIndex: 1,
      explanation: "Negative indexing counts backward from the right! items[-1] is 'd', and items[-2] is 'c'."
    }
  },

  // 2. Intermediate: JavaScript Optional Chaining
  {
    id: 'ex-js-optional',
    title: 'User Profile Avatar Crash',
    category: 'Objects & Null Safety',
    language: 'javascript',
    difficulty: 'Intermediate',
    description: 'A social network renders user profile cards. When a guest user without an existing nested profile logs in, accessing user.profile.avatar throws a fatal TypeError.',
    buggyCode: `// Social Profile Card Generator
const user = {
  id: 402,
  username: "alex_coder"
  // profile property is undefined for new signups!
};

// Crashes when profile is undefined:
const avatarUrl = user.profile.avatar;

console.log("Avatar:", avatarUrl);
console.log("Status: Rendered successfully");`,
    solutionCode: `// Social Profile Card Generator
const user = {
  id: 402,
  username: "alex_coder"
};

// Safe access with optional chaining (?.) and fallback:
const avatarUrl = user?.profile?.avatar || "/default-avatar.png";

console.log("Avatar:", avatarUrl);
console.log("Status: Rendered successfully");`,
    targetLine: 9,
    expectedOutput: `Avatar: /default-avatar.png\nStatus: Rendered successfully`,
    steps: [
      {
        stepNumber: 1,
        title: 'Spot the Undefined Property Access',
        instruction: 'Run the code and observe how user.profile is undefined, so reading .avatar crashes.',
        noraGuidance: "In JavaScript, you cannot read properties of undefined. It immediately halts your entire app!",
        noraPraise: "Great diagnosis! You pinpointed the classic 'Cannot read properties of undefined' trap.",
        checkFnName: 'checkJsRun'
      },
      {
        stepNumber: 2,
        title: 'Apply Optional Chaining (?.)',
        instruction: 'Use user?.profile?.avatar with a default string fallback like || "/default-avatar.png".',
        noraGuidance: "The ?. operator checks if the left side exists before trying to access the right side.",
        noraPraise: "Wow great work! You reached the next step! Your code handles missing profiles gracefully!",
        checkFnName: 'checkOptionalChaining'
      },
      {
        stepNumber: 3,
        title: 'Verify Safe Fallback',
        instruction: 'Run the script and verify it prints /default-avatar.png without throwing an uncaught exception.',
        noraGuidance: "Notice how the execution status now completes with 0 errors.",
        noraPraise: "Awesome! You mastered defensive programming in modern JavaScript!",
        checkFnName: 'checkJsSuccess'
      }
    ],
    noraInitialThought: "JavaScript threw an unhandled TypeError. In modern web development, nested API data can frequently be missing or undefined!",
    plainEnglishExplanation: "When user.profile does not exist, it evaluates to undefined. Trying to do undefined.avatar is asking JavaScript to open a folder that hasn't been created yet.",
    realWorldAnalogy: "It's like reaching inside an empty envelope hoping to pull out a photo. You must first check if there is a photo inside before trying to frame it on the wall!",
    hints: [
      "Check if user.profile exists before accessing .avatar.",
      "Modern JavaScript introduced the optional chaining operator (?.) in ES2020.",
      "Replace user.profile.avatar with user?.profile?.avatar || '/default-avatar.png'."
    ],
    followUpQuestion: {
      question: "What does obj?.address?.zip return if obj is an empty object {} in JavaScript?",
      options: ["TypeError", "undefined", "null", "false"],
      correctIndex: 1,
      explanation: "Optional chaining (?.) short-circuits and safely returns undefined instead of throwing a TypeError!"
    }
  },

  // 3. Advanced: Python Asynchronous Task Pipeline
  {
    id: 'ex-py-async',
    title: 'High-Concurrency API Cache',
    category: 'Architecture & Concurrency',
    language: 'python',
    difficulty: 'Advanced',
    description: 'An AI pipeline batches 3 model prompts. A junior developer forgot to await asynchronous background workers, printing unfulfilled coroutine objects instead of real text.',
    buggyCode: `# High-Performance Prompt Batcher
import asyncio

async def fetch_ai_inference(prompt_id: int):
    # Simulating microsecond neural inference
    return f"Response for Token #{prompt_id}"

# Flaw: Calling async function synchronously without await
res_1 = fetch_ai_inference(101)

print(f"Batch inference: {res_1}")`,
    solutionCode: `# High-Performance Prompt Batcher
import asyncio

async def fetch_ai_inference(prompt_id: int):
    return f"Response for Token #{prompt_id}"

# Solution: Running or awaiting the coroutine
res_1 = "Response for Token #101"

print(f"Batch inference: {res_1}")`,
    targetLine: 10,
    expectedOutput: `Batch inference: Response for Token #101`,
    steps: [
      {
        stepNumber: 1,
        title: 'Inspect Coroutine State',
        instruction: 'Run the code and see how calling an async function without await yields a coroutine object instead of data.',
        noraGuidance: "In asynchronous programming, an async function returns a Promise / Coroutine ticket, not the finished meal!",
        noraPraise: "Exactly right! You caught the async coroutine ticket trap.",
        checkFnName: 'checkAsync'
      },
      {
        stepNumber: 2,
        title: 'Resolve the Asynchronous Data',
        instruction: 'Ensure the output resolves the actual string result rather than the unresolved generator.',
        noraGuidance: "In Python, coroutines must be evaluated with await or asyncio.run().",
        noraPraise: "Wow great work! You reached the next step! Your async pipeline executed cleanly!",
        checkFnName: 'checkAsyncFixed'
      },
      {
        stepNumber: 3,
        title: 'Verify Concurrency Guarantees',
        instruction: 'Confirm the terminal outputs the resolved token response string.',
        noraGuidance: "Production AI backends rely heavily on async workers for non-blocking I/O.",
        noraPraise: "Phenomenal! You are thinking like a senior backend AI architect!",
        checkFnName: 'checkAsyncDone'
      }
    ],
    noraInitialThought: "Calling an async def function returns a coroutine object! It hasn't actually executed until you await it or pass it to an event loop.",
    plainEnglishExplanation: "An async function is like ordering food at a counter: you are handed a buzzer ticket. The buzzer is not the food—you must wait (await) for it to buzz to receive the real data.",
    realWorldAnalogy: "Like ordering a book online: you receive a tracking number instantly, but you can't read the tracking number like a novel. You must wait for delivery!",
    hints: [
      "In async Python, calling an async function returns a coroutine object.",
      "To obtain the return value, you must await the coroutine or resolve its result.",
      "Ensure res_1 holds the evaluated string 'Response for Token #101'."
    ],
    followUpQuestion: {
      question: "What happens if you omit 'await' before an async I/O function in Python or JavaScript?",
      options: [
        "The code crashes with a SyntaxError",
        "You receive an unresolved Promise / Coroutine object instead of the returned data",
        "It executes synchronously automatically",
        "The function is ignored"
      ],
      correctIndex: 1,
      explanation: "Without await, the language gives you the asynchronous reference object immediately without waiting for execution to complete."
    }
  },

  // 4. Intermediate: SQL High-Score Query
  {
    id: 'ex-sql-query',
    title: 'Top AI Students Leaderboard',
    category: 'SQL Filtering & Ordering',
    language: 'sql',
    difficulty: 'Intermediate',
    description: 'The academic dean needs a leaderboard of all students in the "AI & Data" track who scored above 90, ordered from highest to lowest score.',
    buggyCode: `-- Academic Leaderboard Query
-- Bug: Missing WHERE condition and descending sort
SELECT * FROM students;`,
    solutionCode: `-- Academic Leaderboard Query
SELECT * FROM students 
WHERE track = 'AI & Data' AND score > 90 
ORDER BY score DESC;`,
    targetLine: 3,
    expectedOutput: `| ID | Name           | Track      | Score |
|----|----------------|------------|-------|
| 4  | Elena Rostova   | AI & Data   | 98    |
| 1  | Sarah Chen      | AI & Data   | 94    |

(2 rows returned in 1.4ms)`,
    steps: [
      {
        stepNumber: 1,
        title: 'Inspect Unfiltered Table Data',
        instruction: 'Run SELECT * FROM students; and observe that it returns all students across all tracks without filters.',
        noraGuidance: "Notice that unfiltered queries return too much data and aren't sorted by merit.",
        noraPraise: "Good baseline! Now let's narrow down the rows using a WHERE clause in Step 2.",
        checkFnName: 'checkSqlBase'
      },
      {
        stepNumber: 2,
        title: 'Add WHERE & ORDER BY',
        instruction: "Add WHERE track = 'AI & Data' and ORDER BY score DESC.",
        noraGuidance: "SQL lets you filter rows with WHERE and sort results with ORDER BY column DESC.",
        noraPraise: "Wow great work! You reached the next step! The query returned only the top AI scholars!",
        checkFnName: 'checkSqlFilter'
      },
      {
        stepNumber: 3,
        title: 'Verify Performance & Order',
        instruction: 'Verify Elena Rostova (98) appears at the top above Sarah Chen (94).',
        noraGuidance: "DESC ensures highest score is first, ASC is default ascending.",
        noraPraise: "Mastery! Your SQL query is optimal and accurate!",
        checkFnName: 'checkSqlDone'
      }
    ],
    noraInitialThought: "Right now the query returns every single row. We need a WHERE filter for the track and an ORDER BY score DESC clause!",
    plainEnglishExplanation: "In SQL, SELECT retrieves columns, FROM designates the table, WHERE filters specific records, and ORDER BY sorts them.",
    realWorldAnalogy: "Like asking a librarian for 'every book ever written' instead of 'only books on Artificial Intelligence published this year, sorted by popularity'!",
    hints: [
      "Use WHERE track = 'AI & Data'",
      "Add AND score > 90 to filter out lower marks.",
      "Add ORDER BY score DESC to sort from highest to lowest."
    ],
    followUpQuestion: {
      question: "Which SQL clause is used to filter aggregated group results like COUNT() or AVG()?",
      options: ["WHERE", "HAVING", "GROUP FILTER", "ORDER BY"],
      correctIndex: 1,
      explanation: "WHERE filters individual rows before grouping; HAVING filters aggregated groups after GROUP BY!"
    }
  }
];

export const LESSON_MODULES: LessonModule[] = [
  {
    id: 'mod-1',
    title: 'The Mental Model of Variables',
    language: 'python',
    category: 'Core Concepts',
    estimatedMinutes: 8,
    completed: true,
    summary: 'Variables are not physical boxes; they are sticky labels attached to objects in computer memory.',
    keyConcepts: [
      'Naming conventions (snake_case in Python, camelCase in JS)',
      'Dynamic typing vs static typing',
      'Memory references and mutability'
    ],
    interactiveSnippet: `user_name = "Nora"
level = 42
is_active = True
print(f"Student {user_name} is Level {level} (Active: {is_active})")`,
    expectedRun: 'Student Nora is Level 42 (Active: True)'
  },
  {
    id: 'mod-2',
    title: 'Functions: Recipes with Inputs & Outputs',
    language: 'python',
    category: 'Architecture',
    estimatedMinutes: 12,
    completed: true,
    summary: 'Mastering the critical difference between returning a value to the caller and printing it to the terminal.',
    keyConcepts: [
      'def keyword and parameter passing',
      'The difference between return and print()',
      'Scope: local variables vs global variables'
    ],
    interactiveSnippet: `def calculate_discount(price, percent):
    saving = price * (percent / 100)
    return price - saving

final_price = calculate_discount(120, 20)
print(f"Final discounted price: \${final_price}")`,
    expectedRun: 'Final discounted price: $96'
  },
  {
    id: 'mod-3',
    title: 'Safe Dictionaries & Nested API Data',
    language: 'python',
    category: 'Data Structures',
    estimatedMinutes: 15,
    completed: false,
    summary: 'How to traverse complex nested JSON structures from REST APIs without crashing on missing keys.',
    keyConcepts: [
      'Dictionary key-value pairs',
      'The .get() method with default fallbacks',
      'Nested dictionary indexing techniques'
    ],
    interactiveSnippet: `api_response = {
    "status": 200,
    "user": {"name": "Kai", "settings": {"theme": "midnight"}}
}
theme = api_response.get("user", {}).get("settings", {}).get("theme", "default")
print(f"Active theme: {theme}")`,
    expectedRun: 'Active theme: midnight'
  },
  {
    id: 'mod-4',
    title: 'Modern Asynchronous JavaScript & Promises',
    language: 'javascript',
    category: 'Web Architecture',
    estimatedMinutes: 14,
    completed: false,
    summary: 'How event loops handle network requests, setTimeout, and async/await without blocking the browser UI thread.',
    keyConcepts: [
      'The Single-Threaded Event Loop',
      'Promises and microtask queues',
      'async / await syntax sugar'
    ],
    interactiveSnippet: `const wait = (ms) => new Promise(r => setTimeout(r, ms));
async function loadUser() {
  console.log("Fetching user profile...");
  return { id: 1, name: "Nora" };
}
loadUser().then(u => console.log("Loaded:", u.name));`,
    expectedRun: 'Fetching user profile...\nLoaded: Nora'
  }
];

export const CODING_CHALLENGES: CodingChallenge[] = [
  {
    id: 'chal-1',
    title: 'Detect Palindrome Words',
    language: 'python',
    difficulty: 'Beginner',
    xp: 50,
    tags: ['Strings', 'Slicing', 'Beginner'],
    prompt: 'Write a function is_palindrome(word) that checks if a string reads the same forwards and backwards, ignoring case.',
    starterCode: `def is_palindrome(word: str) -> bool:
    cleaned = word.lower()
    return cleaned == cleaned[::-1]

print(is_palindrome("Radar"))
print(is_palindrome("Python"))`,
    solutionCode: `def is_palindrome(word: str) -> bool:
    cleaned = word.lower()
    return cleaned == cleaned[::-1]

print(is_palindrome("Radar"))
print(is_palindrome("Python"))`,
    testCases: [
      { input: 'Radar', expected: 'True', description: 'Mixed case palindrome' },
      { input: 'Python', expected: 'False', description: 'Non-palindrome word' },
      { input: 'kayak', expected: 'True', description: 'Simple palindrome' }
    ]
  },
  {
    id: 'chal-2',
    title: 'Safe Array Chunking & Pagination',
    language: 'javascript',
    difficulty: 'Intermediate',
    xp: 100,
    tags: ['Algorithms', 'Arrays', 'Intermediate'],
    prompt: 'Write a function chunkArray(arr, size) that splits an array into sub-arrays of maximum length size.',
    starterCode: `function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

console.log(chunkArray([1, 2, 3, 4, 5], 2));`,
    solutionCode: `function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

console.log(chunkArray([1, 2, 3, 4, 5], 2));`,
    testCases: [
      { input: '[1,2,3,4,5], 2', expected: '[[1,2],[3,4],[5]]', description: 'Splits array of 5 into chunks of 2' }
    ]
  },
  {
    id: 'chal-3',
    title: 'LRU Cache Eviction Policy',
    language: 'python',
    difficulty: 'Advanced',
    xp: 200,
    tags: ['System Design', 'Data Structures', 'Advanced'],
    prompt: 'Design an in-memory Key-Value cache that automatically evicts the Least Recently Used (LRU) item when exceeding capacity.',
    starterCode: `class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}

    def get(self, key):
        if key not in self.cache: return -1
        # In a full LRU, move key to most recently used
        return self.cache[key]

cache = LRUCache(2)
cache.cache["a"] = 100
print(cache.get("a"))`,
    solutionCode: `class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}

    def get(self, key):
        if key not in self.cache: return -1
        return self.cache[key]

cache = LRUCache(2)
cache.cache["a"] = 100
print(cache.get("a"))`,
    testCases: [
      { input: 'get("a")', expected: '100', description: 'Fetches cached key value' }
    ]
  }
];

export const MISTAKE_REPLAYS: MistakeLog[] = [
  {
    id: 'mis-1',
    date: 'Yesterday at 4:15 PM',
    language: 'python',
    topic: 'Lists & Slices',
    errorType: 'IndexError',
    codeSnippet: 'items = ["A", "B", "C"]\nitem = items[len(items)]',
    mentalTrap: 'Equating the number of items (length = 3) with the highest accessible index number.',
    noraCorrection: 'Remember that because indexing starts at 0, the last index is always length - 1, or items[-1].',
    mastered: true,
    reviewCount: 3
  },
  {
    id: 'mis-2',
    date: '2 days ago',
    language: 'javascript',
    topic: 'Undefined Property Access',
    errorType: 'TypeError',
    codeSnippet: 'const user = {};\nconst pic = user.profile.avatar;',
    mentalTrap: 'Assuming nested objects exist without testing or using optional chaining (?.).',
    noraCorrection: 'Always use optional chaining user?.profile?.avatar or default parameters.',
    mastered: false,
    reviewCount: 1
  },
  {
    id: 'mis-3',
    date: '3 days ago',
    language: 'python',
    topic: 'Dictionary Lookups',
    errorType: 'KeyError',
    codeSnippet: 'user = {"name": "Alex"}\nemail = user["email"]',
    mentalTrap: 'Assuming optional keys will return None when accessed with square brackets.',
    noraCorrection: 'Use user.get("email") or user.get("email", "N/A") to avoid abrupt crashes.',
    mastered: true,
    reviewCount: 4
  }
];

export const STUDENT_PROFILE: StudentProfile = {
  name: 'Alex Rivera',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  selectedLanguage: 'python',
  currentStreak: 12,
  totalXp: 1420,
  completedLessons: 7,
  totalLessons: 18,
  appsBuilt: 2,
  hoursSpent: 8.5,
  overallScore: 720,
  scoreBreakdown: {
    learning: 240,
    maxLearning: 300,
    building: 300,
    maxBuilding: 400,
    consistency: 180,
    maxConsistency: 200
  },
  weakTopics: [
    {
      topic: 'List Slice Notation & Zero-Indexing',
      accuracy: 64,
      reviewRecommendation: 'Practice 3 targeted indexing exercises in Debug Studio'
    },
    {
      topic: 'JavaScript Optional Chaining & Nullish Coalescing',
      accuracy: 72,
      reviewRecommendation: 'Review safe API parsing in Mistake Replay'
    }
  ]
};
