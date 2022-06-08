#include <math.h>
#include <emscripten/emscripten.h>
#include <string.h>
#include <stdlib.h>
typedef struct _StrSplit{
    int length;
    char string[5][50];
    char copy[50];
    char *splitString;
} StrSplit;
int EMSCRIPTEN_KEEPALIVE int_sqrt(int x){
    return sqrt(x);
}
int EMSCRIPTEN_KEEPALIVE add(int x){
    return (x+1);
}
int EMSCRIPTEN_KEEPALIVE length(char *string){
    int cnt=0;
    while(string[cnt]!='\0'){
        ++cnt;
    }
    return cnt;
}
int EMSCRIPTEN_KEEPALIVE len(char *string){
    return strlen(string);
};
int EMSCRIPTEN_KEEPALIVE testArray(int *arr, int size){
    int i=0;
    for(i=0;i<size;i++){
        arr[i]=arr[i]+1;
    }
    return arr;
}
char EMSCRIPTEN_KEEPALIVE *string_copy(char *s1, char *s2){
    while(*s2!='\0'){
        *s1=*s2;
        s1++;
        s2++;
    }
    *s1='\0';
    return s1;
}
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
StrSplit EMSCRIPTEN_KEEPALIVE Str_split(char *str, char *delimit){
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

char EMSCRIPTEN_KEEPALIVE *strSplit(char *string, char *delimit){
    int i=0;
    char *splitArray[10]= {NULL,};
    char *splitString = strtok(string, " ");
    while(splitString != NULL){
        splitArray[i] = splitString;
        i++;
        splitString = strtok(NULL," ");
    };
    return splitArray;
}

typedef struct st_study
{
        int value_1;
        int value_2;
} study;
 
EMSCRIPTEN_KEEPALIVE
study* init_struct(int value_1st, int value_2nd)
{
        study* stStudy = (study*)malloc(sizeof(study));
 
        stStudy->value_1 = value_1st;
        stStudy->value_2 = value_2nd;
 
        return stStudy;
}
int main(){
    return 0;
}