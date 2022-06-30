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
    const {Print} = require('../instrucciones/Reservadas/print');
    const {Println} = require('../instrucciones/Reservadas/println');
    const {Bloque} = require('../instrucciones/bloque');
    const {Errores} = require('../errores/errores');
    const {Singleton} = require('../patronSingleton/singleton');
    const {DecrementoEx} = require('../expresiones/Aritmeticas/decrementoEx');
    const {IncrementoEx} = require('../expresiones/Aritmeticas/incrementoEx');
    const {Round} = require('../expresiones/Reservadas/round');
    const {toLower} = require('../expresiones/Reservadas/toLower');
    const {TypeOf} = require('../expresiones/Reservadas/typeOf');
    //Segunda tanda
    const {Llamada} = require('../expresiones/call');
    const {For} = require('../instrucciones/Ciclicas/for');
    const {While} = require('../instrucciones/Ciclicas/while');
    const {If} = require('../instrucciones/control/if');
    const {Decremento} = require('../instrucciones/IncDec/decremento');
    const {Incremento} = require('../instrucciones/IncDec/incremento');
    const {Break} = require('../instrucciones/Transicion/break');
    const {Continue} = require('../instrucciones/Transicion/continue');
    const {Return} = require('../instrucciones/Transicion/return');
    const {InsFuncion} = require('../instrucciones/funcion');

    var cadena = '';
%}

/*Definicion léxica*/
%lex

%options case-insensitive
%x string


bool    "true"|"false"

%%

