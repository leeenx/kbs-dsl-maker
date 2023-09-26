// 不需要处理的类型
const ignoreTypes = [
  'DebuggerStatement',
  'Directive',
  'EmptyStatement'
];

// 报错的类型
const unSupportTypes = [
  'WithStatement',
  'LabeldStatement',
  'Patterns'
];

const es5ToDsl = (body) => {
  // 检查类型
  body.forEach(({ type }) => {
    if (unSupportTypes.includes(type)) {
      // 抛错
      throw new Error(`不支持 esTree node: ${type}`);
    }
  });
  // 逐行解析
  return body
    .filter(({ type }) => !ignoreTypes.includes(type))
    .map(parseStatementOrDeclaration);
};

// 语句与声明解析
const parseStatementOrDeclaration = row => {
  if (!row) return;
  const { type } = row;
  switch (type) {
    // 变量声明
    case 'VariableDeclaration':
      return parseVariableDeclaration(row);
    // 块作用域
    case 'BlockStatement':
      return parseBlockStatement(row);
    // 函数语句
    case 'FunctionDeclaration':
      return parseFunctionExpression(row);
    // 表达式语句
    case 'ExpressionStatement':
      return parseExpressionStatement(row);
    // 返回语句
    case 'ReturnStatement':
      return parseReturnStatement(row);
    // 抛错语句
    case 'ThrowStatement':
      return parseThrowStatement(row);
    // try 语句
    case 'TryStatement':
      return parseTryStatement(row);
    // catch 语句
    case 'CatchClause':
      return parseCatchClause(row);
    // if...else 语句
    case 'IfStatement':
      return parseIfStatement(row);
    case 'SwitchStatement':
      return parseSwitchStatement(row);
    case 'WhileStatement':
      return parseWhileStatement(row);
    case 'DoWhileStatement':
      return parseDoWhileStatement(row);
    case 'ForStatement':
      return parseForStatement(row);
    case 'ForInStatement':
      return parseForInStatement(row);
    case 'BreakStatement':
      return parseBreakStatement(row);
    case 'ContinueStatement':
      return parseContinuteStatement(row);
    default:
      throw new Error(`意料之外的 esTree node: ${type}`);
  }
};

/**
 * 表达式(expression)
 * 字面量(Literal) 在 AST 中也属于 expression
 */
const parseExpression = (expression) => {
  // 空值
  if (!expression) return;
  switch (expression.type) {
    case 'Literal':
      if (expression.regex) {
        return parseRegExpLiteral(expression.regex);
      }
    // 数字字面量
    case 'NumericLiteral':
    // 字符串字面量
    case 'StringLiteral':
    // 布尔值字面量
    case 'BooleanLiteral':
    // null 类型
    case 'NullLiteral':
      return { type: 'literal', value: expression.value };
    // Identifier
    case 'Identifier':
      return {
        type: 'call-function',
        name: 'getConst',
        value: expression.name
      };
    // 函数表达式
    case 'FunctionExpression':
      return parseFunctionExpression(expression);
    // 正则表达式
    case 'RegExpLiteral':
      return parseRegExpLiteral(expression);
    // new Class
    case 'NewExpression':
      return parseNewExpression(expression);
    // 赋值语句
    case 'AssignmentExpression': 
      return parseAssignmentExpression(expression);
    // MemberExpression
    case 'MemberExpression':
      return parseMemberExpression(expression);
    // this 指针
    case 'ThisExpression':
      // 当普通字面量返回
      return { type: 'literal', value: 'this' };
    // 一元运算
    case 'UnaryExpression':
      return parseUnaryExpression(expression);
    // 二元运算
    case 'BinaryExpression':
      return parseBinaryExpression(expression);
    // 三元运算
    case 'ConditionalExpression':
      return parseConditionalExpression(expression);
    // 方法调用
    case 'CallExpression':
      return parseCallExpression(expression);
    // 自更新表达式
    case 'UpdateExpression':
      return parseUpdateExpression(expression);
    // 数组表达式
    case 'ArrayExpression':
      return parseArrayExpression(expression);
    // 逗号分隔的表达式
    case 'SequenceExpression':
      return parseSequenceExpression(expression);
    // 对象表达式
    case 'ObjectExpression':
      return parseObjectExpression(expression);
    // 逻辑表达式
    case 'LogicalExpression':
      return parseLogicalExpression(expression);
    default:
      throw new Error(`意料之外的 expression 类型：${expression.type}`);
  }
};

