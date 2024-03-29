#ifndef STATUS_H
#define STATUS_H

enum Status {
    ON,
    OFF,

    PULSE,
    SET_BRIGHTNESS,
    SET_INTENSIVITY,
    SET_COLOR,

    SPIN_CLOCKWISE,
    SPIN_COUNTERCLOCKWISE,
    STOP_SPIN,

    MEASURE
};

#endif