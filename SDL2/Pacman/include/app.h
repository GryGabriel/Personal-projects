#ifndef APP_H
#define APP_H
	
#include <SDL.h>
#include <stdbool.h>


typedef struct App
{
	SDL_Window* window;
	SDL_Renderer* renderer;
	bool is_running;
} App;

void init_app(App*);

void handle_app_events(App*);

void destroy_app(App*);

#endif