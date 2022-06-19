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
    const {Asignar} = require('../instrucciones/asignar');
    const {Print} = require('../instrucciones/print');
    const {Println} = require('../instrucciones/println');
    const {Bloque} = require('../instrucciones/bloque');
    const {While} = require('../instrucciones/while');
    const {DoWhile} = require('../instrucciones/dowhile');
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

ini : INSTRUCCIONES EOF {return $1}  
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION { $1.push($2); $$=$1;}
                | INSTRUCCION { $$ = [$1] }
;

INSTRUCCION : DECLARACION ptComa { $$=$1; } 
            | ASIGNACION ptComa
            | INCREMENTODECREMENTO ptComa { $$=$1; } 
            | SENTENCIAIF { $$=$1; } 
            | SENTENCIASWITCH { $$=$1; } 
            | SENTENCIAFOR { $$=$1; } 
            | SENTENCIADOWHILE { $$=$1; } 
            | SENTENCIAWHILE { $$=$1; } 
            | BREAK ptComa { $$=$1; } 
            | CONTINUE ptComa { $$=$1; } 
            | INSTRUCCIONLLAMAR ptComa { $$=$1; } 
            | FUNCION { $$=$1; } 
            | METODO { $$=$1; } 
            | FUNCIONPRINTLN ptComa { $$=$1; } 
            | FUNCIONPRINT ptComa { $$=$1; } 
            | FUNCIONTYPEOF ptComa { $$=$1; } 
            | INSTRUCCIONRETURN ptComa { $$=$1; } 
            | BLOQUE { $$=$1; } 
            | error    ';'  { 
                //get instance
                //meterlo
                console.log("Error sintactico en la linea"+(yylineno+1)); }
;

INSTRUCCIONIFSIMPLE : DECLARACION { $$=$1; } 
                    | ASIGNACION { $$=$1; } 
                    | INCREMENTODECREMENTO { $$=$1; } 
                    | INSTRUCCIONLLAMAR { $$=$1; } 
                    | FUNCIONPRINTLN { $$=$1; } 
                    | FUNCIONPRINT { $$=$1; } 
                    | FUNCIONTYPEOF { $$=$1; } 
                    | INSTRUCCIONRETURN { $$=$1; } 
                    | BREAK { $$=$1; } 
;

DECLARACION : DECLARACIONNORMAL { $$=$1; } 
            | DECLARACIONCONSTANTE { $$=$1; } 
;

DECLARACIONNORMAL: TIPODATO id igual EXPRESIONARITMETICA  {$$= new Declaracion($2,$1,$4,true,@1.first_line, @1.first_column );}
;


DECLARACIONCONSTANTE: CONST TIPODATO id igual EXPRESIONARITMETICA {$$= new Declaracion($3,$2,$5,false,@1.first_line, @1.first_column );}
;

ASIGNACION : id igual EXPRESIONARITMETICA  {$$= new Asignar($1,$3,@1.first_line, @1.first_column );}
;

TIPODATO: INT {$$=$1;} 
        | STRING {$$=$1;} 
        | BOOLEAN {$$=$1;} 
        | DOUBLE {$$=$1;} 
        | CHAR {$$=$1;} 
;

IGUALACIONDEDATO: decimal {$$=new Literal($1,Tipo.DOUBLE , @1.first_line, @1.first_column)}
                | cadena {$$=new Literal($1,Tipo.STRING , @1.first_line, @1.first_column)}
                | booleano {$$=new Literal($1,Tipo.BOOLEAN , @1.first_line, @1.first_column)}
                | entero {$$=new Literal($1,Tipo.INT , @1.first_line, @1.first_column)}
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

VARIABLEFOR : DECLARACION ptComa {$$=$1;} 
            | ASIGNACION ptComa {$$=$1;} 
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

EXPRESIONESRELACIONALES: EXPRESIONESRELACIONALES mayorQue EXPRESIONESRELACIONALES {$$= new Relacional($1,$3,opcionesRelacionales.MAYOR, @1.first_line, @1.first_column);}
                        | EXPRESIONESRELACIONALES mayorIgual EXPRESIONESRELACIONALES {$$= new Relacional($1,$3,opcionesRelacionales.MAYORIGUAL, @1.first_line, @1.first_column);}
                        | EXPRESIONESRELACIONALES menorQue EXPRESIONESRELACIONALES {$$= new Relacional($1,$3,opcionesRelacionales.MENOR, @1.first_line, @1.first_column);}
                        | EXPRESIONESRELACIONALES menorIgual EXPRESIONESRELACIONALES {$$= new Relacional($1,$3,opcionesRelacionales.MENORIGUAL, @1.first_line, @1.first_column);}
                        | EXPRESIONESRELACIONALES igualDoble EXPRESIONESRELACIONALES {$$= new Relacional($1,$3,opcionesRelacionales.IGUAL, @1.first_line, @1.first_column);}
                        | EXPRESIONESRELACIONALES diferenteDe EXPRESIONESRELACIONALES {$$= new Relacional($1,$3,opcionesRelacionales.DIFERENTEDE, @1.first_line, @1.first_column);}
                        | EXPRESIONARITMETICA {$$=$1;}
;

EXPRESIONLOGICA: EXPRESIONLOGICA OR EXPRESIONLOGICA {$$= new Logicas($1,$3,opcionesLogicas.OR, @1.first_line, @1.first_column);}
                | EXPRESIONLOGICA AND EXPRESIONLOGICA {$$= new Logicas($1,$3,opcionesLogicas.AND, @1.first_line, @1.first_column);}
                | EXPRESIONLOGICA XOR EXPRESIONLOGICA {$$= new Logicas($1,$3,opcionesLogicas.XOR, @1.first_line, @1.first_column);}
                | NOT EXPRESIONLOGICA {$$= new Logicas($2,null,opcionesLogicas.NOT, @1.first_line, @1.first_column);}
                | EXPRESIONESRELACIONALES {$$=$1;}
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

SUMARESTA: id SUMA SUMARESTA  {$$= new Aritmeticas($1,$3,opcionesAritmeticas.MAS, @1.first_line, @1.first_column);}
        | id RESTA SUMARESTA {$$= new Aritmeticas($1,$3,opcionesAritmeticas.MENOS, @1.first_line, @1.first_column);}
        | id {$$=$1;}     
        | IGUALACIONDEDATO {$$=$1;}
;

SENTENCIAWHILE: WHILE parentesisA EXPRESIONLOGICA parentesisC BLOQUE {$$= new While($3,$5,@1.first_line, @1.first_column)}
;

SENTENCIADOWHILE: DO BLOQUE WHILE parentesisA EXPRESIONLOGICA parentesisC BLOQUE {$$= new DoWhile($5,$2,$7,@1.first_line, @1.first_column)}
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

FUNCIONPRINTLN: PRINTLN parentesisA EXPRESIONARITMETICA parentesisC {$$= new Println($3, @1.first_line, @1.first_column);}
;

FUNCIONPRINT: PRINT parentesisA EXPRESIONARITMETICA parentesisC {$$= new Print($3, @1.first_line, @1.first_column);}
;

FUNCIONTYPEOF: TYPEOF parentesisA EXPRESIONARITMETICA parentesisC
;

BLOQUE: llaveA INSTRUCCIONES llaveC  {$$= new Bloque($2,@1.first_line, @1.first_column)}
        | llaveA llaveC
;