#ifndef LITTLEWIRE_UTIL_H
#define LITTLEWIRE_UTIL_H

#ifdef __linux__
	#include <unistd.h>
#else
	#include <windows.h>
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
