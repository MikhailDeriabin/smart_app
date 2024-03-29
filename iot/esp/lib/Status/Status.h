#ifndef STATUS_H
#define STATUS_H

enum Status {
    OFF,
    ON,  

    PULSE,
    SET_BRIGHTNESS,
    SET_INTENSIVITY,
    SET_COLOR,

    SPIN_CLOCKWISE,
    SPIN_COUNTERCLOCKWISE,
    CHANGE_SPIN_DIRECTION,
    STOP_SPIN,

    MEASURE
};

#endif