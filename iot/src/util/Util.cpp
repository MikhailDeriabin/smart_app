#include "Util.h"
#include "Converter.h"

Converter converter;

Util::Util(){}

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

    redValue = splitCharArr(arr, 0, firstCommaIndex-1);
    greenValue = splitCharArr(arr, firstCommaIndex+1, secondCommaIndex-1);
    blueValue = splitCharArr(arr, secondCommaIndex+1);

    red = converter.charArrToInt(redValue);
    green = converter.charArrToInt(greenValue);
    blue = converter.charArrToInt(blueValue);

    int result[] = {red, green, blue};
    return result;
}

char* splitCharArr(char arr[], int firstIndex, int lastIndex=-1){
    if(lastIndex == -1){
        lastIndex = sizeof(arr)-1;
    }

    char result[lastIndex - firstIndex + 1];
    int j = 0;
    for(int i=firstIndex; i<lastIndex+1; i++){
        result[j] = arr[i];
        j++;
    }

    return result;
}