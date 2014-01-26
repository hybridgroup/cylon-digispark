#ifndef LITTLEWIRE_UTIL_H
#define LITTLEWIRE_UTIL_H

#ifdef _WIN32
  #include <windows.h>
#else
  #include <unistd.h>
#endif

#ifdef __cplusplus
extern "C" {
#endif

/* Delay in miliseconds */
void delay(unsigned int duration);

#ifdef __cplusplus
}
#endif

#endif
