#include <Arduino.h>
#include <Converter.h>
#include <Util.h>
#include <Component.h>

Converter converter;

Util::Util(){}

char* Util::splitCharArr(char arr[], char arrTo[], int firstIndex, int lastIndex, int arrToStartIndex){
    int j = arrToStartIndex;
    for(int i=firstIndex; i<=lastIndex; i++){
        arrTo[j] = arr[i];
        j++;
    }

    return arrTo;
}

char* Util::concatCharArr(char* arr1, char* arr2, char* arrTo, int arr1Size, int arr2Size){
    int i;
    for(i=0; i<arr1Size; i++){
        arrTo[i] = arr1[i];
    }

    for(int j=0; j<arr2Size; j++){
        i++;
        arrTo[i] = arr2[j];
    }

    return arrTo;
}

bool Util::areCharArrSame(char* arr1, char* arr2, int arr1Size, int arr2Size){
    if(arr1Size != arr2Size)
        return false;

    for(int i=0; i<arr1Size; i++){
        if(arr1[i] != arr2[i])
            return false;
    }

    return true;
}

void Util::getValueFromValueString(CommandValue commandValue, char str[], char valueArr[], int strSize, int* valueSize){
    int keyStartIndex = 0, doublePointIndex = 0, commaIndex = 0;

    for(int i=0; i<strSize; i++){
        //find double point index
        if(str[i] == ':'){
            doublePointIndex = i;
            
            //find comma index (or end of array)
            for(;i<strSize; i++){
                if(str[i] == ',' || i == strSize-1){
                    commaIndex = i;
                    break;
                }
            }

            //get key of the current value
            int currentKeySize = doublePointIndex-keyStartIndex;

            char currentKey[currentKeySize];
            splitCharArr(str, currentKey, keyStartIndex, doublePointIndex-1);
            int currentKeyInt = converter.charArrToInt(currentKey, currentKeySize);
            
            //if key found, put it to the pointer array and return from function
            if(commandValue == currentKeyInt){               
                *valueSize = i-doublePointIndex-1;
                splitCharArr(str, valueArr, doublePointIndex+1, commaIndex-1);
                return;
            }

            keyStartIndex = commaIndex+1;
        }
    }

    *valueSize = 0;
}

void Util::getValueIndexesFromValueString(CommandValue key, char str[], int strSize, int* valueStartIndex, int* valueEndIndex){
    int keyStartIndex = 0, doublePointIndex = 0, commaIndex = 0;

    for(int i=0; i<strSize; i++){
        //find double point index
        if(str[i] == ':'){
            doublePointIndex = i;
            
            //find comma index (or end of array)
            for(;i<strSize; i++){
                if(str[i] == ',' || i == strSize-1){
                    commaIndex = i;
                    break;
                }
            }

            //get key of the current value
            int currentKeySize = doublePointIndex-keyStartIndex;

            char currentKey[currentKeySize];
            splitCharArr(str, currentKey, keyStartIndex, doublePointIndex-1);
            int currentKeyInt = converter.charArrToInt(currentKey, currentKeySize);
            
            //if key found, put value start and end indexes to pointers and return from method
            if(key == currentKeyInt){
                *valueStartIndex = doublePointIndex+1;
                *valueEndIndex = commaIndex-1;
                return;
            }

            keyStartIndex = commaIndex+1;
        }
    }

    *valueStartIndex = -1;
    *valueEndIndex = -1;
}

float Util::getFloatValueFromValueString(CommandValue key, char str[], int strSize){
    //find value indexes for provided key
    int valueStartIndex, valueEndIndex;
    getValueIndexesFromValueString(key, str, strSize, &valueStartIndex, &valueEndIndex);

    //if something found
    if(valueStartIndex != -1){
        //get the value to array
        int valueCharArrSize = valueEndIndex-valueStartIndex+1;
        char valueCharArr[valueCharArrSize];
        int j = valueStartIndex;
        for(int i=0; i<valueCharArrSize; i++){
            valueCharArr[i] = str[j];
            j++;
        }
            
        //parse it float
        float interval = converter.charArrToFloat(valueCharArr, valueCharArrSize);    
        return interval;
    }
    
    return -1;
}

int Util::getIntValueFromValueString(CommandValue key, char str[], int strSize){
    //find value indexes for provided key
    int valueStartIndex, valueEndIndex;
    getValueIndexesFromValueString(key, str, strSize, &valueStartIndex, &valueEndIndex);

    //if something found
    if(valueStartIndex != -1){
        //get the value to array
        int valueCharArrSize = valueEndIndex-valueStartIndex+1;
        char valueCharArr[valueCharArrSize];
        int j = valueStartIndex;
        for(int i=0; i<valueCharArrSize; i++){
            valueCharArr[i] = str[j];
            j++;
        }
            
        //parse it float
        float interval = converter.charArrToInt(valueCharArr, valueCharArrSize);    
        return interval;
    }
    
    return -1;
}

Component* Util::getDeviceIdFromTopic(char* clientId, char* topic, Component* components[], int size){
    String topicStart = clientId;
    topicStart += "/";
    for(int i=0; i<size; i++){
        String wholeTopic = topicStart + i;
        if(wholeTopic == topic){
            return components[i];
        }
    }
    return nullptr;
}