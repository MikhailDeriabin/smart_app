#ifndef CONVERTER_H
#define CONVERTER_H

class Converter{
public:
    Converter();
    float charArrToFloat(char arr[], int arrSize);
    int charArrToInt(char arr[], int arrSize);
    char* intToCharArr(int num, char arrTo[], int* arrSize);
    char* floatToCharArr(float num, char arrTo[], int* arrSize);
};

#endif