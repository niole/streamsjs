var LAZY = "/*lazy*/";
var SEMI_COLON = ";";
var COMMA = ",";
var SPACE = " ";
var LEFT_PAREN = "(";
var RIGHT_PAREN = ")";
var LEFT_BRACKET = "{";
var RIGHT_BRACKET = "}";
var DOT = ".";

var DOUBLE_EQUALS = "==";
var TRIPLE_EQUALS = "===";
var DOUBLE_NOT_EQUALS = "!=";
var TRIPLE_NOT_EQUALS = "!==";

var EQUALS = "=";
var LT = "<";
var GT = ">";
var LTE = "<=";
var GTE = ">=";
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


var MULT = "*";
var DIV = "/";
var MOD = "%";
var PLUS_EQUALS = "+=";
var MINUS_EQUALS = "-=";

var CHUNK = "chunk";
var DOUBLE_QUOTE = '"';
var SINGLE_QUOTE = "'";
var SHORT_HAND_TYPE = "short hand";
var COLON = ":";
var LEFT_SQ_BRACKET = "[";
var RIGHT_SQ_BRACKET = "]";

var LITERALS = {
  [DOUBLE_QUOTE]: DOUBLE_QUOTE,
  DOUBLE_QUOTE: DOUBLE_QUOTE,
  [SINGLE_QUOTE]: SINGLE_QUOTE,
  SINGLE_QUOTE: SINGLE_QUOTE,
};

var DELIMETERS = {
  [LEFT_SQ_BRACKET]: LEFT_SQ_BRACKET,
  LEFT_SQ_BRACKET: LEFT_SQ_BRACKET,
  [RIGHT_SQ_BRACKET]: RIGHT_SQ_BRACKET,
  RIGHT_SQ_BRACKET: RIGHT_SQ_BRACKET,
  [COLON]: COLON,
  COLON: COLON,
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
  SEMI_COLON: SEMI_COLON,
  [SEMI_COLON]: SEMI_COLON,
};

var BOOLEAN_OPS = {
  [DOUBLE_EQUALS]: DOUBLE_EQUALS,
  [TRIPLE_EQUALS]: TRIPLE_EQUALS,
  [DOUBLE_NOT_EQUALS]: DOUBLE_NOT_EQUALS,
  [TRIPLE_NOT_EQUALS]: TRIPLE_NOT_EQUALS,
  [LT]: LT,
  [GT]: GT,
  [UNARY]: UNARY,
  [LTE]: LTE,
  [GTE]: GTE,
};
var INFIX_OPS = {
  [PLUS_EQUALS]: PLUS_EQUALS,
  [MINUS_EQUALS]: MINUS_EQUALS,
  [MOD]: MOD,
  [MULT]: MULT,
  [DIV]: DIV,
  [PLUS]: PLUS,
  [MINUS]: MINUS,
  PLUS_EQUALS: PLUS_EQUALS,
  MINUS_EQUALS: MINUS_EQUALS,
  MOD: MOD,
  MULT: MULT,
  DIV: DIV,
  PLUS: PLUS,
  MINUS: MINUS,
};

var ASSIGNMENTS = {
  [EQUALS]: EQUALS,
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

var BLOCK = "block";
var PARENS = "parens";

var LEFT_STAR_COMMENT = "/*";
var RIGHT_STAR_COMMENT = "*/";
var COMMENT = "//";

var LAZY_TYPE = "lazy";
var ASSIGMENT_TYPE = "assignment";
var BOOLEAN_OP_TYPE = "boolean operator";
var INFIX_OP_TYPE = "infix operator";
var DECLARATION_TYPE = "declaration";
var DELIMETER_TYPE = "delimeter";
var VARIABLE_TYPE = "variable";
var STATEMENT_TYPE = "statement";

var LAZY_VAR_PATTERN = /\/\*lazy\*\/\s*var\s*[^\s]+\s*=$/;
var IS_VAR = /([^\s]+)\s*=/;

var EXPRESSIONS = {
  FUNC_DEC: FUNC_DEC,
  FUNCTION_EXEC: "executing function",
  INFIX: "infix expression",
  VARIABLE: "variable expression",
};

var COMMENTS = {
  [LEFT_STAR_COMMENT]: LEFT_STAR_COMMENT,
  [RIGHT_STAR_COMMENT]: RIGHT_STAR_COMMENT,
  [COMMENT]: COMMENT,
  LEFT_STAR_COMMENT: LEFT_STAR_COMMENT,
  RIGHT_STAR_COMMENT: RIGHT_STAR_COMMENT,
  COMMENT: COMMENT,
};

module.exports = {
  EXPRESSIONS: EXPRESSIONS,
  COMMENTS: COMMENTS,
  LITERALS: LITERALS,
  SHORT_HAND_TYPE: SHORT_HAND_TYPE,
  STATEMENT_TYPE: STATEMENT_TYPE,
  VARIABLE_TYPE: VARIABLE_TYPE,
  DECLARATION_TYPE: DECLARATION_TYPE,
  INFIX_OP_TYPE: INFIX_OP_TYPE,
  BOOLEAN_OP_TYPE: BOOLEAN_OP_TYPE,
  ASSIGMENT_TYPE: ASSIGMENT_TYPE,
  INFIX_OPS: INFIX_OPS,
  PARENS: PARENS,
  BLOCK: BLOCK,
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
  STATEMENTS: STATEMENTS,
  BOOLEAN_OPS: BOOLEAN_OPS,
  ASSIGNMENTS: ASSIGNMENTS,
  INFIX_OPS: INFIX_OPS,
  LAZY_TYPE: LAZY_TYPE,
};
