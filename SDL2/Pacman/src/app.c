#include "app.h"

#include <SDL.h>

void init_app(App* app){
	int error_code;

	error_code = SDL_Init(SDL_INIT_EVERYTHING);
	if(error_code != 0){
		printf("[ERROR] SDL Initialization error: %s\n", SDL_GetError());
		return;
	}

	app->window = SDL_CreateWindow(
		"Hello SDL!",
		SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED,
		1000, 800, 0);

	app->renderer = SDL_CreateRenderer(app->window, -1, SDL_RENDERER_ACCELERATED);

	SDL_SetRenderDrawColor(app->renderer, 0, 0, 0, SDL_ALPHA_OPAQUE);
	SDL_RenderClear(app->renderer);

	app->is_running = true;
}

void handle_app_events(App* app){
	SDL_Event event;

	while(SDL_PollEvent(&event)) {
		switch(event.type){
		case SDL_KEYDOWN:
				break;
			case SDL_SCANCODE_Q:
				app->is_running = false;
				break;
			case SDL_QUIT:
				app->is_running = false;
				break;
		default:
			break;
		}
	}
}

void destroy_app(App* app){
	SDL_DestroyRenderer(app->renderer);
	SDL_DestroyWindow(app->window);
	SDL_Quit();
}