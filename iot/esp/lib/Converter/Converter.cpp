#include <Converter.h>

Converter::Converter(){}

float Converter::charArrToFloat(char arr[], int arrSize){
    float result=0;
    //find dot place
    int dotIndex = arrSize-1;
    for(int i=0; i<arrSize; i++){
        if(arr[i] == '.')
            dotIndex = i;
    }

    int multiplier = 1;
    int devider = 1;
    for(int i=arrSize-1; i>=0; i--){
        if(i == dotIndex){
            devider = multiplier;
            continue;
        }
            
        result += (int) arr[i]*multiplier;
        multiplier *= 10;
    }

    return result/devider;
}

int Converter::charArrToInt(char arr[], int arrSize){
    int result=0;

    int multiplier = 1;
    for(int i=arrSize-1; i>=0; i--){
        result += (arr[i]-'0')*multiplier;
        multiplier *= 10;
    }

    return result;
}