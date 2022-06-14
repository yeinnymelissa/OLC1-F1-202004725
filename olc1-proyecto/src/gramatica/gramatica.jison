%{
%}

/*Definicion léxica*/
%lex

%options case-insensitive


bool    "true"|"false"   

%%

\s+                                 {}
"//".*                              {
                                        console.log("Comentario una línea");
                                    }
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] {
                                        console.log("Comentario multi");
                                    }
\"[^\"]*\"                          {
                                        return 'cadena';
                                    }
\'[^\']?\'                          {
                                        return 'caracter';
                                    }
[0-9]+("."[0-9]+)?\b                {
                                        return 'decimal';
                                    }  
[0-9]+\b                            {
                                        return 'entero';
                                    } 
{bool}                              {
                                        return 'booleano';
                                    } 
"int"                               {
                                        return 'INT';
                                    }
"string"                            {
                                        return 'STRING';
                                    }
"boolean"                           {
                                        return 'BOOLEAN';
                                    }
"double"                            {
                                        return 'DOUBLE';
                                    }
"char"                              {
                                        return 'CHAR';
                                    }
"const"                             {
                                        return 'CONST';
                                    }   
"if"                                {
                                        return 'IF';
                                    }   
"else"                              {
                                        return 'ELSE';
                                    }                                                                      
([a-zA-Z])[a-zA-Z0-9_]*             {
                                        return 'id';
                                    } 
"\\\""                              {
                                        return 'comillaDoble'
                                    }   
"\\\\"                              {
                                        return 'barraInvertida'
                                    }     
"\\n"                               {
                                        return 'saltoLinea'
                                    }    
"\\r"                               {
                                        return 'retornoCarro'
                                    }  
"\\t"                               {
                                        return 'tabulacion'
                                    }                                                                                                                                                                
"="                                 {
                                        return 'igual'
                                    }
"=="                                {
                                        return 'igualDoble'
                                    }
"!="                                {
                                        return 'diferenteDe'
                                    }
"<"                                 {
                                        return 'menorQue'
                                    }
">"                                 {
                                        return 'mayorQue'
                                    }
"<="                                {
                                        return 'menorIgual'
                                    }
">="                                {
                                        return 'mayorIgual'
                                    }
"?"                                 {
                                        return 'interrogacionCierra'
                                    }
":"                                 {
                                        return 'dosPuntos'
                                    }
"!"                                 {
                                        return 'NOT'
                                    }
"||"                                {
                                        return 'OR'
                                    }
"&&"                                {
                                        return 'AND'
                                    }
"^"                                 {
                                        return 'XOR'
                                    }
"("                                 {
                                        return 'parentesisA'
                                    }
")"                                 {
                                        return 'parentesisC'
                                    }
";"                                 {
                                        return 'ptComa'
                                    }
","                                 {
                                        return 'coma'
                                    }                                    
"+"                                 {
                                        return 'SUMA'
                                    }
"-"                                 {
                                        return 'RESTA'
                                    }
"/"                                 {
                                        return 'DIVISION'
                                    }
"*"                                 {
                                        return 'MULTIPLICACION'
                                    }
"%"                                 {
                                        return 'MODULO'
                                    }                                    
"**"                                 {
                                        return 'ELEVADOA'
                                    }
"{"                                 {
                                        return 'llaveA'
                                    }
"}"                                 {
                                        return 'llaveC'
                                    }
"++"                                {
                                        return 'incremento'
                                    }
"--"                                {
                                        return 'decremento'
                                    }
"["                                 {
                                        return 'corcheteA'
                                    }
"]"                                 {
                                        return 'corcheteC'
                                    }
                                                                      
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
[ \r\t]+                            {}
\n                                  {}
<<EOF>>                             return 'EOF';
.                                   {
                                        let aux = new moduloErrores.ErrorCST("Léxico", "La expresión " + yytext + " no pertenece al lenguaje", yylloc.first_line, yylloc.first_column);
                                        errores.push(aux);
                                        console.log("Error léxico");
                                    }
/lex

%start ini

%%

ini : INSTRUCCIONES EOF {console.log("termine el análisis");} 
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION
                | INSTRUCCION
;

INSTRUCCION : DECLARACION 
            | ASIGNACION
            | IFCOMPLETO
;

DECLARACION : DECLARACIONNORMAL
            | DECLARACIONCONSTANTE
;

DECLARACIONNORMAL: TIPODATO IDS igual IGUALACIONDEDATO ptComa {console.log($1 + " " + $2 + " " + $3 + " " + $4 + " " + $5)}
;


DECLARACIONCONSTANTE: CONST DECLARACIONNORMAL 
;

ASIGNACION : id igual IGUALACIONDEDATO ptComa {console.log($1 + " " + $2 + " " + $3 + " " + $4 )}
;

IDS: IDS coma id  { $1.push($3);$$=$1;}
    | id {$$ = [$1]}
;

TIPODATO: INT 
        | STRING 
        | BOOLEAN 
        | DOUBLE 
        | CHAR
;

IGUALACIONDEDATO: entero
                | cadena
                | booleano
                | decimal
                | caracter
;


IFCOMPLETO: SENTENCIAIF SENTENCIAELSEIF
            | SENTENCIAIF
;

SENTENCIAIF: IF parentesisA booleano parentesisC llaveA INSTRUCCIONES llaveC
;

SENTENCIAELSEIF: SENTENCIAELSEIF ELSE SENTENCIAIF
                | SENTENCIAELSEIF ELSE llaveA INSTRUCCIONES llaveC
                | ELSE SENTENCIAIF
                | ELSE llaveA INSTRUCCIONES llaveC
;


