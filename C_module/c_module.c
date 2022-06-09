#include <emscripten/emscripten.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
char EMSCRIPTEN_KEEPALIVE *strSplit(char *string, char *delimit){
    int i=0;
    char *splitArray[10]= {NULL,};
    char scopy[50];
    strcpy(scopy,string);
    char *splitString = strtok(scopy, delimit);
    while(splitString != NULL){
        splitArray[i] = splitString;
        i++;
        splitString = strtok(NULL,delimit);
    };
    return splitArray;
}
typedef struct _pointerSetting{
    int pValue1;
    int pValue2;
} setPointer;
setPointer EMSCRIPTEN_KEEPALIVE *getString(){
    setPointer *sp = (setPointer *)malloc(sizeof(setPointer));
    char str[2][30];
    strcpy(str[0] ,"hello, worldddddddd");
    strcpy(str[1] ,"emscripten hard");
    char **s1 = malloc(sizeof(char *)*2);
    int i=0,j=0;
    for(i=0;i<2;i++){
        s1[i] = malloc(sizeof(char)*256);
    }
    for(i=0;i<2;i++){
      strcpy(s1[i],str[i]);
    }
    sp->pValue1 = s1[0];
    sp->pValue2 = s1[1];
    return sp;
}



setPointer EMSCRIPTEN_KEEPALIVE *injectStringSplit(char *injectString, char *delimit, char *delimit2){
    setPointer *sp = (setPointer *)malloc(sizeof(setPointer));
    int i=0,j=0;
    char *strArr[2]= {NULL, };
    char ***strings = (char ***)malloc(sizeof(char *)*2);
    strings[0] = (char **)malloc(sizeof(char *)*50);
    strings[1] = (char **)malloc(sizeof(char *)*50);
    char *splitString = strtok(injectString,delimit);
    while(splitString!=NULL){
        strArr[i] = splitString;
        i++;
        splitString = strtok(NULL,delimit);
    }
    // check;
    for(i=0;i<2;i++){
        printf("splitCheck = %s\n",strArr[i]);
    }
    for(i=0;i<2;i++){
        splitString = strtok(strArr[i],delimit2);
        j=0;
        while(splitString!=NULL){
            strings[i][j] = splitString;
            j++;
            splitString = strtok(NULL, delimit2);
        }
    }
    // strings check;
    for(i=0;i<2;i++){
        j=0;
        while(strings[i][j]!=NULL){
            printf("strings[%d][%d] = %s \n", i,j,strings[i][j]);
            j++;
        }
    }
    sp->pValue1 = strings[0][0];
    sp->pValue2 = strings[1][0];
    return sp;
}
int mina(){
    return 0;
};