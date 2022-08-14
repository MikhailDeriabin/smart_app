#include <Converter.h>
#include <Arduino.h>

Converter::Converter(){}

float Converter::charArrToFloat(char arr[], int arrSize){
    float result=0;
    //find dot place
    int dotIndex = -1;
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
            
        result += (arr[i]-'0')*multiplier;
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

char* Converter::intToCharArr(int num, char arrTo[], int* arrSize){
    int zeroCount = 0;
    float floatNum = (float) num;

    while(floatNum/10 > 1){
        floatNum /= 10;
        zeroCount++;
    }

    *arrSize = zeroCount+1;

    floatNum = (float) num;
    for(int i=zeroCount; i>=0; i--){
        int digit = (int) floatNum % 10;
        floatNum /= 10;
        arrTo[i] = digit + '0';
    }

    return arrTo;
}

char* Converter::floatToCharArr(float num, char arrTo[], int* arrSize){
    int pointIndex = 1;
    float tempNum = num;
    
    if(num == 0){
        *arrSize = 1;
        arrTo[0] = '0';
        return arrTo;
    }

    while(tempNum/10 > 1){
        tempNum /= 10;
        pointIndex++;
    }

    tempNum = num;
    float intPart = (int) num;
    int floatPartSize = 0;

    while(tempNum/intPart != 1.0f){
        tempNum *= 10;
        intPart = (int) tempNum;
        floatPartSize++;
    }    

    int numSize = pointIndex+floatPartSize;
    if(floatPartSize > 0)
        numSize++;
    *arrSize = numSize;
    
        

    int tempNumInt = (int)tempNum;
    for(int i=numSize-1; i>=0; i--){
        if(i != pointIndex){
            int digit = (int) tempNumInt % 10;
            tempNumInt /= 10;
            arrTo[i] = digit + '0';
        } else{
            arrTo[i] = '.';
        }       
    }

    return arrTo;
}