#ifndef STATUS_H
#define STATUS_H

enum Status {
    ON=0,
    OFF=1,

    PULSE=2,
    SET_BRIGHTNESS,
    SET_INTENSIVITY,
    SET_COLOR,

    SPIN_CLOCKWISE,
    SPIN_COUNTERCLOCKWISE,
    STOP_SPIN,

    MEASURE
};

#endif