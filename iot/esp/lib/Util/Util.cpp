#include <Arduino.h>
#include <Converter.h>
#include <Util.h>

Converter converter;

Util::Util(){}

/*
int* Util::getRGBFromCharArr(char arr[]){
    char* redValue;
    char* greenValue;
    char* blueValue;
    int red = 0, green = 0, blue = 0;
    int firstCommaIndex = -1, secondCommaIndex = -1;

    for(int i=0; i<sizeof(arr); i++){
        if(arr[i] == ','){
            if(firstCommaIndex == -1){
                firstCommaIndex = i;
            } else{
                secondCommaIndex = i;
                break;
            }
        }
    }

    //redValue = splitCharArr(arr, 0, firstCommaIndex-1);
    //greenValue = splitCharArr(arr, firstCommaIndex+1, secondCommaIndex-1);
    //blueValue = splitCharArr(arr, secondCommaIndex+1, sizeof(arr));

    red = converter.charArrToInt(redValue, sizeof(redValue));
    green = converter.charArrToInt(greenValue, sizeof(greenValue));
    blue = converter.charArrToInt(blueValue, sizeof(blueValue));

    int result[] = {red, green, blue};
    return result;
}
*/

char* Util::splitCharArr(char arr[], char arrTo[], int firstIndex, int lastIndex, int arrToStartIndex){
    int j = arrToStartIndex;
    for(int i=firstIndex; i<=lastIndex; i++){
        /*Serial.print(i);
        Serial.print(": ");
        Serial.println(arr[i]);*/
        arrTo[j] = arr[i];
        j++;
    }
    //Serial.println("---------------------***********************");

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

void Util::parseValueCharArrToMapArr(char arr[], char* arrTo[], int arrSize){
    int startIndex = 0, commaIndex = 0;
    int j = 0;

    for(int i=0; i<arrSize; i++){
        if(arr[i] == ','){
            commaIndex = i;

            splitCharArr(arr, arrTo[j], startIndex, commaIndex);
            j++;
            startIndex = i+1;
        }
    }

    if(arr[arrSize-1] != ','){
        splitCharArr(arr, arrTo[j], commaIndex+1, arrSize-1);
    }
}

void Util::getFromMapArr(char key[], char* arr[], char* arrTo[], int keySize, int arrSize){
    for(int i=0; i<arrSize; i++){
        char currentKey[keySize]; 
        splitCharArr(arr[i], currentKey, 0, keySize-1);
        bool isKeySame = areCharArrSame(key, currentKey, keySize, keySize);
        if(isKeySame){

        }
    }
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