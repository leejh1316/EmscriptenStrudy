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
// 최대 입력크기 _ 및 , 포함 250자
// 최대 동적메모리 크기 [2][length+1];
// injectData input -> 1,2,3,4_5,6,7,8 -> pointer [1,2,3,4], [5,6,7,8]
// ex "1,2,3_4,5,6" , "_", ","

// 수정필요 !! 3차원배열로 malloc 할것
// [["",""]] [0][0] = "abcd" 

setPointer EMSCRIPTEN_KEEPALIVE *injectStringSplit(char *injectString, char *delimit, char *delimit2){
    setPointer *sp = (setPointer *)malloc(sizeof(setPointer));
    int length = strlen(injectString);
    char copyString[250];
    // copy = 1,2,3_4,5,6 
    strcpy(copyString,injectString);
    // split 1,2,3_4,5,6 "_" -> 1,2,3 
    char *splitString1 = strtok(copyString,delimit);
    // 1,2,3 "," -> 1
    char *splitString2 = strtok(splitString1, delimit2);
    char **mallocString = malloc(sizeof(char *)*2);
    mallocString[0] = malloc(sizeof(char)*length+1);
    mallocString[1] = malloc(sizeof(char)*length+1);
    int index1=0,index2=0;
    while(splitString1!=NULL){
        while(splitString2!=NULL){
            // strcpy(mallocString[index1][index2],splitString2);
            mallocString[inedx1][index2] = splitString2;
            index2++;
            splitString2 = strtok(NULL,delimit2);
        }
        index1++;
        splitString1 = strtok(NULL,delimit);
    }
    sp->pValue1 = mallocString[0];
    sp->pValue2 = mallocString[1];
    return sp;
}
int mina(){
    return 0;
};