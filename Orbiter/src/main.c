#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <curl/curl.h>

size_t write_callback(void *ptr, size_t size, size_t nmemb, char *data){
	size_t real_size = size * nmemb;
	strncat(data, (char *)ptr, real_size);
	return real_size;
}

int main(int argc, char* argv[]){
	CURL *curl;
	CURLcode res;

	char data[10000] = "";
	char *url = "https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND='399'&EPHEM_TYPE='VECTORS'&CENTER='500@10'&START_TIME='2025-02-06'&STOP_TIME='2025-02-07'&STEP_SIZE='1d'&VEC_TABLE='2'";

	curl_global_init(CURL_GLOBAL_ALL);
	curl = curl_easy_init();
	if(curl){
		curl_easy_setopt(curl, CURLOPT_URL, url);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, data);
		
		res = curl_easy_perform(curl);
		if (res != CURLE_OK) {
            fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(res));
        } else {
            printf("API Response:\n%s\n", data);
        }

        curl_easy_cleanup(curl);
	}

	curl_global_cleanup();
	return 0;
}