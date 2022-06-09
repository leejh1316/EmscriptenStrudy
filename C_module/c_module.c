#include <emscripten/emscripten.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>

int increment(int value){
    return (value+1);
}
int decrement(int value){
    return (value-1);
}

typedef struct titleStruct{
    int pValue1;
    int pValue1Length;
} titleStruct;
titleStruct EMSCRIPTEN_KEEPALIVE *titleSplit(char *titleString, char *delimit){
    titleStruct *ts = (titleStruct *)malloc(sizeof(titleStruct));
    char **strings[1][10];
    char *splitString = strtok(titleString, delimit);
    int i=0,j=0;
    while(splitString!=NULL){
        strings[0][i] = splitString;
        i++;
        splitString = strtok(NULL,delimit);
    }
    ts->pValue1 = strings[0][0];
    ts->pValue1Length = i;
    return ts;
}

// inject C
typedef struct _pointerSetting{
    int pValue1;
    int pValue2;
    int pValue1Length;
    int pValue2Length;
} setPointer;
setPointer EMSCRIPTEN_KEEPALIVE *injectStringSplit(char *injectString, char *delimit, char *delimit2){
    setPointer *sp = (setPointer *)malloc(sizeof(setPointer));
    int i=0,j=0;
    char *strArr[2]= {NULL, };
    // strings 크기 사이즈 
    char **strings[2][50];
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
        if(i==0){
            sp->pValue1Length = j;
        } else{
            sp->pValue2Length = j;
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