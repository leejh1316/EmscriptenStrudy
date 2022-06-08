#include <emscripten/emscripten.h>
#include <string.h>
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

char EMSCRIPTEN_KEEPALIVE *getString(){
    char str[2][30];
    strcpy(str[0] ,"hello, world");
    strcpy(str[1] ,"emscripten hard");
    char **s1 = malloc(sizeof(char *)*2);
    int i=0,j=0;
    for(i=0;i<2;i++){
        s1[i] = malloc(sizeof(char)*256);
    }
    for(i=0;i<2;i++){
        for(j=0;j<strlen(str[i]);j++){
            
        }
    }
    return s1;

}
int mina(){
    return 0;
};