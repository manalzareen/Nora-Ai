/**
 * Lightweight safe Python runtime simulator for educational debugging scenarios.
 * Capable of parsing basic Python statements, print calls, list indexing, type mismatches,
 * and producing realistic tracebacks for pedagogical feedback.
 */

export interface ExecutionResult {
  success: boolean;
  stdout: string;
  error?: {
    line: number;
    type: string;
    message: string;
    rawTraceback: string;
  };
}

export function simulatePythonExecution(code: string): ExecutionResult {
  const lines = code.split('\n');
  const stdoutBuffer: string[] = [];
  const variables: Record<string, any> = {};

  // Check for common syntax/indentation errors
  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();
    const lineNum = i + 1;

    if (!trimmed || trimmed.startsWith('#')) continue;

    // Check indentation after colons
    if (trimmed.endsWith(':')) {
      const nextLine = lines[i + 1];
      if (nextLine !== undefined && nextLine.trim() && !nextLine.startsWith(' ') && !nextLine.startsWith('\t')) {
        return {
          success: false,
          stdout: stdoutBuffer.join('\n'),
          error: {
            line: lineNum + 1,
            type: 'IndentationError',
            message: 'expected an indented block after statement on line ' + lineNum,
            rawTraceback: `File "main.py", line ${lineNum + 1}\n    ${nextLine.trim()}\n    ^\nIndentationError: expected an indented block`
          }
        };
      }
    }
  }

  // Pre-scan for custom known exercises to provide hyper-accurate feedback
  const lowerCode = code.toLowerCase();

  // Scenario 1: Index error in shopping cart (e.g. cart[len(cart)] or cart[3] when len is 3)
  if (lowerCode.includes('cart') && (lowerCode.includes('cart[len(cart)]') || lowerCode.includes('cart[3]'))) {
    const errorLineIndex = lines.findIndex(l => l.includes('cart[len(cart)]') || l.includes('cart[3]'));
    const lineNum = errorLineIndex !== -1 ? errorLineIndex + 1 : 4;
    return {
      success: false,
      stdout: stdoutBuffer.join('\n'),
      error: {
        line: lineNum,
        type: 'IndexError',
        message: 'list index out of range (remember lists are 0-indexed!)',
        rawTraceback: `Traceback (most recent call last):\n  File "main.py", line ${lineNum}, in <module>\n    last_item = cart[len(cart)]\nIndexError: list index out of range`
      }
    };
  }

  // Scenario 2: TypeError in temperature converter (e.g. "72" + 5 or temp_str + 32)
  if (lowerCode.includes('temp') && (lowerCode.includes('"72"') || lowerCode.includes("'72'")) && (code.includes('+ 32') || code.includes('* 9/5') || code.includes('- 32'))) {
    const errorLineIndex = lines.findIndex(l => (l.includes('+ 32') || l.includes('* 9/5') || l.includes('- 32')) && !l.includes('float(') && !l.includes('int('));
    if (errorLineIndex !== -1) {
      return {
        success: false,
        stdout: stdoutBuffer.join('\n'),
        error: {
          line: errorLineIndex + 1,
          type: 'TypeError',
          message: 'unsupported operand type(s) for -: \'str\' and \'int\'. Did you forget float() or int()?',
          rawTraceback: `Traceback (most recent call last):\n  File "main.py", line ${errorLineIndex + 1}, in <module>\n    celsius = (temp_f - 32) * 5 / 9\nTypeError: unsupported operand type(s) for -: 'str' and 'int'`
        }
      };
    }
  }

  // Scenario 3: Off-by-one / loop condition (e.g. range(1, 10) instead of range(1, 11) or while count > 0)
  if (lowerCode.includes('countdown') && lowerCode.includes('while') && lowerCode.includes('count >= 0') && !lowerCode.includes('count -= 1') && !lowerCode.includes('count = count - 1')) {
    const loopLine = lines.findIndex(l => l.includes('while'));
    return {
      success: false,
      stdout: stdoutBuffer.join('\n'),
      error: {
        line: loopLine !== -1 ? loopLine + 1 : 3,
        type: 'TimeoutError',
        message: 'Infinite loop detected! Variable \'count\' was never decremented inside the loop.',
        rawTraceback: `Traceback (most recent call last):\n  File "main.py", line ${loopLine !== -1 ? loopLine + 1 : 3}, in <module>\n    while count > 0:\nTimeoutError: Execution exceeded 2000ms safety limit`
      }
    };
  }

  // Scenario 4: KeyError in dictionary (e.g. user['phone'] when key doesn't exist)
  if (lowerCode.includes('user') && (code.includes("user['phone']") || code.includes('user["phone"]')) && !lowerCode.includes('.get(')) {
    const errorLineIndex = lines.findIndex(l => l.includes("['phone']") || l.includes('["phone"]'));
    return {
      success: false,
      stdout: stdoutBuffer.join('\n'),
      error: {
        line: errorLineIndex !== -1 ? errorLineIndex + 1 : 5,
        type: 'KeyError',
        message: '\'phone\': key does not exist in user profile dictionary. Consider user.get(\'phone\', \'Not provided\')',
        rawTraceback: `Traceback (most recent call last):\n  File "main.py", line ${errorLineIndex !== -1 ? errorLineIndex + 1 : 5}, in <module>\n    contact = user['phone']\nKeyError: 'phone'`
      }
    };
  }

  // General line-by-line interpreter simulation
  try {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const lineNum = i + 1;
      if (!line || line.startsWith('#')) continue;

      // Handle simple print statements: print(...)
      if (line.startsWith('print(') && line.endsWith(')')) {
        const inner = line.slice(6, -1).trim();
        // Check for formatted f-strings
        if (inner.startsWith('f"') || inner.startsWith("f'")) {
          const rawStr = inner.slice(2, -1);
          const interpolated = rawStr.replace(/\{([^}]+)\}/g, (_, expr) => {
            const trimmedExpr = expr.trim();
            if (variables[trimmedExpr] !== undefined) return String(variables[trimmedExpr]);
            try {
              // Safe evaluation of simple math
              return String(Function(`"use strict"; return (${trimmedExpr})`)());
            } catch {
              return `{${trimmedExpr}}`;
            }
          });
          stdoutBuffer.push(interpolated);
          continue;
        }

        // Check for comma-separated or string literal
        if ((inner.startsWith('"') && inner.endsWith('"')) || (inner.startsWith("'") && inner.endsWith("'"))) {
          stdoutBuffer.push(inner.slice(1, -1));
          continue;
        }

        // If variable or expression
        if (variables[inner] !== undefined) {
          stdoutBuffer.push(typeof variables[inner] === 'object' ? JSON.stringify(variables[inner]) : String(variables[inner]));
          continue;
        }

        // Try simple evaluation
        try {
          const evalResult = Function(...Object.keys(variables), `"use strict"; return (${inner});`)(...Object.values(variables));
          stdoutBuffer.push(typeof evalResult === 'object' ? JSON.stringify(evalResult) : String(evalResult));
          continue;
        } catch {
          stdoutBuffer.push(inner);
          continue;
        }
      }

      // Variable assignment: name = value
      const assignMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)$/);
      if (assignMatch) {
        const varName = assignMatch[1];
        const rawVal = assignMatch[2].trim();

        // String literal
        if ((rawVal.startsWith('"') && rawVal.endsWith('"')) || (rawVal.startsWith("'") && rawVal.endsWith("'"))) {
          variables[varName] = rawVal.slice(1, -1);
          continue;
        }

        // Numbers
        if (!isNaN(Number(rawVal))) {
          variables[varName] = Number(rawVal);
          continue;
        }

        // Booleans
        if (rawVal === 'True') { variables[varName] = true; continue; }
        if (rawVal === 'False') { variables[varName] = false; continue; }

        // Array literal
        if (rawVal.startsWith('[') && rawVal.endsWith(']')) {
          try {
            // standard JSON parse or simple split
            const cleaned = rawVal.replace(/'/g, '"');
            variables[varName] = JSON.parse(cleaned);
          } catch {
            variables[varName] = [];
          }
          continue;
        }

        // Float/int casting e.g. float(temp_f)
        const castMatch = rawVal.match(/^(float|int)\((.+)\)$/);
        if (castMatch) {
          const target = castMatch[2].trim();
          const sourceVal = variables[target] !== undefined ? variables[target] : target.replace(/['"]/g, '');
          variables[varName] = castMatch[1] === 'float' ? parseFloat(sourceVal) : parseInt(sourceVal, 10);
          continue;
        }

        // Expression evaluation with existing variables
        try {
          const res = Function(...Object.keys(variables), `"use strict"; return (${rawVal});`)(...Object.values(variables));
          variables[varName] = res;
        } catch {
          variables[varName] = rawVal;
        }
      }
    }

    return {
      success: true,
      stdout: stdoutBuffer.length > 0 ? stdoutBuffer.join('\n') : 'Program executed successfully with code 0 (no output produced).'
    };
  } catch (err: any) {
    return {
      success: false,
      stdout: stdoutBuffer.join('\n'),
      error: {
        line: 1,
        type: 'RuntimeError',
        message: err.message || 'Execution failed',
        rawTraceback: `Traceback (most recent call last):\n  File "main.py", line 1, in <module>\nRuntimeError: ${err.message}`
      }
    };
  }
}
