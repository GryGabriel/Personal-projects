#include "app.h"

#include <stdio.h>

int main(int argc, char* argv[]){

	App app;

	init_app(&app);

	while(app.is_running){
		handle_app_events(&app);
	}

	destroy_app(&app);

	return 0;

}
