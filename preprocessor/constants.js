var LAZY = "/*lazy*/";
var SEMI_COLON = ";";
var COMMA = ",";
var SPACE = " ";
var LEFT_PAREN = "(";
var RIGHT_PAREN = ")";
var LEFT_BRACKET = "{";
var RIGHT_BRACKET = "}";
var DOT = ".";

var EQUALS = "=";
var LT = "<";
var GT = ">";
var UNARY = "!";
var PLUS = "+";
var MINUS = "-";

var FOR = "for";
var IN = "in";
var FUNC_DEC = "function";
var VAR_DEC = "var";
var LET = "let";
var CONST = "const";
var NEW = "new";
var SWITCH = "switch";
var CASE = "case";
var IF = "if";
var ELSE = "else";
var CONTINUE = "continue";
var WHILE = "while";
var RETURN = "return";
var TRY = "try";
var CATCH = "catch";
var DEFAULT = "default";
var THROW = "throw";
var BREAK = "break";
var DEBUGGER = "debugger";
var LABEL = "label";
var IMPORT = "import";
var REQUIRE = "require";

var CHUNK = "chunk";

var DELIMETERS = {
  [EQUALS]: EQUALS,
  [LT]: LT,
  [GT]: GT,
  [UNARY]: UNARY,
  [PLUS]: PLUS,
  [MINUS]: MINUS,
  LEFT_BRACKET: LEFT_BRACKET,
  [LEFT_BRACKET]: LEFT_BRACKET,
  RIGHT_BRACKET: RIGHT_BRACKET,
  [RIGHT_BRACKET]: RIGHT_BRACKET,
  RIGHT_PAREN: RIGHT_PAREN,
  [RIGHT_PAREN]: RIGHT_PAREN,
  LEFT_PAREN: LEFT_PAREN,
  [LEFT_PAREN]: LEFT_PAREN,
  SPACE: SPACE,
  [SPACE]: SPACE,
  COMMA: COMMA,
  [COMMA]: COMMA,
  [SEMI_COLON]: SEMI_COLON,
};

var BOOLEAN_OPS = {
  [EQUALS]: EQUALS,
  [LT]: LT,
  [GT]: GT,
  [UNARY]: UNARY,
};

var INFIX_OPS = {
  [EQUALS]: EQUALS,
  [PLUS]: PLUS,
  [MINUS]: MINUS,
};

var DECLARATIONS = {
  LET: LET,
  CONST: CONST,
  FUNC_DEC: FUNC_DEC,
  VAR_DEC: VAR_DEC,
  NEW: NEW,
  [LET]: LET,
  [CONST]: CONST,
  [FUNC_DEC]: FUNC_DEC,
  [VAR_DEC]: VAR_DEC,
  [NEW]: NEW,
};

var STATEMENTS = {
  [LABEL]: LABEL,
  [IMPORT]: IMPORT,
  [REQUIRE]: REQUIRE,
  [DEBUGGER]: DEBUGGER,
  [BREAK]: BREAK,
  [THROW]: THROW,
  [DEFAULT]: DEFAULT,
  [TRY]: TRY,
  [CATCH]: CATCH,
  [CONTINUE]: CONTINUE,
  [RETURN]: RETURN,
  [WHILE]: WHILE,
  [FOR]: FOR,
  [IN]: IN,
  [SWITCH]: SWITCH,
  [CASE]: CASE,
  [IF]: IF,
  [ELSE]: ELSE,
};

var DELIMETER_TYPE = "delimeter";
var LAZY_VAR_PATTERN = /\/\*lazy\*\/\s*var\s*[^\s]+\s*=$/;
var IS_VAR = /([^\s]+)\s*=/;

module.exports = {
  EQUALS: EQUALS,
  LAZY: LAZY,
  SEMI_COLON: SEMI_COLON,
  COMMA: COMMA,
  SPACE: SPACE,
  LEFT_PAREN: LEFT_PAREN,
  RIGHT_PAREN: RIGHT_PAREN,
  LEFT_BRACKET: LEFT_BRACKET,
  RIGHT_BRACKET: RIGHT_BRACKET,
  FUNC_DEC: FUNC_DEC,
  VAR_DEC: VAR_DEC,
  LET: LET,
  CONST: CONST,
  CHUNK: CHUNK,
  DELIMETERS: DELIMETERS,
  DELIMETER_TYPE: DELIMETER_TYPE,
  LAZY_VAR_PATTERN: LAZY_VAR_PATTERN,
  IS_VAR: IS_VAR,
  DECLARATIONS: DECLARATIONS,
};
