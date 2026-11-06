import { SupportedLanguage } from '../types';

export interface CodeExecutionResult {
  success: boolean;
  stdout: string;
  language: SupportedLanguage;
  error?: {
    line: number;
    type: string;
    message: string;
    rawTraceback: string;
  };
}

// In-memory SQL tables for sandbox query execution
const SQL_DATABASE: Record<string, any[]> = {
  students: [
    { id: 1, name: 'Sarah Chen', track: 'AI & Data', score: 94 },
    { id: 2, name: 'Alex Rivera', track: 'Full-Stack', score: 88 },
    { id: 3, name: 'Marcus Vance', track: 'Systems', score: 76 },
    { id: 4, name: 'Elena Rostova', track: 'AI & Data', score: 98 }
  ],
  orders: [
    { id: 101, student_id: 2, course: 'Python Masterclass', price: 49 },
    { id: 102, student_id: 1, course: 'Deep Learning with Nora', price: 99 },
    { id: 103, student_id: 4, course: 'Distributed Systems', price: 89 }
  ]
};

export function executeCode(code: string, language: SupportedLanguage = 'python'): CodeExecutionResult {
  const lines = code.split('\n');
  const stdoutBuffer: string[] = [];

  // ==================== SQL RUNNER ====================
  if (language === 'sql') {
    const cleanSql = code.trim().replace(/;$/, '');
    const upperSql = cleanSql.toUpperCase();

    if (!upperSql.startsWith('SELECT')) {
      return {
        success: false,
        stdout: '',
        language: 'sql',
        error: {
          line: 1,
          type: 'SyntaxError',
          message: 'Queries in this lab must begin with SELECT.',
          rawTraceback: 'SQL Error: Expected SELECT query block at beginning of script'
        }
      };
    }

    // Check for missing FROM clause
    if (!upperSql.includes('FROM')) {
      return {
        success: false,
        stdout: '',
        language: 'sql',
        error: {
          line: 1,
          type: 'SyntaxError',
          message: 'Missing FROM clause in query.',
          rawTraceback: 'SQL Error 1064: You have an error in your SQL syntax near FROM'
        }
      };
    }

    // Check table name
    if (upperSql.includes('FROM STUDENTS')) {
      let result = [...SQL_DATABASE.students];

      // WHERE filter
      if (upperSql.includes("TRACK = 'AI & DATA'") || upperSql.includes('TRACK="AI & DATA"')) {
        result = result.filter(s => s.track === 'AI & Data');
      } else if (upperSql.includes('SCORE > 90')) {
        result = result.filter(s => s.score > 90);
      }

      // ORDER BY
      if (upperSql.includes('ORDER BY SCORE DESC')) {
        result.sort((a, b) => b.score - a.score);
      }

      const tableRows = result.map(r => `| ${r.id} | ${r.name.padEnd(14)} | ${r.track.padEnd(10)} | ${r.score} |`).join('\n');
      const header = `| ID | Name           | Track      | Score |\n|----|----------------|------------|-------|\n${tableRows}\n\n(${result.length} rows returned in 1.4ms)`;

      return {
        success: true,
        stdout: header,
        language: 'sql'
      };
    }

    return {
      success: true,
      stdout: `| Result |\n|--------|\n| OK (0 rows affected) |`,
      language: 'sql'
    };
  }

  // ==================== JAVASCRIPT / TYPESCRIPT RUNNER ====================
  if (language === 'javascript' || language === 'typescript') {
    // Check for common JS traps
    if (code.includes('undefined.length') || (code.includes('user.profile.avatar') && !code.includes('user?.profile?.avatar'))) {
      const errLine = lines.findIndex(l => l.includes('user.profile.avatar')) + 1;
      return {
        success: false,
        stdout: '',
        language,
        error: {
          line: errLine || 3,
          type: 'TypeError',
          message: 'Cannot read properties of undefined (reading \'avatar\'). Use optional chaining (?.)',
          rawTraceback: `TypeError: Cannot read properties of undefined (reading 'avatar')\n    at getUserAvatar (main.js:${errLine || 3}:25)`
        }
      };
    }

    // Type coercion warning e.g. "5" + 3
    if (code.includes('"5" + 3') || code.includes("'5' + 3")) {
      return {
        success: true,
        stdout: `Console log: "53"\n[NORA NOTE]: JavaScript performed string concatenation instead of addition! Use Number("5") + 3 to get 8.`,
        language
      };
    }

    try {
      // Safe sandbox console capture
      const logs: string[] = [];
      const mockConsole = {
        log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
        error: (...args: any[]) => logs.push('[ERROR] ' + args.join(' ')),
        warn: (...args: any[]) => logs.push('[WARN] ' + args.join(' '))
      };

      // Strip basic typescript types for runner execution
      const strippedCode = code
        .replace(/:\s*(string|number|boolean|any|void|object|Promise<[^>]+>)/g, '')
        .replace(/as\s+[a-zA-Z0-9_]+/g, '');

      const runFn = new Function('console', strippedCode);
      runFn(mockConsole);

      return {
        success: true,
        stdout: logs.length > 0 ? logs.join('\n') : 'Code executed with code 0 (no console output).',
        language
      };
    } catch (err: any) {
      return {
        success: false,
        stdout: '',
        language,
        error: {
          line: 1,
          type: err.name || 'Error',
          message: err.message,
          rawTraceback: `${err.name}: ${err.message}\n    at evaluatedCode (script.js:1)`
        }
      };
    }
  }

  // ==================== C++ / GO RUNNER ====================
  if (language === 'cpp' || language === 'go') {
    if (code.includes('nullptr') || code.includes('nil pointer')) {
      return {
        success: false,
        stdout: '',
        language,
        error: {
          line: 4,
          type: 'SegmentationFault',
          message: 'Attempted to dereference a null pointer address 0x00000000',
          rawTraceback: `Signal: SIGSEGV (Segmentation fault)\nFaulting address: 0x0\nPC: 0x401140`
        }
      };
    }

    // Simulate standard binary execution
    return {
      success: true,
      stdout: `[Compiled & Executed via LLVM / Clang]\nProgram returned: 0\nMemory allocated: 2.1 MB\nExecution latency: 0.8ms`,
      language
    };
  }

  // ==================== PYTHON RUNNER (Default) ====================
  const lowerCode = code.toLowerCase();

  // Scenario 1: Index error
  if (lowerCode.includes('cart') && (lowerCode.includes('cart[len(cart)]') || lowerCode.includes('cart[3]'))) {
    const errorLineIndex = lines.findIndex(l => l.includes('cart[len(cart)]') || l.includes('cart[3]'));
    const lineNum = errorLineIndex !== -1 ? errorLineIndex + 1 : 5;
    return {
      success: false,
      stdout: stdoutBuffer.join('\n'),
      language: 'python',
      error: {
        line: lineNum,
        type: 'IndexError',
        message: 'list index out of range (remember lists are 0-indexed!)',
        rawTraceback: `Traceback (most recent call last):\n  File "main.py", line ${lineNum}, in <module>\n    last_item = cart[len(cart)]\nIndexError: list index out of range`
      }
    };
  }

  // Scenario 2: TypeError in temperature converter
  if (lowerCode.includes('temp') && (lowerCode.includes('"72"') || lowerCode.includes("'72'")) && (code.includes('+ 32') || code.includes('* 9/5') || code.includes('- 32'))) {
    const errorLineIndex = lines.findIndex(l => (l.includes('+ 32') || l.includes('* 9/5') || l.includes('- 32')) && !l.includes('float(') && !l.includes('int('));
    if (errorLineIndex !== -1) {
      return {
        success: false,
        stdout: stdoutBuffer.join('\n'),
        language: 'python',
        error: {
          line: errorLineIndex + 1,
          type: 'TypeError',
          message: 'unsupported operand type(s) for -: \'str\' and \'int\'. Did you forget float() or int()?',
          rawTraceback: `Traceback (most recent call last):\n  File "main.py", line ${errorLineIndex + 1}, in <module>\n    celsius = (temp_f - 32) * 5 / 9\nTypeError: unsupported operand type(s) for -: 'str' and 'int'`
        }
      };
    }
  }

  // Scenario 3: Off-by-one / loop timeout
  if (lowerCode.includes('countdown') && lowerCode.includes('while') && lowerCode.includes('count > 0') && !lowerCode.includes('count -= 1') && !lowerCode.includes('count = count - 1')) {
    const loopLine = lines.findIndex(l => l.includes('while'));
    return {
      success: false,
      stdout: stdoutBuffer.join('\n'),
      language: 'python',
      error: {
        line: loopLine !== -1 ? loopLine + 1 : 4,
        type: 'TimeoutError',
        message: 'Infinite loop detected! Variable \'count\' was never decremented inside the loop.',
        rawTraceback: `Traceback (most recent call last):\n  File "main.py", line ${loopLine !== -1 ? loopLine + 1 : 4}, in <module>\n    while count > 0:\nTimeoutError: Execution exceeded 2000ms safety limit`
      }
    };
  }

  // Scenario 4: KeyError
  if (lowerCode.includes('user') && (code.includes("user['phone']") || code.includes('user["phone"]')) && !lowerCode.includes('.get(')) {
    const errorLineIndex = lines.findIndex(l => l.includes("['phone']") || l.includes('["phone"]'));
    return {
      success: false,
      stdout: stdoutBuffer.join('\n'),
      language: 'python',
      error: {
        line: errorLineIndex !== -1 ? errorLineIndex + 1 : 9,
        type: 'KeyError',
        message: '\'phone\': key does not exist in user profile dictionary. Consider user.get(\'phone\', \'Not provided\')',
        rawTraceback: `Traceback (most recent call last):\n  File "main.py", line ${errorLineIndex !== -1 ? errorLineIndex + 1 : 9}, in <module>\n    contact = user['phone']\nKeyError: 'phone'`
      }
    };
  }

  // General Python statements interpreter
  try {
    const variables: Record<string, any> = {};
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.startsWith('#')) continue;

      if (line.startsWith('print(') && line.endsWith(')')) {
        const inner = line.slice(6, -1).trim();
        if (inner.startsWith('f"') || inner.startsWith("f'")) {
          const rawStr = inner.slice(2, -1);
          const interpolated = rawStr.replace(/\{([^}]+)\}/g, (_, expr) => {
            const trimmedExpr = expr.trim();
            if (variables[trimmedExpr] !== undefined) return String(variables[trimmedExpr]);
            try {
              return String(Function(`"use strict"; return (${trimmedExpr})`)());
            } catch {
              return `{${trimmedExpr}}`;
            }
          });
          stdoutBuffer.push(interpolated);
          continue;
        }

        if ((inner.startsWith('"') && inner.endsWith('"')) || (inner.startsWith("'") && inner.endsWith("'"))) {
          stdoutBuffer.push(inner.slice(1, -1));
          continue;
        }

        if (variables[inner] !== undefined) {
          stdoutBuffer.push(typeof variables[inner] === 'object' ? JSON.stringify(variables[inner]) : String(variables[inner]));
          continue;
        }

        try {
          const evalResult = Function(...Object.keys(variables), `"use strict"; return (${inner});`)(...Object.values(variables));
          stdoutBuffer.push(typeof evalResult === 'object' ? JSON.stringify(evalResult) : String(evalResult));
          continue;
        } catch {
          stdoutBuffer.push(inner);
          continue;
        }
      }

      // Variable assignment
      const assignMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)$/);
      if (assignMatch) {
        const varName = assignMatch[1];
        const rawVal = assignMatch[2].trim();

        if ((rawVal.startsWith('"') && rawVal.endsWith('"')) || (rawVal.startsWith("'") && rawVal.endsWith("'"))) {
          variables[varName] = rawVal.slice(1, -1);
          continue;
        }
        if (!isNaN(Number(rawVal))) {
          variables[varName] = Number(rawVal);
          continue;
        }
        if (rawVal === 'True') { variables[varName] = true; continue; }
        if (rawVal === 'False') { variables[varName] = false; continue; }

        if (rawVal.startsWith('[') && rawVal.endsWith(']')) {
          try {
            variables[varName] = JSON.parse(rawVal.replace(/'/g, '"'));
          } catch {
            variables[varName] = [];
          }
          continue;
        }

        const castMatch = rawVal.match(/^(float|int)\((.+)\)$/);
        if (castMatch) {
          const target = castMatch[2].trim();
          const sourceVal = variables[target] !== undefined ? variables[target] : target.replace(/['"]/g, '');
          variables[varName] = castMatch[1] === 'float' ? parseFloat(sourceVal) : parseInt(sourceVal, 10);
          continue;
        }

        try {
          variables[varName] = Function(...Object.keys(variables), `"use strict"; return (${rawVal});`)(...Object.values(variables));
        } catch {
          variables[varName] = rawVal;
        }
      }
    }

    return {
      success: true,
      stdout: stdoutBuffer.length > 0 ? stdoutBuffer.join('\n') : 'Program executed successfully with code 0.',
      language: 'python'
    };
  } catch (err: any) {
    return {
      success: false,
      stdout: stdoutBuffer.join('\n'),
      language: 'python',
      error: {
        line: 1,
        type: 'RuntimeError',
        message: err.message || 'Execution failed',
        rawTraceback: `Traceback (most recent call last):\n  File "main.py", line 1, in <module>\nRuntimeError: ${err.message}`
      }
    };
  }
}
