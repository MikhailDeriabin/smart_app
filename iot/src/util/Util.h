#ifndef UTIL_H
#define UTIL_H

class Util{
public:
    Util();
    int* getRGBFromCharArr(char arr[]);
    char* splitCharArr(char arr[], int firstIndex, int lastIndex=-1);
};

#endif