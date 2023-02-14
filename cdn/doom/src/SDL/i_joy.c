/* Emacs style mode select   -*- C++ -*-
 *-----------------------------------------------------------------------------
 *
 *
 *  PrBoom: a Doom port merged with LxDoom and LSDLDoom
 *  based on BOOM, a modified and improved DOOM engine
 *  Copyright (C) 1999 by
 *  id Software, Chi Hoang, Lee Killough, Jim Flynn, Rand Phares, Ty Halderman
 *  Copyright (C) 1999-2000 by
 *  Jess Haas, Nicolas Kalkhof, Colin Phipps, Florian Schulze
 *  Copyright 2005, 2006 by
 *  Florian Schulze, Colin Phipps, Neil Stevens, Andrey Budko
 *
 *  This program is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU General Public License
 *  as published by the Free Software Foundation; either version 2
 *  of the License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program; if not, write to the Free Software
 *  Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA
 *  02111-1307, USA.
 *
 * DESCRIPTION:
 *   Joystick handling for Linux
 *
 *-----------------------------------------------------------------------------
 */

#ifndef lint
#endif /* lint */

#include <stdlib.h>

#include "SDL.h"
#include "doomdef.h"
#include "doomtype.h"
#include "m_argv.h"
#include "d_event.h"
#include "d_main.h"
#include "i_joy.h"
#include "lprintf.h"

// emscripten
#include <emscripten.h>
#include <emscripten/html5.h>

int joyleft;
int joyright;
int joyup;
int joydown;

int usejoystick;

#ifdef HAVE_SDL_JOYSTICKGETAXIS
static SDL_Joystick *joystick;
#endif

static void I_EndJoystick(void)
{
  lprintf(LO_DEBUG, "I_EndJoystick : closing joystick\n");
}

void I_PollJoystick(void)
{
#ifdef HAVE_SDL_JOYSTICKGETAXIS
  event_t ev;
  Sint16 axis_value;

  if (!usejoystick || (!joystick)) return;
  ev.type = ev_joystick;
  ev.data1 =
    (SDL_JoystickGetButton(joystick, 0)<<0) |
    (SDL_JoystickGetButton(joystick, 1)<<1) |
    (SDL_JoystickGetButton(joystick, 2)<<2) |
    (SDL_JoystickGetButton(joystick, 3)<<3) |
    (SDL_JoystickGetButton(joystick, 4)<<4) |
    (SDL_JoystickGetButton(joystick, 5)<<5) |
    (SDL_JoystickGetButton(joystick, 6)<<6) |
    (SDL_JoystickGetButton(joystick, 7)<<7) |
    (SDL_JoystickGetButton(joystick, 8)<<8) |
    (SDL_JoystickGetButton(joystick, 9)<<9) |
    (SDL_JoystickGetButton(joystick, 10)<<10) |
    (SDL_JoystickGetButton(joystick, 11)<<11);

  // for (int i = 0; i < 16; i++) {
  //   int val = SDL_JoystickGetButton(joystick, i);
  //   if (val) {
  //     printf("Button down: %d %d\n", i, sizeof(ev.data1));
  //   }
  // }

  //axis_value = SDL_JoystickGetAxis(joystick, 0) / 3000;
  axis_value = SDL_JoystickGetAxis(joystick, 0);
  if (abs(axis_value)<15000) {
    axis_value = 
      SDL_JoystickGetButton(joystick, 14) ? -1 : 
        SDL_JoystickGetButton(joystick, 15) ? 1 : 0;
  } else {
    axis_value = axis_value > 0 ? 1 : -1;
  } 
  //if (abs(axis_value)<10) axis_value=0;
  ev.data2 = axis_value;
  axis_value = SDL_JoystickGetAxis(joystick, 1);
  if (abs(axis_value)<15000) {
    axis_value = 
      SDL_JoystickGetButton(joystick, 12) ? -1 : 
        SDL_JoystickGetButton(joystick, 13) ? 1 : 0;
  } else {
     axis_value = axis_value > 0 ? 1 : -1;
  }
  //axis_value = SDL_JoystickGetAxis(joystick, 1) / 3000;
  //if (abs(axis_value)<10) axis_value=0;
  ev.data3 = axis_value;

  D_PostEvent(&ev);
#endif
}

// emscripten
EM_BOOL gamepad_callback(int eventType, const EmscriptenGamepadEvent *e, void *userData)
{
  printf("%s: timeStamp: %g, connected: %d, index: %ld, numAxes: %d, numButtons: %d, id: \"%d\", mapping: \"%s\"\n",
    eventType, "Gamepad state", e->timestamp, e->connected, e->index,
    e->numAxes, e->numButtons, e->id, e->mapping);

  if (e->connected)
  {
    for(int i = 0; i < e->numAxes; ++i)
      printf("Axis %d: %g\n", i, e->axis[i]);

    for(int i = 0; i < e->numButtons; ++i)
      printf("Button %d: Digital: %d, Analog: %g\n", i, e->digitalButton[i], e->analogButton[i]);

    if (!joystick) {
      joystick = SDL_JoystickOpen(usejoystick-1);
      if (!joystick)
        lprintf(LO_ERROR, "Error opening joystick\n");
      else {
        atexit(I_EndJoystick);
        lprintf(LO_INFO, "Joystick: Opened %s\n", SDL_JoystickName(usejoystick-1));
        joyup = 32767;
        joydown = -32768;
        joyright = 32767;
        joyleft = -32768;
      }
    }
  }

  return 0;
}

void I_InitJoystick(void)
{  
  // emscripten
  EMSCRIPTEN_RESULT ret = emscripten_set_gamepadconnected_callback(0, 1, gamepad_callback);
  ret = emscripten_set_gamepaddisconnected_callback(0, 1, gamepad_callback);

#ifdef HAVE_SDL_JOYSTICKGETAXIS
  const char* fname = "I_InitJoystick : ";
  int num_joysticks;

  if (!usejoystick) return;
  SDL_InitSubSystem(SDL_INIT_JOYSTICK);
  num_joysticks=SDL_NumJoysticks();
  if (M_CheckParm("-nojoy") || (usejoystick>num_joysticks) || (usejoystick<0)) {
    if ((usejoystick > num_joysticks) || (usejoystick < 0))
      lprintf(LO_WARN, "%sinvalid joystick %d\n", fname, usejoystick);
    else
      lprintf(LO_INFO, "%suser disabled\n", fname);
    return;
  }
  //joystick=SDL_JoystickOpen(usejoystick-1);
  joystick= SDL_JoystickOpen(usejoystick-1);
  if (!joystick)
    lprintf(LO_ERROR, "%serror opening joystick %s\n", fname, SDL_JoystickName(usejoystick-1));
  else {
    atexit(I_EndJoystick);
    lprintf(LO_INFO, "%sopened %s\n", fname, SDL_JoystickName(usejoystick-1));
    joyup = 32767;
    joydown = -32768;
    joyright = 32767;
    joyleft = -32768;
  }
#endif
}
