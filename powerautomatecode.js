if(or(equals(variables('test'), null), equals(string(variables('test')), '')), null, concat('/account(', variables('test'), ')'))
