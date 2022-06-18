%{
    //const {Declaracion} = require('../instrucciones/declaracion')
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
"do"                                {
                                        return 'DO';
                                    } 
"while"                             {
                                        return 'WHILE';
                                    }   
"continue"                          {
                                        return 'CONTINUE';
                                    }     
"void"                              {
                                        return 'VOID';
                                    } 
"call"                              {
                                        return 'CALL';
                                    } 
"null"                              {
                                        return 'null';
                                    } 
"return"                            {
                                        return 'RETORNO';
                                    }   
"println"                           {
                                        return 'PRINTLN';
                                    } 
"print"                             {
                                        return 'PRINT';
                                    } 
"typeof"                            {
                                        return 'TYPEOF';
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
"**"                                {
                                        return 'POTENCIA'
                                    }
"*"                                 {
                                        return 'MULTIPLICACION'
                                    }
"%"                                 {
                                        return 'MODULO'
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
            | SENTENCIADOWHILE
            | SENTENCIAWHILE
            | BREAK ptComa
            | CONTINUE ptComa
            | INSTRUCCIONLLAMAR ptComa
            | FUNCION
            | METODO
            | FUNCIONPRINTLN ptComa
            | FUNCIONPRINT ptComa
            | FUNCIONTYPEOF ptComa
            | INSTRUCCIONRETURN ptComa
            | BLOQUE
;

INSTRUCCIONIFSIMPLE : DECLARACION 
                    | ASIGNACION 
                    | INCREMENTODECREMENTO
                    | INSTRUCCIONLLAMAR 
                    | FUNCIONPRINTLN 
                    | FUNCIONPRINT
                    | FUNCIONTYPEOF
                    | INSTRUCCIONRETURN
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
                | null
;


SENTENCIAIF: IF parentesisA EXPRESIONLOGICA parentesisC VARIOSIF
;

SENTENCIAELSEIF: SENTENCIAELSEIF ELSE IF parentesisA EXPRESIONLOGICA parentesisC BLOQUE
                | SENTENCIAELSEIF ELSE BLOQUE
                |
;

SENTENCIAELSEIFSIMPLE: SENTENCIAELSEIFSIMPLE ELSE IF parentesisA EXPRESIONLOGICA parentesisC INSTRUCCIONIFSIMPLE ptComa
                    | SENTENCIAELSEIFSIMPLE ELSE INSTRUCCIONIFSIMPLE ptComa
                    |
;

VARIOSIF: BLOQUE SENTENCIAELSEIF
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

SENTENCIAFOR: FOR parentesisA VARIABLEFOR EXPRESIONESRELACIONALES ptComa INCREMENTODECREMENTOFOR parentesisC BLOQUE
;

VARIABLEFOR : DECLARACION ptComa
            | ASIGNACION ptComa
;

EXPRESIONARITMETICA:  EXPRESIONARITMETICA SUMA EXPRESIONARITMETICA  
                    | EXPRESIONARITMETICA RESTA EXPRESIONARITMETICA   
                    | EXPRESIONARITMETICA MULTIPLICACION EXPRESIONARITMETICA  
                    | EXPRESIONARITMETICA DIVISION EXPRESIONARITMETICA  
                    | EXPRESIONARITMETICA MODULO EXPRESIONARITMETICA
                    | EXPRESIONARITMETICA POTENCIA EXPRESIONARITMETICA
                    | id     
                    | IGUALACIONDEDATO   
                    | EXPRESIONLLAMAR 
                    | FUNCIONTYPEOF
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

SENTENCIAWHILE: WHILE parentesisA EXPRESIONLOGICA parentesisC BLOQUE
;

SENTENCIADOWHILE: DO BLOQUE SENTENCIAWHILE
;

METODO: VOID id parentesisA PARAMETROS parentesisC BLOQUE
;

PARAMETROS: PARAMETROS coma PARAMETRO  
        | PARAMETRO 
        |
;

PARAMETRO: TIPODATO id
;

FUNCION: TIPODATO id parentesisA PARAMETROS parentesisC BLOQUE
;



PARAMETROSCALL: PARAMETROSCALL coma IGUALACIONDEDATO  
            | IGUALACIONDEDATO 
            |
;

INSTRUCCIONLLAMAR: CALL id parentesisA PARAMETROSCALL parentesisC 
;

EXPRESIONLLAMAR: id parentesisA PARAMETROSCALL parentesisC 
;

INSTRUCCIONRETURN: RETORNO
                | RETORNO EXPRESIONARITMETICA
; 

FUNCIONPRINTLN: PRINTLN parentesisA EXPRESIONARITMETICA parentesisC
;

FUNCIONPRINT: PRINT parentesisA EXPRESIONARITMETICA parentesisC
;

FUNCIONTYPEOF: TYPEOF parentesisA TYPEOFEXPRE parentesisC
;

TYPEOFEXPRE: id     
            | IGUALACIONDEDATO   
            | EXPRESIONLLAMAR 
;

BLOQUE: llaveA INSTRUCCIONES llaveC
;