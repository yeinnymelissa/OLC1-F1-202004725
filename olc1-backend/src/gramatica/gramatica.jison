%{
    const {Declaracion} = require('../instrucciones/declaracion')
    const {Literal} = require('../expresiones/literal')
    const {Tipo} = require('../simbolos/tipo');
    const {Aritmeticas} = require('../expresiones/aritmeticas');
    const {opcionesAritmeticas} = require('../expresiones/opcionesAritmeticas');
    const {Logicas} = require('../expresiones/logicas');
    const {opcionesLogicas} = require('../expresiones/opcionesLogicas');
    const {Relacional} = require('../expresiones/relacional');
    const {opcionesRelacionales} = require('../expresiones/opcionesRelacionales');
    const {Acceso} = require('../expresiones/acceso');
    
%}

/*Definicion léxica*/
%lex

%options case-insensitive


bool    "true"|"false"   
cadenaS    \"("\\\""| "\\r" | "\\\\" | "\\n" | "\\t" | [^\"])*\"
caracterS \'("\\\""| "\\r" | "\\\\" | "\\n" | "\\t" | [^\'])?\'

%%

\s+                                 {}
"//".*                              {
                                        console.log("Comentario una línea");
                                    }
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] {
                                        console.log("Comentario multi");
                                    }
{cadenaS}                           {
                                        return 'cadena';
                                    }
{caracterS}                         {
                                        return 'caracter';
                                    }
[0-9]+("."[0-9]+)?\b          {
                                        return 'decimal';
                                    }  
[0-9]+\b                      {
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
                                                                                                                                                            
"=="                                 {
                                        return 'igualDoble'
                                    }
"="                                 {
                                        return 'igual'
                                    }
"!="                                {
                                        return 'diferenteDe'
                                    }
"<="                                {
                                        return 'menorIgual'
                                    }
">="                                {
                                        return 'mayorIgual'
                                    }
"<"                                 {
                                        return 'menorQue'
                                    }
">"                                 {
                                        return 'mayorQue'
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
                                        //let error = new Errores(yylloc.first_line,  yylloc.first_column, "La expresión " + yytext + " no pertenece al lenguaje", "Léxico")
                                        console.log("ERROR LEXICO EN LA LINEA "+ yylloc.first_line + "Y EN LA COLUMNA "+yylloc.first_column + " EL TEXTO ES "+ yytext);
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
            | error    ';'  { 
                //get instance
                //meterlo
                console.log("Error sintactico en la linea"+(yylineno+1)); }
;

INSTRUCCIONIFSIMPLE : DECLARACION 
                    | ASIGNACION 
                    | INCREMENTODECREMENTO
                    | INSTRUCCIONLLAMAR 
                    | FUNCIONPRINTLN 
                    | FUNCIONPRINT
                    | FUNCIONTYPEOF
                    | INSTRUCCIONRETURN
                    | BREAK
;

DECLARACION : DECLARACIONNORMAL
            | DECLARACIONCONSTANTE
;

DECLARACIONNORMAL: TIPODATO IDS igual EXPRESIONARITMETICA  {$$= new Declaracion($2,$1,$4,true,@1.first_line, @1.first_column );}
;


DECLARACIONCONSTANTE: CONST TIPODATO IDS igual EXPRESIONARITMETICA {$$= new Declaracion($3,$2,$5,false,@1.first_line, @1.first_column );}
;

ASIGNACION : id igual EXPRESIONARITMETICA  {console.log($1 + " " + $2 + " " + $3 )}
;

IDS: IDS coma id  { $1.push($3); $$=$1;}
    | id {$$=$1;} 
;

TIPODATO: INT {$$="int";} 
        | STRING {$$="string";} 
        | BOOLEAN {$$="boolean";} 
        | DOUBLE {$$="double";} 
        | CHAR {$$="char";} 
;

IGUALACIONDEDATO: entero {$$=new Literal($1,Tipo.INT , @1.first_line, @1.first_column)}
                | cadena {$$=new Literal($1,Tipo.STRING , @1.first_line, @1.first_column)}
                | booleano {$$=new Literal($1,Tipo.BOOLEAN , @1.first_line, @1.first_column)}
                | decimal {$$=new Literal($1,Tipo.DOUBLE , @1.first_line, @1.first_column)}
                | caracter {$$=new Literal($1,Tipo.CHAR , @1.first_line, @1.first_column)}
                | RESTA entero {$$=new Literal($1+$2,Tipo.INT , @1.first_line, @1.first_column)}
                | RESTA decimal {$$=new Literal($1+$2,Tipo.DOUBLE , @1.first_line, @1.first_column)}
                | null {$$=new Literal($1,Tipo.NULL , @1.first_line, @1.first_column)}
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

EXPRESIONARITMETICA:  EXPRESIONARITMETICA SUMA EXPRESIONARITMETICA  {$$= new Aritmeticas($1,$3,opcionesAritmeticas.MAS, @1.first_line, @1.first_column);}
                    | EXPRESIONARITMETICA RESTA EXPRESIONARITMETICA   {$$= new Aritmeticas($1,$3,opcionesAritmeticas.MENOS, @1.first_line, @1.first_column);}
                    | EXPRESIONARITMETICA MULTIPLICACION EXPRESIONARITMETICA  {$$= new Aritmeticas($1,$3,opcionesAritmeticas.MULTIPLICACION, @1.first_line, @1.first_column);}
                    | EXPRESIONARITMETICA DIVISION EXPRESIONARITMETICA  {$$= new Aritmeticas($1,$3,opcionesAritmeticas.DIVISION, @1.first_line, @1.first_column);}
                    | EXPRESIONARITMETICA MODULO EXPRESIONARITMETICA {$$= new Aritmeticas($1,$3,opcionesAritmeticas.MODULO, @1.first_line, @1.first_column);}
                    | EXPRESIONARITMETICA POTENCIA EXPRESIONARITMETICA {$$= new Aritmeticas($1,$3,opcionesAritmeticas.POTENCIA, @1.first_line, @1.first_column);}
                    | parentesisA EXPRESIONARITMETICA parentesisC {$$=$3;}
                    | id  {$$= new Acceso($1,@1.first_line, @1.first_column);}   
                    | IGUALACIONDEDATO   {$$=$1;}
                    | EXPRESIONLLAMAR {$$=$1;}
                    | FUNCIONTYPEOF {$$=$1;}
                    | INCREMENTODECREMENTO {$$=$1;}
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
                | NOT EXPRESIONLOGICA 
                | EXPRESIONESRELACIONALES
;

INCREMENTODECREMENTOFOR: INCREMENTODECREMENTO
                        | FORINCREMENTODECREMENTO
;

INCREMENTODECREMENTO: id incremento
                    | id decremento
                    | incremento id
                    | decremento id
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

FUNCIONTYPEOF: TYPEOF parentesisA EXPRESIONARITMETICA parentesisC
;

BLOQUE: llaveA INSTRUCCIONES llaveC
        | llaveA llaveC
;