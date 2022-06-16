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
"switch"                            {
                                        return 'SWITCH';
                                    }   
"case"                              {
                                        return 'CASE';
                                    } 
"default"                           {
                                        return 'DEFAULT';
                                    }   
"break"                             {
                                        return 'BREAK';
                                    }  
"for"                               {
                                        return 'FOR';
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
"=="                                 {
                                        return 'igualDoble'
                                    }
"="                                 {
                                        return 'igual'
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
"++"                                {
                                        return 'incremento'
                                    }
"--"                                {
                                        return 'decremento'
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
                                        return 'POTENCIA'
                                    }
"{"                                 {
                                        return 'llaveA'
                                    }
"}"                                 {
                                        return 'llaveC'
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


%left OR
%left AND
%left XOR
%left SUMA RESTA
%nonassoc mayorIgual mayorQue menorIgual menorQue igualDoble diferenteDe
%left MULTIPLICACION DIVISION MODULO
%left POTENCIA
%right NOT

%start ini

%%

ini : INSTRUCCIONES EOF {console.log("termine el análisis");} 
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION
                | INSTRUCCION
;

INSTRUCCION : DECLARACION ptComa
            | ASIGNACION ptComa
            | INCREMENTODECREMENTO ptComa
            | SENTENCIAIF
            | SENTENCIASWITCH
            | SENTENCIAFOR
            | EXPRESIONARITMETICA
            | BREAK ptComa
;

INSTRUCCIONIFSIMPLE : DECLARACION 
                    | ASIGNACION 
                    | INCREMENTODECREMENTO
;

DECLARACION : DECLARACIONNORMAL
            | DECLARACIONCONSTANTE
;

DECLARACIONNORMAL: TIPODATO IDS igual EXPRESIONARITMETICA  {console.log($1 + " " + $2 + " " + $3 + " " + $4 )}
;


DECLARACIONCONSTANTE: CONST DECLARACIONNORMAL 
;

ASIGNACION : id igual EXPRESIONARITMETICA  {console.log($1 + " " + $2 + " " + $3 )}
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


SENTENCIAIF: IF parentesisA EXPRESIONLOGICA parentesisC VARIOSIF
;

SENTENCIAELSEIF: SENTENCIAELSEIF ELSE IF parentesisA EXPRESIONLOGICA parentesisC llaveA INSTRUCCIONES llaveC
                | SENTENCIAELSEIF ELSE llaveA INSTRUCCIONES llaveC
                |
;

SENTENCIAELSEIFSIMPLE: SENTENCIAELSEIFSIMPLE ELSE IF parentesisA EXPRESIONLOGICA parentesisC INSTRUCCIONIFSIMPLE ptComa
                    | SENTENCIAELSEIFSIMPLE ELSE INSTRUCCIONIFSIMPLE ptComa
                    |
;

VARIOSIF: llaveA INSTRUCCIONES llaveC SENTENCIAELSEIF
        | INSTRUCCIONIFSIMPLE ptComa SENTENCIAELSEIFSIMPLE
;

SENTENCIASWITCH: SWITCH parentesisA id parentesisC llaveA CASOS llaveC
;

CASOS: CASOS CASO
    | CASO
;

CASO: CASE IGUALACIONDEDATO dosPuntos INSTRUCCIONES
    | DEFAULT dosPuntos INSTRUCCIONES
;

SENTENCIAFOR: FOR parentesisA VARIABLEFOR EXPRESIONESRELACIONALES ptComa INCREMENTODECREMENTOFOR parentesisC llaveA INSTRUCCIONES llaveC
;

VARIABLEFOR : DECLARACION ptComa
            | ASIGNACION ptComa
;

EXPRESIONARITMETICA:   EXPRESIONARITMETICA SUMA EXPRESIONARITMETICA  
                    |  EXPRESIONARITMETICA RESTA EXPRESIONARITMETICA   
                    |  EXPRESIONARITMETICA MULTIPLICACION EXPRESIONARITMETICA  
                    |  EXPRESIONARITMETICA DIVISION EXPRESIONARITMETICA  
                    |  EXPRESIONARITMETICA MODULO EXPRESIONARITMETICA
                    |  EXPRESIONARITMETICA POTENCIA EXPRESIONARITMETICA
                    |  id     
                    |  IGUALACIONDEDATO    
;

EXPRESIONESRELACIONALES: EXPRESIONESRELACIONALES mayorQue EXPRESIONESRELACIONALES
                        | EXPRESIONESRELACIONALES mayorIgual EXPRESIONESRELACIONALES
                        | EXPRESIONESRELACIONALES menorQue EXPRESIONESRELACIONALES
                        | EXPRESIONESRELACIONALES menorIgual EXPRESIONESRELACIONALES
                        | EXPRESIONESRELACIONALES igualDoble EXPRESIONESRELACIONALES
                        | EXPRESIONESRELACIONALES diferenteDe EXPRESIONESRELACIONALES
                        | EXPRESIONARITMETICA
;

EXPRESIONLOGICA: EXPRESIONLOGICA OR EXPRESIONLOGICA
                | EXPRESIONLOGICA AND EXPRESIONLOGICA
                | EXPRESIONLOGICA XOR EXPRESIONLOGICA
                | EXPRESIONESRELACIONALES
;

INCREMENTODECREMENTOFOR: INCREMENTODECREMENTO
                        | FORINCREMENTODECREMENTO
;

INCREMENTODECREMENTO: id incremento
            | id decremento
;

FORINCREMENTODECREMENTO: id igual SUMARESTA
;

SUMARESTA: id SUMA SUMARESTA  
        | id RESTA SUMARESTA 
        | id     
        | IGUALACIONDEDATO    
;
