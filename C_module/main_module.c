#include <stdio.h>
#include <emscripten/emscripten.h>
typedef struct _StrSplit{
    int length;
    char string[5][50];
    char copy[50];
    char *splitString;
} StrSplit;
// +1
int EMSCRIPTEN_KEEPALIVE increment(int value){
    return (value+1);
}
// -1
int EMSCRIPTEN_KEEPALIVE decrement(int value){
    return (value-1);
}
// string length 
int EMSCRIPTEN_KEEPALIVE length(char *string){
    int cnt=0;
    while(string[cnt]!='\0'){
        ++cnt;
    }
    return cnt;
}
// string copy
char EMSCRIPTEN_KEEPALIVE *string_copy(char *s1, char *s2){
    while(*s2!='\0'){
        *s1=*s2;
        s1++;
        s2++;
    }
    *s1='\0';
    return s1;
}
// string split
char* EMSCRIPTEN_KEEPALIVE StringTokenize(char *str, char* delim){ 
	char* sStr=0; 
	static char * tstr;
	int i=0; 
	if(str!=NULL)sStr=str;
	else sStr=tstr;  
    if(length(sStr)<1)return NULL;  
    for(i=0; i<length(sStr); i++){ 
    	if(sStr[i] == (*delim)||sStr[i] == '\0'){ 
    	sStr[i]='\0'; 
    	break; 
    	} 
    } 
    tstr=&sStr[i+1]; ; 
    return sStr; 
} 
int EMSCRIPTEN_KEEPALIVE test(int charCode){
    int i=0;
    charCode = charCode+1;
    return charCode;
}
StrSplit EMSCRIPTEN_KEEPALIVE Str_split(char str[], char *delimit){
    StrSplit sp;
    int i=0;
    sp.length = length(str);
    string_copy(sp.copy, str);
    sp.splitString = StringTokenize(sp.copy, delimit);
    while(sp.splitString!=NULL){
        string_copy(sp.string[i],sp.splitString);
        i++;
        sp.splitString = StringTokenize(NULL, delimit);
    }
    return sp;
}
int main(){
    printf("Main Module Load completion");
    return 0;
}