["]				{ cadena = ''; this.begin("string"); }
<string>[^"\\]+			{ cadena += yytext; }
<string>"\\\""			{ cadena += "\""; }
<string>"\n"			{ cadena += "\n"; }
<string>\s			{ cadena += " ";  }
<string>"\t"			{ cadena += "\t"; }
<string>"\\\\"			{ cadena += "\\"; }
<string>"\'"			{ cadena += "\'"; }
<string>"\r"			{ cadena += "\r"; }
<string>["]		        { yytext = cadena; this.popState(); return 'cadena'; }

\s+                                 {}
"//".*                              {console.log("Comentario una línea");}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] {console.log("Comentario multi");}
[']\\\\[']|[']\\\"[']|[']\\\'[']|[']\\n[']|[']\\t[']|[']\\r[']|['].?[']	{return 'caracter'}
[0-9]+("."[0-9]+)\b                { return 'decimal'; }  
[0-9]+\b                            { return 'entero'; } 
{bool}                              { return 'booleano'; } 
//palabras reservadas                                   
"int"                               { return 'INT'; }
"string"                            { return 'STRING'; }
"boolean"                           { return 'BOOLEAN'; }
"double"                            { return 'DOUBLE'; }
"char"                              { return 'CHAR'; }
"const"                             { return 'CONST'; }   
"if"                                { return 'IF'; }   
"else"                              { return 'ELSE'; }  
"switch"                            { return 'SWITCH'; }   
"case"                              { return 'CASE'; } 
"default"                           { return 'DEFAULT'; }   
"break"                             { return 'BREAK'; }  
"for"                               { return 'FOR'; }  
"do"                                { return 'DO'; } 
"while"                             { return 'WHILE'; }   
"continue"                          { return 'CONTINUE'; }     
"void"                              { return 'VOID'; } 
"call"                              { return 'CALL'; } 
"null"                              { return 'null'; } 
"return"                            { return 'RETORNO'; }   
"println"                           { return 'PRINTLN'; } 
"print"                             { return 'PRINT'; } 
"typeof"                            { return 'TYPEOF'; }    
"toLower"                           { return 'TOLOWER'; }     
"toUpper"                           { return 'TOUPPER'; }  
"round"                             { return 'ROUND'; }   
"new"                               { return 'NEW'; }   
"length"                            { return 'LENGTH'; }      
"toCharArray"                       { return 'TOCHARARRAY'; }   
"indexOf"                           { return 'INDEXOF'; }  
"push"                              { return 'PUSH'; }    
"pop"                               { return 'POP'; }      
"splice"                            { return 'SPLICE'; }  
"graficar_ts"                       { return 'GRAFICAR'; }   
// ID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
([a-zA-Z])[a-zA-Z0-9_]*             { return 'id'; } 

//SIGNOS                
"."                                 { return 'punto' }                                                                                                                                       
"=="                                { return 'igualDoble' }
"="                                 { return 'igual' }
"!="                                { return 'diferenteDe' }
"<="                                { return 'menorIgual' }
">="                                { return 'mayorIgual' }
"<"                                 { return 'menorQue' }
">"                                 { return 'mayorQue' }
"?"                                 { return 'interrogacionCierra' }
":"                                 { return 'dosPuntos' }
"!"                                 { return 'NOT' }
"||"                                { return 'OR' }
"&&"                                { return 'AND' }
"^"                                 { return 'XOR' }
"("                                 { return 'parentesisA' }
")"                                 { return 'parentesisC' }
";"                                 { return 'ptComa' }
","                                 { return 'coma' }   
"++"                                { return 'incremento' }
"--"                                { return 'decremento' }                                                                     
"+"                                 { return 'SUMA' }
"-"                                 { return 'RESTA' }
"/"                                 { return 'DIVISION' }                                    
"**"                                { return 'POTENCIA' }
"*"                                 { return 'MULTIPLICACION' }
"%"                                 { return 'MODULO' }
"{"                                 { return 'llaveA' }
"}"                                 { return 'llaveC' }
"["                                 { return 'corcheteA' }
"]"                                 { return 'corcheteC' }
                                                                      
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
[ \r\t]+                            {}
\n                                  {}
<<EOF>>                             return 'EOF';
.                                   {
                                        var consola = Singleton.getInstance(); 
                                        const error = new Errores(yylloc.first_line , yylloc.first_column,"El caracter "+ yytext+ "no se reconoce en el lenguaje.","Léxico");
                                        consola.add_errores(error);
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
%left umenos
%left parentesisA 

%start ini

%%

ini : INSTRUCCIONES EOF {return $1}  
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION { $1.push($2); $$=$1;}
                | INSTRUCCION { $$ = [$1] }
;

INSTRUCCION : DECLARACION ptComa { $$=$1; } 
            | ASIGNACION ptComa { $$=$1; } 
            | INCREMENTODECREMENTO ptComa 
            | SENTENCIAIF  
            | SENTENCIASWITCH 
            | SENTENCIAFOR  
            | SENTENCIADOWHILE 
            | SENTENCIAWHILE  
            | BREAK ptComa {$$= new Break( @1.first_line, @1.first_column);}
            | CONTINUE ptComa {$$= new Continue( @1.first_line, @1.first_column);}
            | INSTRUCCIONLLAMAR ptComa { $$=$1; } 
            | FUNCION { $$=$1; } 
            | METODO { $$=$1; } 
            | FUNCIONPRINTLN ptComa { $$=$1; } 
            | FUNCIONPRINT ptComa { $$=$1; } 
            | FUNCIONTYPEOF ptComa 
            | INSTRUCCIONRETURN ptComa { $$=$1; } 
            | VECTORES ptComa  
            | GRAFICARTS 
            | TERNARIO
            | PUSHFUNCION ptComa
            | POPFUNCION 
            | SPLICEFUNCION 
            | BLOQUE { $$=$1; } 
            | error    ptComa  { 
                var consola = Singleton.getInstance(); 
                const error = new Errores(yylloc.first_line , yylloc.first_column,`El caracter ${(this.terminals_[symbol] || symbol)} no se esperaba en esta posicion`,"Sintáctico");
                consola.add_errores(error);
                console.log("Error sintactico en la linea"+(yylineno+1));
                 }
;


DECLARACION : TIPODATO IDS igual EXPRESIONARITMETICA  {$$= new Declaracion($2,$1,$4,true,@1.first_line, @1.first_column );}
            | CONST TIPODATO IDS igual EXPRESIONARITMETICA {$$= new Declaracion($3,$2,$5,false,@1.first_line, @1.first_column );}
            | TIPODATO IDS {$$= new Declaracion($2,$1,null,false,@1.first_line, @1.first_column );}
;

ASIGNACION : id igual EXPRESIONARITMETICA  {$$= new Asignar($1,$3,@1.first_line, @1.first_column );}
            | id corcheteA entero corcheteC igual EXPRESIONARITMETICA
            | id corcheteA entero corcheteC corcheteA entero corcheteC igual EXPRESIONARITMETICA
;

IDS: IDS coma id  { $1.push($3);$$=$1;}
    | id {$$ = [$1]}
;

TIPODATO: INT {$$=Tipo.INT;} 
        | STRING {$$=Tipo.STRING;} 
        | BOOLEAN {$$=Tipo.BOOLEAN;} 
        | DOUBLE {$$=Tipo.DOUBLE;} 
        | CHAR {$$=Tipo.CHAR;} 
;

IGUALACIONDEDATO: decimal {$$=new Literal($1,Tipo.DOUBLE , @1.first_line, @1.first_column); console.log("pase por aca decimal");}
                | cadena {$$=new Literal($1,Tipo.STRING , @1.first_line, @1.first_column)}
                | booleano {$$=new Literal($1,Tipo.BOOLEAN , @1.first_line, @1.first_column)}
                | entero {$$=new Literal($1,Tipo.INT , @1.first_line, @1.first_column); console.log("pase por aca");}
                | caracter {$$=new Literal($1,Tipo.CHAR , @1.first_line, @1.first_column)}
                | null {$$=new Literal($1,Tipo.NULL , @1.first_line, @1.first_column)}
;


SENTENCIAIF: IF parentesisA EXPRESIONLOGICA parentesisC BLOQUE ELSE BLOQUE {$$=new If($3,$5,$7 , @1.first_line, @1.first_column)}
            | IF parentesisA EXPRESIONLOGICA parentesisC BLOQUE {$$=new If($3,$5,null, @1.first_line, @1.first_column)}
;


SENTENCIASWITCH: SWITCH parentesisA id parentesisC llaveA CASOS llaveC
;

CASOS: CASOS CASO
    | CASO
;

CASO: CASE IGUALACIONDEDATO dosPuntos INSTRUCCIONES
    | DEFAULT dosPuntos INSTRUCCIONES
;

SENTENCIAFOR: FOR parentesisA VARIABLEFOR EXPRESIONESRELACIONALES ptComa INCREMENTODECREMENTOFOR parentesisC BLOQUE {$$= new For($3,$4, $6, $8, @1.first_line, @1.first_column);}
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
                    | RESTA EXPRESIONARITMETICA %prec umenos {$$= new Aritmeticas(null,$2,opcionesAritmeticas.NEGADO, @1.first_line, @1.first_column);}
                    | parentesisA EXPRESIONARITMETICA parentesisC {$$=$2;}
                    | id  {$$= new Acceso($1,@1.first_line, @1.first_column);}   
                    | IGUALACIONDEDATO   {$$=$1;}
                    | EXPRESIONLLAMAR 
                    | FUNCIONTYPEOF 
                    | id incremento {$$= new IncrementoEx($1, @1.first_line, @1.first_column);}
                    | id decremento {$$= new DecrementoEx($1, @1.first_line, @1.first_column);}
                    | incremento id {$$= new IncrementoEx($2, @1.first_line, @1.first_column);}
                    | decremento id {$$= new DecrementoEx($2, @1.first_line, @1.first_column);}
                    | ROUNDEXP {$$=$1;}
                    | TOLOWEREXP {$$=$1;}
                    | TOUPPEREXP {$$=$1;}
                    | ACCESOVEC 
                    | TOCHARARRAYEXP 
                    | INDEXOFEXP 
                    | LENGTHEXP
                    | PUSHFUNCION 
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
                | NOT EXPRESIONLOGICA {$$= new Logicas(null,$2,opcionesLogicas.NOT, @1.first_line, @1.first_column);}
                | EXPRESIONESRELACIONALES {$$=$1;}
;

INCREMENTODECREMENTOFOR: INCREMENTODECREMENTO {$$=$1;}
                        | FORINCREMENTODECREMENTO {$$=$1;}
;

INCREMENTODECREMENTO: id incremento {$$= new Incremento($1, @1.first_line, @1.first_column);}
                    | id decremento {$$= new Decremento($1, @1.first_line, @1.first_column);}
                    | incremento id {$$= new Incremento($2, @1.first_line, @1.first_column);}
                    | decremento id {$$= new Decremento($2, @1.first_line, @1.first_column);}
;

FORINCREMENTODECREMENTO: id igual SUMARESTA {$$=$3;}
;

SUMARESTA: id SUMA SUMARESTA  {$$= new Aritmeticas($1,$3,opcionesAritmeticas.MAS, @1.first_line, @1.first_column);}
        | id RESTA SUMARESTA {$$= new Aritmeticas($1,$3,opcionesAritmeticas.MENOS, @1.first_line, @1.first_column);}
        | id {$$=$1;}     
        | IGUALACIONDEDATO {$$=$1;}
;

SENTENCIAWHILE: WHILE parentesisA EXPRESIONLOGICA parentesisC BLOQUE {$$= new While($3,$5, @1.first_line, @1.first_column);}
;

SENTENCIADOWHILE: DO BLOQUE WHILE parentesisA EXPRESIONLOGICA parentesisC BLOQUE 
;

METODO: VOID id parentesisA PARAMETROS parentesisC BLOQUE  {$$= new InsFuncion($2,$6,$4, Tipo.VOID, @1.first_line, @1.first_column);}
        | VOID id parentesisA parentesisC BLOQUE {$$= new InsFuncion($2,$5,[], Tipo.VOID, @1.first_line, @1.first_column);}
;

PARAMETROS: PARAMETROS coma EXPRESIONARITMETICA { $1.push($3);$$=$1;}
        | EXPRESIONARITMETICA {$$ = [$1]}
;


FUNCION: TIPODATO id parentesisA PARAMETROS parentesisC BLOQUE {$$= new InsFuncion($2,$6,$4, $1, @1.first_line, @1.first_column);}
        | TIPODATO id parentesisA parentesisC BLOQUE {$$= new InsFuncion($2,$5,[],$1, @1.first_line, @1.first_column);}
;

PARAMETROSCALL: PARAMETROSCALL coma EXPRESIONARITMETICA  { $1.push($3);$$=$1;}
            | EXPRESIONARITMETICA {$$ = [$1]}
;

INSTRUCCIONLLAMAR: CALL id parentesisA PARAMETROSCALL parentesisC 
                | CALL id parentesisA parentesisC 
;

EXPRESIONLLAMAR: id parentesisA PARAMETROSCALL parentesisC {$$= new Llamada($1,$3, @1.first_line, @1.first_column);}
                | id parentesisA  parentesisC {$$= new Llamada($1,[], @1.first_line, @1.first_column);}
;

INSTRUCCIONRETURN: RETORNO {$$= new Return(null, @1.first_line, @1.first_column);}
                | RETORNO EXPRESIONARITMETICA {$$= new Return($2, @1.first_line, @1.first_column);}
; 

FUNCIONPRINTLN: PRINTLN parentesisA EXPRESIONLOGICA parentesisC {$$= new Println($3, @1.first_line, @1.first_column);}
;

FUNCIONPRINT: PRINT parentesisA EXPRESIONLOGICA parentesisC {$$= new Print($3, @1.first_line, @1.first_column);}
;

FUNCIONTYPEOF: TYPEOF parentesisA EXPRESIONLOGICA parentesisC {$$= new TypeOf($3, @1.first_line, @1.first_column);}
;

BLOQUE: llaveA INSTRUCCIONES llaveC  {$$= new Bloque($2,@1.first_line, @1.first_column)}
        | llaveA llaveC {$$= new Bloque([],@1.first_line, @1.first_column)}
;

TOLOWEREXP: TOLOWER parentesisA EXPRESIONARITMETICA parentesisC {$$= new toLower($3,@1.first_line, @1.first_column)}
;

TOUPPEREXP: TOUPPER parentesisA EXPRESIONARITMETICA parentesisC {$$= new toUpper($3,@1.first_line, @1.first_column)}
;

ROUNDEXP: ROUND parentesisA EXPRESIONARITMETICA parentesisC {$$= new Round($3,@1.first_line, @1.first_column)}
;

VECTORES: TIPODATO id corcheteA corcheteC igual NEW TIPODATO corcheteA entero corcheteC
        | TIPODATO id corcheteA corcheteC igual corcheteA COMASVEC corcheteC
        | TIPODATO id corcheteA corcheteC corcheteA corcheteC igual NEW TIPODATO corcheteA entero corcheteC corcheteA entero corcheteC
        | TIPODATO id corcheteA corcheteC corcheteA corcheteC igual corcheteA COMASMATRIZ corcheteC
;

COMASVEC: COMASVEC coma EXPRESIONARITMETICA { $1.push($3); $$=$1;}
        | EXPRESIONARITMETICA {$$ = [$1]}
;

COMASMATRIZ: COMASMATRIZ coma corcheteA COMASVEC corcheteC { $1.push($4);$$=$1;}
            |corcheteA COMASVEC corcheteC {$$ = [$2]}
;

ACCESOVEC: id corcheteA entero corcheteC
            | id corcheteA entero corcheteC corcheteA entero corcheteC
;

TERNARIO: parentesisA EXPRESIONLOGICA parentesisC interrogacionCierra INSTRUCCIONTERNARIO dosPuntos INSTRUCCIONTERNARIO ptComa
;

TERNARIOEXP: parentesisA EXPRESIONLOGICA parentesisC interrogacionCierra EXPRESIONARITMETICA dosPuntos EXPRESIONARITMETICA ptComa
;

INSTRUCCIONTERNARIO: FUNCIONPRINT
                    | FUNCIONPRINTLN
                    | ASIGNACION
                    | INCREMENTODECREMENTO
                    | INSTRUCCIONLLAMAR

;

GRAFICARTS: GRAFICAR parentesisA parentesisC ptComa
;

LENGTHEXP: LENGTH parentesisA EXPRESIONARITMETICA parentesisC
;

TOCHARARRAYEXP: TOCHARARRAY parentesisA EXPRESIONARITMETICA parentesisC
;

INDEXOFEXP: id punto INDEXOF parentesisA EXPRESIONARITMETICA parentesisC
;

PUSHFUNCION: id punto PUSH parentesisA EXPRESIONARITMETICA parentesisC
;

POPFUNCION: id punto POP parentesisA EXPRESIONARITMETICA parentesisC ptComa
;

SPLICEFUNCION: id punto SPLICE parentesisA entero coma EXPRESIONARITMETICA parentesisC ptComa
;