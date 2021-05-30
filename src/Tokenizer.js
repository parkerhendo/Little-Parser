/**
 * Tokenizer Spec.
 */
const Spec = [
  // -----------------------------------------------
  // Whitespaces:

  [/^\s+/, null],

  // -----------------------------------------------
  // Comments:

  // Skip single-line comments:
  [/^\/\/.*/, null],
  // Skip multi-line comments:
  [/^\/\*[\s\S]*?\*\//, null],

  // -----------------------------------------------
  // Numbers:
  
  [/^\d+/, 'NUMBER'],

  // -----------------------------------------------
  // Strings:
  
  [/"[^"]*"/, 'STRING'],
  [/'[^']*'/, 'STRING'],
];

/**
 * Tokenizer class.
 * 
 * Lazily pulls a token from a stream
 */

class Tokenizer {
  /**
  * Initalizes the string.
  */
  init(string) {
    this._string = string;
    this._cursor = 0;
  }

  /**
   * Whether the tokenizer has reached EOF
   */
  isEOF() {
    return this._cursor === this._string.length;
  }

   /**
    * Whether we still have more tokens.
    */
  hasMoreTokens() {
    return this._cursor < this._string.length;
  }

  /**
  * Obtains next token.
  */
  getNextToken() {
    if (!this.hasMoreTokens()) {
      return null;
    }

    const string = this._string.slice(this._cursor);

    for (const [regexp, tokenType] of Spec) {
      const tokenValue = this._match(regexp, string);
      if (tokenValue == null) {
        continue;
      }

      if (tokenType == null) {
        return this.getNextToken();
      }

      return {
        type: tokenType,
        value: tokenValue
      };
    }

    throw new SyntaxError(`Unexpected token: "${string[0]}"`);
  }

  /**
   * Matches a token for a regular expession
   */
  _match(regexp, string) {
    const matched = regexp.exec(string);
    if (matched == null) {
      return null;
    }
    this._cursor += matched[0].length;
    return matched[0];
  }
}

module.exports = {
  Tokenizer,
};