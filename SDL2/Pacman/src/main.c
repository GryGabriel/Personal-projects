#include <stdio.h>
#include <SDL.h>
#include <stdbool.h>

int main(int argc, char* argv[]){
	SDL_Window* window;
	SDL_Event event;
	SDL_Renderer* renderer;
	int error_code;
	bool running;

	error_code = SDL_Init(SDL_INIT_EVERYTHING);
	if(error_code != 0){
		printf("[ERROR] SDL Initialization error: %s\n", SDL_GetError());
		return error_code;
	}

	window = SDL_CreateWindow(
		"Hello SDL!",
		SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED,
		800, 600, 0);

	renderer = SDL_CreateRenderer(window, -1, SDL_RENDERER_ACCELERATED);

	SDL_SetRenderDrawColor(renderer, 0, 0, 0, SDL_ALPHA_OPAQUE);
	SDL_RenderClear(renderer);

	running = true;
	while(running){
		while(SDL_PollEvent(&event)) {
			switch(event.type){
			case SDL_KEYDOWN:
				case SDL_SCANCODE_Q:
				running = false;
				break;
			case SDL_QUIT:
				running = false;
				break;
			}
		}
	}
		
	SDL_DestroyRenderer(renderer);
	SDL_DestroyWindow(window);
	SDL_Quit();

	return 0;

}
