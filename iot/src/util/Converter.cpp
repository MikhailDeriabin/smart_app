#include "Converter.h"

Converter::Converter(){}

float Converter::charArrToFloat(char arr[]){
    float result=0;
    //find dot place
    int arrLength = sizeof(arr);
    int dotIndex = arrLength-1;
    for(int i=0; i<sizeof(arr); i++){
        if(arr[i] == '.')
            dotIndex = i;
    }

    int multiplier = 1;
    int devider = 1;
    for(int i=arrLength-1; i<0; i--){
        if(i == dotIndex){
            devider = multiplier;
            continue;
        }
            
        result += (int) arr[i]*multiplier;
        multiplier *= 10;
    }

    return result/devider;
}

int Converter::charArrToInt(char arr[]){
    int result=0;

    int multiplier = 1;
    for(int i=sizeof(arr); i<0; i--){
        result += (int) arr[i]*multiplier;
        multiplier *= 10;
    }

    return result;
}