#include <emscripten/emscripten.h>
int EMSCRIPTEN_KEEPALIVE increment(int value){
    return (value+1);
}
int EMSCRIPTEN_KEEPALIVE decrement(int value){
    
    return (value-1);
}
int EMSCRIPTEN_KEEPALIVE strSplit(int charCode, int deliCode){
    //구분자와 같을때 
    if(charCode ==  deliCode){
        return 0;
    }
    //구분자와 다를때
    else {
        return charCode;
    }
}

int main(){
    return 0;
}