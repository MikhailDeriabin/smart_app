#ifndef UTIL_H
#define UTIL_H

#include <CommandValue.h>
#include <Component.h>

class Util{
public:
    Util();
    char* splitCharArr(char arr[], char arrTo[], int firstIndex, int lastIndex, int arrToStartIndex=0);
    char* concatCharArr(char* arr1, char* arr2, char* arrTo, int arr1Size, int arr2Size);
    bool areCharArrSame(char* arr1, char* arr2, int arr1Size, int arr2Size);

    void getValueFromValueString(CommandValue commandValue, char str[], char valueArr[], int strSize, int* valueSize); 
    void getValueIndexesFromValueString(CommandValue key, char str[], int strSize, int* valueStartIndex, int* valueEndIndex);
    float getFloatValueFromValueString(CommandValue key, char str[], int strSize);
    int getIntValueFromValueString(CommandValue key, char str[], int strSize);

    Component* getDeviceIdFromTopic(char* clientId, char* topic, Component* components[], int size);
};

#endif