#ifndef CONVERTER_H
#define CONVERTER_H

class Converter{
public:
    Converter();
    float charArrToFloat(char arr[], int arrSize);
    int charArrToInt(char arr[], int arrSize);
    //TODO: int to char method
    char* intToCharArr(int arr, char arrTo[]);
};

#endif