// 赋值声明
const parseVariableDeclaration = ({ kind, declarations }) => {
  if (declarations.length > 0) {
    return {
      type: 'call-function',
      name: 'batchDeclaration',
      value: [
        kind,
        declarations.map(({ id, init }) => ({
          key: id.name,
          value: parseExpression(init)
        }))
      ]
    };
  }
};

// new 语句
const parseNewExpression = ({ callee, arguments }) => {
  return {
    type: 'call-function',
    name: 'newClass',
    value: [
      parseExpression(callee),
      arguments.map(item => parseExpression(item))
    ]
  };
};

// 调用函数
const parseCallExpression = ({ callee, arguments }) => {
  return {
    type: 'call-function',
    name: 'callFun',
    value: [
      parseExpression(callee),
      arguments.map(item => parseExpression(item))
    ]
  };
};

// 函数声明
const parseFunctionExpression = ({ id, params, body: { body } }) => {
  return {
    type: 'customize-function',
    name: id && id.name,
    params: params.map(({ name }) => name),
    body: es5ToDsl(body)
  };
};

// 块级作用域
const parseBlockStatement = (statement, supportBreak = false, supportContinue = false) => {
  if (!statement) return;
  const { body = [] } = statement;
  return {
    type: 'call-function',
    name: 'callBlockStatement',
    value: [es5ToDsl(body), supportBreak, supportContinue]
  };
};

// 表达式语句
const parseExpressionStatement = ({ expression }) => {
  return parseExpression(expression);
};

// 返回语句
const parseReturnStatement = ({ argument }) => {
  return {
    type: 'call-function',
    name: 'callReturn',
    value: [parseExpression(argument)]
  };
};

// if...else 语句
const parseIfStatement = ({ test, consequent, alternate }) => {
  return {
    type: 'call-function',
    name: 'callIfElse',
    value: [
      parseExpression(test),
      parseStatementOrDeclaration(consequent),
      parseStatementOrDeclaration(alternate)
    ]
  };
};

// 对象成员赋值
const parseMemberExpression = (expression) => {
  const {
    object,
    computed,
    property
  } = expression;
  const member = [];
  if (object.type === 'Identifier') {
    member.push(object.name);
  } else if (object.type === 'MemberExpression') {
    member.push(...parseMemberExpression(object))
  } else if (object.regex) {
    // acorn
    member.push(parseRegExpLiteral(object.regex));
  } else if (object.type === 'RegExpLiteral') {
    // babel/parse
    member.push(parseRegExpLiteral(object));
  } else {
    // 当一个普通表达式处理
    member.push(parseExpression(object));
  }
  // 最后一个成员
  member.push(computed ? parseExpression(property) : property.name);
  return member;
};

// 一元运算
const parseUnaryExpression = ({ operator, argument }) => {
  return {
    type: 'call-function',
    name: 'callUnary',
    value: [operator, parseExpression(argument)]
  };
};

// 二元运算
const parseBinaryExpression = ({ left, operator, right }) => {
  return {
    type: 'call-function',
    name: 'callBinary',
    value: [parseExpression(left), operator, parseExpression(right)]
  };
};

// 三元运算
const parseConditionalExpression = ({ test, consequent, alternate }) => {
  return {
    type: 'call-function',
    name: 'callConditional',
    value: [
      parseExpression(test),
      {
        type: 'customize-function',
        body: [
          {
            type: 'call-function',
            name: 'callReturn',
            value: [parseExpression(consequent)]
          }
        ]
      },
      {
        type: 'customize-function',
        body: [
          {
            type: 'call-function',
            name: 'callReturn',
            value: parseExpression(alternate)
          }
        ]
      }
    ]
  };
};

// 正则表达式
const parseRegExpLiteral = ({ pattern, flags }) => {
  return {
    type: 'call-function',
    name: 'getRegExp',
    value: [pattern, flags]
  };
};

// 逻辑表达式
const parseLogicalExpression = ({ left, operator, right }) => {
  return {
    type: 'call-function',
    name: 'callLogical',
    value: [
      parseExpression(left),
      operator,
      parseExpression(right)
    ]
  };
};

// 赋值运算
const parseAssignmentExpression = ({ left, right }) => {
  if (left.type === 'Identifier') {
    // 变量赋值
    return {
      type: 'call-function',
      name: 'assignLet',
      value: [[left.name], parseExpression(right)]
    };
  } else if (left.type === 'MemberExpression') {
    // 对象成员
    return {
      type: 'call-function',
      name: 'assignLet',
      value: [parseMemberExpression(left), parseExpression(right)]
    };
  }
  throw new Error(`Uncaught SyntaxError: Invalid left-hand side in assignment`);
};

