#ifndef UTIL_H
#define UTIL_H

#include <CommandValue.h>

class Util{
public:
    Util();
    //int* getRGBFromCharArr(char arr[]);
    char* splitCharArr(char arr[], char arrTo[], int firstIndex, int lastIndex, int arrToStartIndex=0);
    char* concatCharArr(char* arr1, char* arr2, char* arrTo, int arr1Size, int arr2Size);
    bool areCharArrSame(char* arr1, char* arr2, int arr1Size, int arr2Size);
    void parseValueCharArrToMapArr(char arr[], char* arrTo[], int arrSize);
    void getFromMapArr(char key[], char* arr[], char* arrTo[], int keySize, int arrSize);       
};

#endif