// 自更新运算
const parseUpdateExpression = ({ operator, argument, prefix }) => {
  if (argument.type === 'Identifier') {
    return {
      type: 'call-function',
      name: 'callUpdate',
      value: [operator, argument.name, prefix]
    };
  } else if (argument.type === 'MemberExpression') {
    return {
      type: 'call-function',
      name: 'callUpdate',
      value: [operator, parseExpression(argument), prefix]
    };
  }
  throw new Error(`Uncaught SyntaxError: Invalid left-hand side expression in ${prefix ? 'prefix' : 'postfix'} operation`);
};

// 数组表达式
const parseArrayExpression = ({ elements }) => {
  return {
    type: 'array-literal',
    value: elements.map(item => parseExpression(item))
  };
};

// 抛错语句
const parseThrowStatement = ({ argument }) => {
  return {
    type: 'call-function',
    name: 'callThrow',
    value: parseExpression(argument)
  };
};

// try 语句
const parseTryStatement = ({ block, handler, finalizer }) => {
  return {
    type: 'call-function',
    name: 'callTryCatch',
    value: [
      parseBlockStatement(block),
      parseStatementOrDeclaration(handler),
      finalizer && parseBlockStatement(finalizer)
    ]
  };
};

// catch 语句
const parseCatchClause = ({ param, body }) => {
  return parseFunctionExpression({ params: [param], body });
};

// switch 语句
const parseSwitchStatement = ({ discriminant, cases }) => {
  return {
    type: 'call-function',
    name: 'callSwitch',
    value: [
      parseExpression(discriminant),
      cases.map(({ test, consequent }) => [
        parseExpression(test),
        consequent.map(item => parseStatementOrDeclaration(item))
      ])
    ]
  };
};


// 序列语句
const parseSequenceExpression = ({ expressions }) => {
  return {
    type: 'call-function',
    name: 'callSequence',
    value: [expressions.map(expression => parseExpression(expression))]
  };
};

// 对象表达式
const parseObjectExpression = ({ properties }) => {
  return {
    type: 'object-literal',
    value: properties.map(({ key, value }) => ({
      key: key.name,
      value: (
        value.type === 'MemberExpression'
          ? {
            type: 'call-function',
            name: 'getValue',
            value: [parseExpression(value)]
          }
          : parseExpression(value)
      )
    }))
  };
};

// while 语句
const parseWhileStatement = ({ test, body }) => {
  return {
    type: 'call-function',
    name: 'callWhile',
    value: [
      parseExpression(test),
      parseBlockStatement(body)
    ]
  };
};

// DoWhileStatement 语句
const parseDoWhileStatement = ({ test, body }) => {
  return {
    type: 'call-function',
    name: 'callDoWhile',
    value: [
      parseExpression(test),
      parseBlockStatement(body)
    ]
  };
};

// for 语句
const parseForStatement = ({ init, test, body, update }) => {
  // for 语句有一个隐藏的作用域，用 blockStatement 来代替
  return {
    type: 'call-function',
    name: 'callBlockStatement',
    value: [
      [
        {
          type: 'call-function',
          name: 'callFor',
          value: [
            (
              init && init.type === 'VariableDeclaration'
                ? parseVariableDeclaration(init)
                : parseExpression(init)
            ),
            parseExpression(test),
            parseExpression(update),
            parseBlockStatement(body, true, true)
          ]
        }
      ]
    ]
  };
};

// for...in 语句
const parseForInStatement = ({ left, right, body }) => {
  let leftDsl;
  switch (left.type) {
    case 'Identifier':
      leftDsl = [left.name];
      break;
    case 'MemberExpression':
      leftDsl = parseMemberExpression(left);
      break;
    case 'VariableDeclaration':
      leftDsl = parseVariableDeclaration(left);
      break;
    default:
      throw new Error(`未知的 for...in 初始化类型：${left.type}`);
  }
  return {
    type: 'call-function',
    name: 'callBlockStatement',
    value: [
      [
        {
          type: 'call-function',
          name: 'callForIn',
          value: [
            leftDsl,
            parseExpression(right),
            parseStatementOrDeclaration(body)
          ]
        }
      ]
    ]
  };
};

// break 语句
const parseBreakStatement = () => {
  return {
    type: 'call-function',
    name: 'callBreak'
  };
};

// continue 语句
const parseContinuteStatement = (statement) => {
  return {
    type: 'call-function',
    name: 'callContinute'
  };
};

const parser = (es5Tree) => {
  // es5源码体
  const { body } = es5Tree.type === 'File' ? es5Tree.program : es5Tree;
  // 解析主体
  return es5ToDsl(body);
};

module.exports.parser = parser;
